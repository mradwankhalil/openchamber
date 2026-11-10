import { describe, expect, test } from 'bun:test';

import { serviceHostCallSchema } from './service-host-schemas.ts';
import type { ServiceSessionStart } from './service-host.ts';

describe('service session creation', () => {
  test('accepts an explicit parent through the service SDK contract', () => {
    const input: ServiceSessionStart = { prompt: 'Run this', parentId: 'ses_parent' };
    expect(serviceHostCallSchema.parse({ method: 'sessions.start', input })).toEqual({ method: 'sessions.start', input });
  });

  test('keeps requests without a parent unchanged', () => {
    const input: ServiceSessionStart = { prompt: 'Run this' };
    expect(serviceHostCallSchema.parse({ method: 'sessions.start', input })).toEqual({ method: 'sessions.start', input });
  });

  test.each([null, '', ' ', 42, 'x'.repeat(257)])('refuses an invalid parent id %j', (parentId) => {
    expect(serviceHostCallSchema.safeParse({ method: 'sessions.start', input: { prompt: 'Run this', parentId } }).success).toBe(false);
  });
});
