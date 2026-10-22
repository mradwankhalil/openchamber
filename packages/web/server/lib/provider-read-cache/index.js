// Short-lived shared answers for provider reads (issue and pull request lists,
// previews, comments), so the picker, the comparison view, the PR panel and
// every connected client asking the same thing within seconds cost one
// provider call.
//
// A GET is answered from here when the same path and query succeeded within
// its TTL; identical requests in flight wait for the first one. The query
// carries the bound read context (account, repository, binding revision), so a
// key is exactly one answer. Only successful, connected answers are kept: a
// failure or "not connected" is never replayed. Anything that changes a
// provider (a POST to its routes: mutations, sign-in, account switch) clears
// that provider's answers, and so does an agent turn finishing, since the
// agent may have opened or changed something. Both are reported through
// `onChange(provider)`, so the live state the server follows is read again too.
//
// `POST <prefix>/read-cache/refresh` forgets answers on request, for a change
// made on the provider's own site, as narrowly as the refresh asks:
// `?scope=item&owner=&repo=&number=` (the preview's refresh button) forgets
// what was read about that one item and reports it through
// `onItemRefresh(provider, item)`; `?scope=lists` (the board's list refresh)
// forgets the lists and the statuses read for them. Without a scope every
// answer of the provider goes, as for a change.

const SECOND = 1000;
const MAX_ENTRIES = 300;
// A larger answer (a merge request context with its diff) is served but not kept.
const MAX_CACHED_BYTES = 2 * 1024 * 1024;

const ROUTES = [
  { prefix: '/api/source-control/github', provider: 'github' },
  { prefix: '/api/source-control/gitlab', provider: 'gitlab' },
  { prefix: '/api/linear', provider: 'linear' },
];

// Lists change when something is opened or closed; previews and comments are
// read again sooner when someone is looking at one.
const CACHED_READS = new Map([
  ['/references', 30 * SECOND],
  ['/references/detail', 15 * SECOND],
  ['/references/status', 30 * SECOND],
  ['/issues/list', 30 * SECOND],
  ['/issues/get', 15 * SECOND],
  ['/issues/comments', 15 * SECOND],
  ['/pulls/list', 30 * SECOND],
  ['/pulls/context', 15 * SECOND],
]);

// Reads sent as a POST because their request is too large for a query; they
// change nothing, so they neither clear answers nor count as a change.
const POST_READS = new Set(['/references/across']);

// Reads that list items, rather than read one: a list refresh forgets these.
const LIST_READS = new Set(['/references', '/references/status', '/issues/list', '/pulls/list']);

const routeOf = (path) => ROUTES.find((route) => path.startsWith(`${route.prefix}/`)) ?? null;

const lower = (value) => String(value ?? '').toLowerCase();

/** The one item a scoped refresh names, or null when the query names none. */
const refreshedItem = (searchParams) => {
  const number = Number(searchParams.get('number'));
  if (!Number.isSafeInteger(number) || number < 1) return null;
  return { owner: searchParams.get('owner') ?? '', repo: searchParams.get('repo') ?? '', number };
};

/**
 * Whether a kept answer was read about `item`: its own reads (detail,
 * comments, context, get) by number and project, a status read that asked
 * for it, and a search that looked it up by its link or number (the Tracker
 * reads a tab's item that way). A read without a project matches by number;
 * forgetting one answer too many only costs a read.
 */
const answerIsAbout = (subpath, params, item) => {
  const sameProject = (owner, repo) => !owner || !item.owner || (lower(owner) === lower(item.owner) && lower(repo) === lower(item.repo));
  if (subpath === '/references/status') {
    const wanted = `${lower(item.owner)}/${lower(item.repo)}#${item.number}`;
    return lower(params.get('pulls')).split(',').includes(wanted);
  }
  if (subpath === '/references') {
    const query = lower(params.get('query')).trim();
    if (!query) return false;
    if (query === `#${item.number}` || query === String(item.number)) return true;
    const link = query.match(/\/([^/]+)\/([^/]+)\/(?:-\/)?(?:pull|pulls|issues|merge_requests)\/(\d+)/);
    return Boolean(link) && Number(link[3]) === item.number && sameProject(link[1], link[2]);
  }
  return Number(params.get('number')) === item.number && sameProject(params.get('owner'), params.get('repo'));
};

