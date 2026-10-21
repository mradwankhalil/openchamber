import { describe, expect, test } from 'bun:test';

import { canonicalAgentName, findAgentByReference } from './agentReference';

const agents = [
    { name: 'build', displayName: 'Build' },
    { name: 'general', displayName: 'General' },
    { name: 'oh-my-openagent/Sisyphus - ultraworker', displayName: 'Sisyphus - ultraworker' },
];

describe('findAgentByReference', () => {
    test('matches the id first', () => {
        expect(findAgentByReference(agents, 'oh-my-openagent/Sisyphus - ultraworker')?.name)
            .toBe('oh-my-openagent/Sisyphus - ultraworker');
    });

    test('resolves a plugin agent display name to its namespaced id (#5379)', () => {
        expect(findAgentByReference(agents, 'Sisyphus - ultraworker')?.name)
            .toBe('oh-my-openagent/Sisyphus - ultraworker');
    });

    test('ignores case and surrounding whitespace', () => {
        expect(findAgentByReference(agents, '  BUILD ')?.name).toBe('build');
    });

    test('resolves the last segment of a namespaced id when the display name differs', () => {
        const renamed = [{ name: 'oh-my-openagent/sisyphus', displayName: 'Sisyphus (Ultraworker)' }];
        expect(findAgentByReference(renamed, 'Sisyphus')?.name).toBe('oh-my-openagent/sisyphus');
    });

    test('refuses an ambiguous display name', () => {
        const twins = [
            { name: 'a/review', displayName: 'Review' },
            { name: 'b/review', displayName: 'Review' },
        ];
        expect(findAgentByReference(twins, 'Review')).toBeUndefined();
        expect(findAgentByReference(twins, 'b/review')?.name).toBe('b/review');
    });

    test('finds nothing for an unknown or empty reference', () => {
        expect(findAgentByReference(agents, 'Retired agent')).toBeUndefined();
        expect(findAgentByReference(agents, '')).toBeUndefined();
        expect(findAgentByReference(agents, undefined)).toBeUndefined();
    });
});

describe('canonicalAgentName', () => {
    test('returns the id of the agent a display name names', () => {
        expect(canonicalAgentName(agents, 'Sisyphus - ultraworker')).toBe('oh-my-openagent/Sisyphus - ultraworker');
    });

    test('keeps an unknown reference, and any reference while the catalogue is empty', () => {
        expect(canonicalAgentName(agents, 'Retired agent')).toBe('Retired agent');
        expect(canonicalAgentName([], 'Sisyphus - ultraworker')).toBe('Sisyphus - ultraworker');
        expect(canonicalAgentName(agents, '   ')).toBeUndefined();
    });
});
