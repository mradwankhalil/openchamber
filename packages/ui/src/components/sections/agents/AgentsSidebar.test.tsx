import { afterEach, expect, spyOn, test } from 'bun:test';
import { Window } from 'happy-dom';

const browser = new Window({ url: 'http://localhost/' });
Object.assign(globalThis, {
  window: browser, document: browser.document, navigator: browser.navigator, localStorage: browser.localStorage,
  Node: browser.Node, Element: browser.Element, HTMLElement: browser.HTMLElement,
  HTMLInputElement: browser.HTMLInputElement, HTMLTextAreaElement: browser.HTMLTextAreaElement,
  Event: browser.Event, FocusEvent: browser.FocusEvent, CustomEvent: browser.CustomEvent,
  MutationObserver: browser.MutationObserver, ResizeObserver: browser.ResizeObserver,
  getComputedStyle: browser.getComputedStyle.bind(browser),
  requestAnimationFrame: browser.requestAnimationFrame.bind(browser),
  cancelAnimationFrame: browser.cancelAnimationFrame.bind(browser), IS_REACT_ACT_ENVIRONMENT: true,
});

const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url.includes('/config/mcp')) return Response.json([]);
  if (url.includes('/project')) return Response.json([]);
  return Response.json({ home: '/test' });
});

const { act } = await import('react');
const { createRoot } = await import('react-dom/client');
const { I18nProvider } = await import('@/lib/i18n');
const { ThemeSystemProvider } = await import('@/contexts/ThemeSystemContext');
const { useAgentsStore } = await import('@/stores/useAgentsStore');
const { AgentsSidebar } = await import('./AgentsSidebar');

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);

afterEach(async () => {
  await act(async () => root.unmount());
  fetchSpy.mockRestore();
  browser.close();
});

const agent = (name: string, extra: Record<string, unknown> = {}) => ({
  name,
  id: name,
  displayName: name,
  hidden: false,
  description: `${name} description`,
  mode: 'primary' as const,
  request: { settings: {}, headers: {}, body: {} },
  permissions: [],
  ...extra,
});

test('a hidden agent keeps its editable row and carries a hidden badge', async () => {
  useAgentsStore.setState({
    selectedAgentName: null,
    agentsByDirectory: {
      __default__: [
        agent('Sisyphus - ultraworker'),
        agent('sisyphus', { hidden: true, native: false }),
      ],
    },
    disabledAgentsByDirectory: { __default__: [] },
    loadAgents: async () => true,
    loadDisabledAgents: async () => true,
  });

  await act(async () => {
    root.render(<I18nProvider><ThemeSystemProvider><AgentsSidebar /></ThemeSystemProvider></I18nProvider>);
  });

  const text = container.textContent ?? '';
  expect(text).toContain('Sisyphus - ultraworker');
  expect(text).toContain('sisyphus');

  const badges = [...container.querySelectorAll('span')].filter((span) => span.textContent === 'hidden');
  expect(badges).toHaveLength(1);

  const aliasRow = [...container.querySelectorAll('button')].find((button) =>
    button.textContent?.includes('sisyphus'),
  );
  expect(aliasRow).toBeDefined();
  expect(aliasRow?.textContent).toContain('hidden');
});
