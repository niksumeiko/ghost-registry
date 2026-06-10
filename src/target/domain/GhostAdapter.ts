import { Ghost } from './GhostService.ts';

export async function fetchNextTarget() {
    const response = await fetch('http://localhost:3001/api/v1/target');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: Ghost = await response.json();

    return data;
}
