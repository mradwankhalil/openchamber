import fs from 'fs';

// About four seconds of waiting in all before the folder is given up.
const RETRY_DELAYS_MS = [250, 500, 1000, 2000];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Removes a catalog clone or a skill folder. On Windows a virus scanner or
 * git's background maintenance can hold a file of a fresh clone for a moment,
 * and a single failed delete left the folder in the temp directory for good
 * (#5405). A folder that still cannot be removed is logged and left; the scan
 * or install that used it still succeeds.
 */
export async function removeDirectory(dir, { rm = fs.promises.rm, sleep = wait } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      await rm(dir, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt >= RETRY_DELAYS_MS.length) {
        console.warn(`[skills-catalog] Failed to remove ${dir}:`, error instanceof Error ? error.message : String(error));
        return;
      }
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }
}
