export function removeDirectory(
  dir: string,
  options?: {
    rm?: (dir: string, options: { recursive: true; force: true }) => Promise<void>;
    sleep?: (ms: number) => Promise<void>;
  },
): Promise<void>;
