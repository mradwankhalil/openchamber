import type { HostRequestErrorCode, OpenSurfaceOptions } from '@openchamber/sdk';

import type { ContextPanelMode } from '@/lib/surfaces/modes';
import { shownContextModes } from '@/lib/workspace/zones';
import { normalizeContextPanelDirectoryKey, useUIStore } from '@/stores/useUIStore';
import { selectWorkflowsShown } from '@/lib/workflows/availability';

export type GuestOpenSurfaceResult =
  | { ok: true }
  | { ok: false; code: HostRequestErrorCode; message: string };

type OpenGuestSurfaceOptions = {
  mode: ContextPanelMode;
  /** The panel's directory, the same key the rail opens it under; null before the app knows one. */
  directory: string | null;
  /** VS Code and mobile have no context panel for guests. */
  supported: boolean;
  tab?: OpenSurfaceOptions['tab'];
};

const isShown = (directory: string, mode: ContextPanelMode): boolean => {
  const state = useUIStore.getState();
  return shownContextModes(state.contextPanelByDirectory[directory], state.contextSurfaceZones).has(mode);
};

/**
 * `host.openSurface`: open the surface the way its rail icon does, and answer
 * by what the panel shows afterwards. A surface already on screen stays open:
 * the rail toggles it closed, the SDK call only ever opens.
 */
export const openGuestSurface = ({ mode, directory, supported, tab }: OpenGuestSurfaceOptions): GuestOpenSurfaceResult => {
  if (!supported) return { ok: false, code: 'UNSUPPORTED', message: 'This OpenChamber surface has no side panel.' };
  // While workflows are not shown it answers as for any surface it does not have.
  if (mode === 'workflows' && !selectWorkflowsShown(useUIStore.getState())) {
    return { ok: false, code: 'UNSUPPORTED', message: 'That surface cannot open here.' };
  }
  const key = directory ? normalizeContextPanelDirectoryKey(directory) : '';
  if (!key) return { ok: false, code: 'NO_DIRECTORY', message: 'No chat or project is open.' };
  // Select before the already-shown check: opening an existing panel may still
  // need to switch its section. Calls without a tab keep the user's selection.
  if (mode === 'notes' && tab !== undefined) useUIStore.getState().setProjectContextTab(tab);
  if (isShown(key, mode)) return { ok: true };
  useUIStore.getState().openContextSurface(key, mode);
  return isShown(key, mode)
    ? { ok: true }
    : { ok: false, code: 'UNSUPPORTED', message: 'That surface cannot open here.' };
};
