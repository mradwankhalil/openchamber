import React, { act } from 'react';
import { expect, test } from 'bun:test';
import { Window } from 'happy-dom';
import { EditorView } from '@codemirror/view';
import { z } from 'zod';
import type { Session } from '@/lib/opencode/model';

type PlanFixture = {
  host: HTMLElement;
  wait: (ms: number) => Promise<void>;
  stored: { raw: string };
  writes: string[];
  mutations: Array<{ path: string; method: string; body: unknown }>;
  linkResponse: { status: number };
  navigations: string[];
  sessionLoad: { fail: boolean; calls: number };
};

type PlanFixtureOptions = { managedChat?: boolean; emptySessions?: boolean; failedSessionLoad?: boolean; archivedGlobal?: Session[] };

const withPlanView = async (run: (fixture: PlanFixture) => Promise<void>, options: PlanFixtureOptions = {}) => {
  const dom = new Window({ url: 'http://runtime.test' });
  const originals = new Map<string, PropertyDescriptor | undefined>();
  for (const [name, value] of Object.entries({
    window: dom, document: dom.document, navigator: dom.navigator, location: dom.location, localStorage: dom.localStorage,
    Element: dom.Element, HTMLElement: dom.HTMLElement, HTMLInputElement: dom.HTMLInputElement, Node: dom.Node,
    Document: dom.Document, Text: dom.Text, Range: dom.Range,
    customElements: dom.customElements, CSSStyleSheet: dom.CSSStyleSheet,
    Event: dom.Event, CustomEvent: dom.CustomEvent, KeyboardEvent: dom.KeyboardEvent, MouseEvent: dom.MouseEvent,
    MutationObserver: dom.MutationObserver, ResizeObserver: dom.ResizeObserver,
    getComputedStyle: dom.getComputedStyle.bind(dom), requestAnimationFrame: dom.requestAnimationFrame.bind(dom),
    cancelAnimationFrame: dom.cancelAnimationFrame.bind(dom), IS_REACT_ACT_ENVIRONMENT: true,
  })) {
    originals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  }
  const previousFetch = globalThis.fetch;
  const stored = { raw: '# Plan A\n\nOriginal' };
  const link = { id: 'A', file: 'A.md', title: 'Plan A', createdAt: 1, pinned: false };
  const writes: string[] = [];
  const mutations: PlanFixture['mutations'] = [];
  const linkResponse = { status: 200 };
  const navigations: string[] = [];
  globalThis.fetch = Object.assign(async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = input instanceof Request ? input : null;
    const url = new URL(request ? request.url : String(input), 'http://runtime.test');
    // Read method and body from either call form, so a Request-based SDK call is recorded too.
    const method = (init?.method ?? request?.method ?? 'GET').toUpperCase();
    const rawBody = init?.body != null ? String(init.body) : request && method !== 'GET' && method !== 'HEAD' ? await request.clone().text() : '';
    const body: unknown = rawBody ? JSON.parse(rawBody) : null;
    if (method !== 'GET' && method !== 'HEAD' && url.pathname !== '/auth/url-token') {
      mutations.push({ path: url.pathname, method, body });
    }
    if (url.pathname.endsWith('/plans/A/session')) {
      if (linkResponse.status !== 200) return Response.json({ error: 'Link failed' }, { status: linkResponse.status });
      const session = { sessionId: 'ses_existing', linkedAt: 1 };
      return Response.json({ plan: { ...link, session }, context: { notes: [], todos: [], plans: [{ ...link, session }] } });
    }
    if (url.pathname === '/api/fs/home') return Response.json({ home: '/fixture' });
    if (url.pathname === '/api/config/settings') return Response.json({});
    if (url.pathname.endsWith('/event')) return new Response(new ReadableStream(), { headers: { 'Content-Type': 'text/event-stream' } });
    if (url.pathname.endsWith('/plans/A')) {
      if (method === 'PUT') {
        const { raw } = z.object({ raw: z.string() }).parse(body);
        writes.push(raw);
        stored.raw = raw;
        return Response.json({ plan: link, raw });
      }
      return Response.json({ ...link, raw: stored.raw, body: stored.raw, path: null });
    }
    if (url.pathname.startsWith('/api/project-context/')) return Response.json({ notes: [], todos: [], plans: [link], sharedPlansDir: null });
    return Response.json({ error: 'Unavailable in fixture' }, { status: 503 });
  }, previousFetch);
  const { createRoot } = await import('react-dom/client');
  const { I18nProvider } = await import('@/lib/i18n');
  const { ThemeSystemProvider } = await import('@/contexts/ThemeSystemContext');
  const { RuntimeAPIContext } = await import('@/contexts/runtimeAPIContext');
  const { createWebAPIs } = await import('../../../../web/src/api/index');
  const { SyncProvider } = await import('@/sync/sync-context');
  const { opencodeClient } = await import('@/lib/opencode/client');
  const { useProjectContextStore } = await import('@/stores/useProjectContextStore');
  const { useGlobalSessionsStore } = await import('@/stores/useGlobalSessionsStore');
  const previousGlobalSessions = useGlobalSessionsStore.getState();
  const existing: Session = {
    id: 'ses_existing', projectID: 'project', directory: '/plan-fixture', title: 'Already working on it',
    cost: 0, tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
    time: { created: 1, updated: 2 },
  };
  const sessionLoad = { fail: options.failedSessionLoad === true, calls: 0 };
  useGlobalSessionsStore.setState({
    activeSessions: options.emptySessions || options.failedSessionLoad ? [] : [existing, { ...existing, id: 'ses_archived', title: 'Archived', time: { ...existing.time, archived: 3 } }],
    archivedSessions: options.archivedGlobal ?? [],
    status: options.failedSessionLoad ? 'idle' : 'ready',
    // Stands in for the global load: a cold failure leaves nothing listed, a later success lists the session.
    loadSessions: async () => {
      sessionLoad.calls += 1;
      if (sessionLoad.fail) {
        useGlobalSessionsStore.setState({ status: 'error' });
        return { activeSessions: [], archivedSessions: [] };
      }
      if (options.failedSessionLoad) useGlobalSessionsStore.setState({ activeSessions: [existing] });
      useGlobalSessionsStore.setState({ status: 'ready' });
      const state = useGlobalSessionsStore.getState();
      return { activeSessions: state.activeSessions, archivedSessions: state.archivedSessions };
    },
  });
  const { PlanView } = await import('./PlanView');
  const projectRef = { id: options.managedChat ? 'openchamber:chats' : 'plan-fixture', path: '/plan-fixture' };
  const host = document.createElement('div');
  document.body.append(host);
  const root = createRoot(host);
  const apis = createWebAPIs();
  const wait = (ms: number) => act(async () => { await new Promise(resolve => setTimeout(resolve, ms)); });
  try {
    useProjectContextStore.getState().reset();
    await act(async () => root.render(<I18nProvider><ThemeSystemProvider><RuntimeAPIContext.Provider value={apis}>
      <SyncProvider sdk={opencodeClient.getSdkClient()} directory="/plan-fixture">
        <PlanView savedProjectPlan={{ projectRef, planId: 'A' }} onNavigatedToChat={() => navigations.push('chat')} />
      </SyncProvider>
    </RuntimeAPIContext.Provider></ThemeSystemProvider></I18nProvider>));
    await wait(30);
    await run({ host, wait, stored, writes, mutations, linkResponse, navigations, sessionLoad });
  } finally {
    await act(async () => root.unmount());
    useProjectContextStore.getState().reset();
    useGlobalSessionsStore.setState(previousGlobalSessions);
    globalThis.fetch = previousFetch;
    dom.happyDOM.cancelAsync();
    for (const [name, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
  }
};

test('an open plan takes agent saves and file edits while clean and keeps unsaved typing over them', async () => {
  await withPlanView(async ({ host, wait, stored, writes }) => {
    const editor = () => {
      const element = host.querySelector('.cm-editor');
      if (!(element instanceof HTMLElement)) throw new Error(`Editor missing: ${host.textContent}`);
      const view = EditorView.findFromDOM(element);
      if (!view) throw new Error('Editor view missing');
      return view;
    };
    // The observer refreshes on focus as it does on a change announcement.
    const agentWrites = async (raw: string) => {
      stored.raw = raw;
      await act(async () => { window.dispatchEvent(new Event('focus')); });
      await wait(30);
    };
    expect(editor().state.doc.toString()).toBe('# Plan A\n\nOriginal');

    await agentWrites('# Plan A\n\nAgent edit');
    expect(editor().state.doc.toString()).toBe('# Plan A\n\nAgent edit');
    // A file edit sends no announcement; the open plan finds it by checking.
    stored.raw = '# Plan A\n\n- [x] Agent edit';
    await wait(2200);
    expect(editor().state.doc.toString()).toBe('# Plan A\n\n- [x] Agent edit');
    await agentWrites('# Plan A\n\nAgent edit');
    // Opening and adopting are reads; neither writes the text back.
    await wait(450);
    expect(writes).toEqual([]);

    await act(async () => editor().dispatch({ changes: { from: editor().state.doc.length, insert: '\nMine' } }));
    await agentWrites('# Plan A\n\nSecond agent edit');
    expect(editor().state.doc.toString()).toBe('# Plan A\n\nAgent edit\nMine');
    await wait(450);
    expect(writes).toEqual(['# Plan A\n\nAgent edit\nMine']);
    expect(stored.raw).toBe('# Plan A\n\nAgent edit\nMine');
  });
}, 20_000);

const openLinkPicker = async (host: HTMLElement, wait: PlanFixture['wait'], action: string) => {
  const trigger = host.querySelector<HTMLButtonElement>(`button[aria-label="${action}"]`);
  if (!trigger) throw new Error(`Missing ${action}`);
  await act(async () => trigger.click());
  const menu = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')];
  expect(menu.some((item) => item.textContent === 'Send to new session')).toBe(true);
  expect(menu.some((item) => item.textContent === 'Send to new worktree session')).toBe(true);
  const link = menu.find((item) => item.textContent === 'Link to existing session');
  if (!link) throw new Error('Missing link action');
  await act(async () => link.click());
  await wait(30);
  const confirm = [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')]
    .find((button) => button.textContent === 'Link to existing session');
  expect(confirm?.disabled).toBe(true);
  const picker = document.querySelector<HTMLElement>('[role="dialog"] [role="combobox"]');
  if (!picker) throw new Error('Missing session picker');
  await act(async () => picker.click());
  await wait(30);
  const options = [...document.querySelectorAll<HTMLElement>('[role="option"]')];
  expect(options.some((item) => item.textContent?.includes('Archived'))).toBe(false);
  const existing = options.find((item) => item.textContent?.includes('Already working on it'));
  if (!existing) throw new Error('Existing session not offered');
  await act(async () => existing.click());
  await wait(30);
};

const openLinkDialog = async (host: HTMLElement, wait: PlanFixture['wait']) => {
  const trigger = host.querySelector<HTMLButtonElement>('button[aria-label="Implement"]');
  if (!trigger) throw new Error('Missing Implement');
  await act(async () => trigger.click());
  const link = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find((item) => item.textContent === 'Link to existing session');
  if (!link) throw new Error('Missing link');
  await act(async () => link.click());
  await wait(30);
};

const openPickerOptions = async (wait: PlanFixture['wait']) => {
  const picker = document.querySelector<HTMLElement>('[role="dialog"] [role="combobox"]');
  if (!picker) throw new Error('Missing picker');
  await act(async () => picker.click());
  await wait(30);
  return [...document.querySelectorAll<HTMLElement>('[role="option"]')].map((option) => option.textContent ?? '');
};

const confirmLink = async (wait: PlanFixture['wait']) => {
  const confirm = [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')]
    .find((button) => button.textContent === 'Link to existing session');
  if (!confirm) throw new Error('Missing link confirmation');
  await act(async () => confirm.click());
  await wait(30);
};

test('Improve and Implement can link a plan to an existing session without starting anything', async () => {
  for (const action of ['Improve', 'Implement']) {
    await withPlanView(async ({ host, wait, mutations, navigations }) => {
      await openLinkPicker(host, wait, action);
      expect(mutations).toEqual([]);
      await confirmLink(wait);
      expect(mutations).toHaveLength(1);
      expect(mutations[0]).toMatchObject({ method: 'PUT', body: { sessionId: 'ses_existing' } });
      expect(mutations[0]?.path.endsWith('/plans/A/session')).toBe(true);
      expect(document.querySelector('[role="dialog"]')).toBeNull();
      expect(navigations).toEqual([]);
      const { useProjectContextStore } = await import('@/stores/useProjectContextStore');
      const entries = Object.values(useProjectContextStore.getState().entries);
      expect(entries.some((entry) => entry.plans.some((plan) => plan.session?.sessionId === 'ses_existing'))).toBe(true);
    });
  }
}, 20_000);

test('managed-chat plans can link even though sending to a new project session is unavailable', async () => {
  await withPlanView(async ({ host, wait, mutations }) => {
    await openLinkPicker(host, wait, 'Implement');
    await confirmLink(wait);
    expect(mutations).toHaveLength(1);
    expect(mutations[0]?.body).toEqual({ sessionId: 'ses_existing' });
  }, { managedChat: true });
}, 20_000);

test('a plan with no available sessions cannot confirm a link', async () => {
  await withPlanView(async ({ host, wait, mutations }) => {
    const trigger = host.querySelector<HTMLButtonElement>('button[aria-label="Implement"]');
    if (!trigger) throw new Error('Missing Implement');
    await act(async () => trigger.click());
    const link = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find((item) => item.textContent === 'Link to existing session');
    if (!link) throw new Error('Missing link');
    await act(async () => link.click());
    await wait(30);
    await confirmLink(wait);
    expect(mutations).toEqual([]);
    const picker = document.querySelector<HTMLElement>('[role="dialog"] [role="combobox"]');
    if (!picker) throw new Error('Missing picker');
    await act(async () => picker.click());
    await wait(30);
    expect(document.body.textContent).toContain('No sessions available');
  }, { emptySessions: true });
}, 20_000);

test('an archived session stays out of the picker when a directory store keeps an unarchived copy', async () => {
  const base = {
    projectID: 'project', directory: '/plan-fixture', cost: 0,
    tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
  };
  const archived: Session = { ...base, id: 'ses_done', title: 'Done elsewhere', time: { created: 1, updated: 2, archived: 3 } };
  await withPlanView(async ({ host, wait }) => {
    const { getSyncChildStores } = await import('@/sync/sync-refs');
    const store = getSyncChildStores().getChild('/plan-fixture');
    if (!store) throw new Error('Expected mounted directory store');
    // Stale live copies: the archived session without time.archived, a listed session
    // with an old title, and one session no global list has seen yet.
    await act(async () => store.setState({ session: [
      { ...archived, time: { created: 1, updated: 9 } },
      { ...base, id: 'ses_existing', title: 'Stale live title', time: { created: 1, updated: 9 } },
      { ...base, id: 'ses_live_only', title: 'Only in the live store', time: { created: 1, updated: 4 } },
    ] }));
    try {
      await openLinkDialog(host, wait);
      const options = await openPickerOptions(wait);
      expect(options.some((option) => option.includes('Done elsewhere'))).toBe(false);
      expect(options.some((option) => option.includes('Stale live title'))).toBe(false);
      expect(options.some((option) => option.includes('Already working on it'))).toBe(true);
      expect(options.some((option) => option.includes('Only in the live store'))).toBe(true);
    } finally {
      // The directory store outlives this mount; later tests must not inherit these copies.
      await act(async () => store.setState({ session: [] }));
    }
  }, { archivedGlobal: [archived] });
}, 20_000);

test('a failed cold session load shows an error with retry instead of an empty list', async () => {
  await withPlanView(async ({ host, wait, mutations, sessionLoad }) => {
    await openLinkDialog(host, wait);
    expect(sessionLoad.calls).toBeGreaterThan(0);
    const alert = document.querySelector<HTMLElement>('[role="dialog"] [role="alert"]');
    expect(alert?.textContent).toContain('Could not load sessions.');
    expect(document.body.textContent).not.toContain('No sessions available');
    const options = await openPickerOptions(wait);
    expect(options).toEqual(['Could not load sessions.']);

    sessionLoad.fail = false;
    const retry = [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')].find((button) => button.textContent === 'Retry');
    if (!retry) throw new Error('Missing retry');
    const callsBeforeRetry = sessionLoad.calls;
    await act(async () => retry.click());
    await wait(30);
    expect(sessionLoad.calls).toBe(callsBeforeRetry + 1);
    expect(document.querySelector('[role="dialog"] [role="alert"]')).toBeNull();
    expect((await openPickerOptions(wait)).some((option) => option.includes('Already working on it'))).toBe(true);
    expect(mutations).toEqual([]);
  }, { failedSessionLoad: true });
}, 20_000);

test('cancelling the picker does not link, and a failed link stays open for retry', async () => {
  await withPlanView(async ({ host, wait, mutations, linkResponse }) => {
    await openLinkPicker(host, wait, 'Implement');
    const cancel = [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')].find((button) => button.textContent === 'Cancel');
    if (!cancel) throw new Error('Missing cancel');
    await act(async () => cancel.click());
    await wait(30);
    expect(mutations).toEqual([]);
    await openLinkPicker(host, wait, 'Implement');
    linkResponse.status = 500;
    await confirmLink(wait);
    expect(document.querySelector('[role="alert"]')?.textContent).toBe('Could not link this plan. Try again.');
    linkResponse.status = 200;
    await confirmLink(wait);
    expect(mutations).toHaveLength(2);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
}, 20_000);

test('only the Implement send dialog offers Run as goal', async () => {
  await withPlanView(async ({ host, wait }) => {
    const openSendDialog = async (actionLabel: string) => {
      const trigger = host.querySelector<HTMLButtonElement>(`button[aria-label="${actionLabel}"]`);
      if (!trigger) throw new Error(`Missing ${actionLabel}`);
      await act(async () => { trigger.click(); });
      const item = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find((entry) => entry.textContent === 'Send to new session');
      if (!item) throw new Error(`Missing send item under ${actionLabel}`);
      await act(async () => { item.click(); });
      await wait(30);
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) throw new Error(`Missing send dialog for ${actionLabel}`);
      return dialog;
    };
    const closeDialog = async () => {
      await act(async () => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
      await wait(30);
    };

    expect((await openSendDialog('Improve')).textContent).not.toContain('Run as goal');
    await closeDialog();
    expect((await openSendDialog('Implement')).textContent).toContain('Run as goal');
  });
});
