import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { removeDirectory } from './remove-directory.js';

const busy = () => Object.assign(new Error('EBUSY: resource busy or locked'), { code: 'EBUSY' });
const noWait = async () => {};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('removeDirectory', () => {
  it('removes the folder and its files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-remove-test-'));
    fs.mkdirSync(path.join(dir, '.git', 'objects', 'pack'), { recursive: true });
    fs.writeFileSync(path.join(dir, '.git', 'objects', 'pack', 'a.pack'), 'x', { mode: 0o444 });

    await removeDirectory(dir);

    expect(fs.existsSync(dir)).toBe(false);
  });

  it('tries again while a file is held for a moment', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const waits = [];
    let calls = 0;
    const rm = async () => {
      calls += 1;
      if (calls < 3) throw busy();
    };

    await removeDirectory('/tmp/held', { rm, sleep: async (ms) => { waits.push(ms); } });

    expect(calls).toBe(3);
    expect(waits).toEqual([250, 500]);
    expect(warn).not.toHaveBeenCalled();
  });

  it('gives up after five attempts and logs the folder it left', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    let calls = 0;
    const rm = async () => {
      calls += 1;
      throw busy();
    };

    await removeDirectory('/tmp/held-for-good', { rm, sleep: noWait });

    expect(calls).toBe(5);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('/tmp/held-for-good');
  });
});
