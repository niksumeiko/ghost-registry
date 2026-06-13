import {BASE_URL} from './baseUrl.ts';

export const patchGhost = async (
    id: string,
    data: Partial<{ name: string; flags: string[] }>,
) => {
    const response = await fetch(`${BASE_URL}/api/v1/ghost/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update ghost');
    }

    return response.json();
};