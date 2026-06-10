import { type Ghost } from '../../domain/GhostService';

export function createTargetPageModel({
    isLoading,
    error,
    data: ghost,
}: {
    isLoading: boolean;
    data?: Ghost;
    error: Error | null;
}):
    | {
          state: 'LOADING';
      }
    | { state: 'ERROR' }
    | {
          state: 'SUCCESS';
          name: string;
          isCaught: boolean;
          isEditable: boolean;
          id: string;
          identity: string;
          classification: string;
          dateFirstSeen: string;
      } {
    if (isLoading) {
        return { state: 'LOADING' };
    }

    if (error) {
        return { state: 'ERROR' };
    }

    if (!ghost) {
        return { state: 'LOADING' };
    }

    return {
        state: 'SUCCESS',
        isCaught: ghost.flags.includes('caught'),
        isEditable: ghost.flags.includes('editable'),
        id: ghost.id,
        identity: `#${ghost.id}`,
        name: ghost.name,
        classification: ghost.classification,
        dateFirstSeen: ghost.firstSeen,
    };
}