const requestKey = (req, provider) => {
  const url = new URL(req.originalUrl, 'http://localhost');
  const query = [...url.searchParams.entries()].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  return `${provider}|${url.pathname}?${new URLSearchParams(query).toString()}`;
};

const isConnectedAnswer = (body) => !(Object.prototype.toString.call(body) === '[object Object]' && body.connected === false);

export function createProviderReadCache({ now = Date.now, onChange = () => {}, onItemRefresh = () => {} } = {}) {
  const entries = new Map();
  const inFlight = new Map();

  /** Forgets the provider's answers `matches(subpath, params)` picks; all of them without it. */
  const clear = (provider, matches = null) => {
    const picked = (key) => {
      if (provider && !key.startsWith(`${provider}|`)) return false;
      if (!matches) return true;
      const route = ROUTES.find((candidate) => candidate.provider === key.slice(0, key.indexOf('|')));
      const url = new URL(key.slice(key.indexOf('|') + 1), 'http://localhost');
      return Boolean(route) && matches(url.pathname.slice(route.prefix.length), url.searchParams);
    };
    for (const key of entries.keys()) if (picked(key)) entries.delete(key);
    // Requests already running may carry the old state; they still answer
    // their own callers, but their result is not kept.
    for (const [key, flight] of inFlight) if (picked(key)) flight.stale = true;
  };

  const remember = (key, body, ttlMs) => {
    const size = Buffer.byteLength(JSON.stringify(body));
    if (size > MAX_CACHED_BYTES) return;
    entries.delete(key);
    entries.set(key, { body, expiresAt: now() + ttlMs });
    while (entries.size > MAX_ENTRIES) entries.delete(entries.keys().next().value);
  };

  /** Express middleware; register it before the provider routes. */
  const middleware = (req, res, next) => {
    const route = routeOf(req.path);
    if (!route) return next();
    const subpath = req.path.slice(route.prefix.length);
    if (req.method === 'POST' && subpath === '/read-cache/refresh') {
      const { searchParams } = new URL(req.originalUrl, 'http://localhost');
      const scope = searchParams.get('scope');
      if (scope === 'item') {
        const item = refreshedItem(searchParams);
        if (!item) return res.status(400).json({ error: 'number is required to refresh one item' });
        clear(route.provider, (path, params) => answerIsAbout(path, params, item));
        onItemRefresh(route.provider, item);
        return res.json({ ok: true });
      }
      if (scope === 'lists') {
        clear(route.provider, (path) => LIST_READS.has(path));
        return res.json({ ok: true });
      }
      clear(route.provider);
      onChange(route.provider);
      return res.json({ ok: true });
    }
    if (req.method === 'POST' && POST_READS.has(subpath)) return next();
    if (req.method !== 'GET') {
      // A change to this provider makes every kept answer of it suspect.
      res.on('finish', () => {
        if (res.statusCode >= 400) return;
        clear(route.provider);
        onChange(route.provider);
      });
      return next();
    }
    const ttlMs = CACHED_READS.get(subpath);
    if (!ttlMs) return next();
    const key = requestKey(req, route.provider);
    const cached = entries.get(key);
    if (cached && cached.expiresAt > now()) return res.json(cached.body);
    if (cached) entries.delete(key);

    const pending = inFlight.get(key);
    if (pending) {
      pending.promise.then((answer) => {
        if (answer) return res.status(answer.status).json(answer.body);
        // The first request did not produce a shareable answer; ask on our own.
        return next();
      });
      return undefined;
    }

    let settle;
    const flight = { stale: false, promise: new Promise((resolve) => { settle = resolve; }) };
    inFlight.set(key, flight);
    const done = (answer) => {
      if (inFlight.get(key) === flight) inFlight.delete(key);
      settle(answer);
    };
    const json = res.json.bind(res);
    res.json = (body) => {
      const shareable = res.statusCode === 200 && isConnectedAnswer(body);
      if (shareable && !flight.stale) remember(key, body, ttlMs);
      done(shareable ? { status: 200, body } : null);
      return json(body);
    };
    // A handler that answered some other way (stream, error page) shares nothing.
    res.on('close', () => done(null));
    return next();
  };

  return { middleware, clear };
}
