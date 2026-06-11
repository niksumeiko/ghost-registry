import { Ghost } from './GhostService.ts';

export async function fetchNextTarget() {
    const response = await fetch('http://localhost:3001/api/v1/target');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: Ghost = await response.json();

    return data;
}

export async function fetchGhostById(id: string) {
    const response = await fetch(`http://localhost:3001/api/v1/ghost/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: Ghost = await response.json();

    return data;
}

export async function updateGhostById(
    id: string,
    changes: Pick<Ghost, 'name' | 'flags'>,
) {
    const response = await fetch(`http://localhost:3001/api/v1/ghost/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: Ghost = await response.json();

    return data;
}
