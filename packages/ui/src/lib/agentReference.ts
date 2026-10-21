import type { Agent } from '@/lib/opencode/model';

type AgentRef = Pick<Agent, 'name' | 'displayName'>;

const lastSegment = (id: string): string | undefined => {
    const slash = id.lastIndexOf('/');
    return slash >= 0 ? id.slice(slash + 1) : undefined;
};

/**
 * The agent a stored agent reference names. Sessions, sends and saved defaults
 * must carry the agent id (`Agent.name`, e.g. `oh-my-openagent/Sisyphus - ultraworker`
 * for a plugin agent), but settings and session records written earlier can hold
 * the display name instead (`Sisyphus - ultraworker`), which OpenCode rejects as an
 * unknown agent. The id wins; then the display name, the id ignoring case, and the
 * last segment of a namespaced id, each only when exactly one agent matches.
 */
export function findAgentByReference<T extends AgentRef>(
    agents: readonly T[],
    reference: string | null | undefined,
): T | undefined {
    const wanted = reference?.trim();
    if (!wanted) return undefined;
    const exact = agents.find((agent) => agent.name === wanted);
    if (exact) return exact;

    const lower = wanted.toLowerCase();
    const only = (matches: T[]): T | undefined => (matches.length === 1 ? matches[0] : undefined);
    return only(agents.filter((agent) => agent.displayName?.trim().toLowerCase() === lower))
        ?? only(agents.filter((agent) => agent.name.toLowerCase() === lower))
        ?? only(agents.filter((agent) => lastSegment(agent.name)?.toLowerCase() === lower));
}

/**
 * The agent id to store or send for a reference: the matching agent's id, or the
 * reference unchanged when nothing in the catalogue matches. An empty or partial
 * catalogue means "unknown", so a reference is never dropped here.
 */
export function canonicalAgentName<T extends AgentRef>(
    agents: readonly T[],
    reference: string | null | undefined,
): string | undefined {
    const wanted = reference?.trim();
    if (!wanted) return undefined;
    return findAgentByReference(agents, wanted)?.name ?? wanted;
}
