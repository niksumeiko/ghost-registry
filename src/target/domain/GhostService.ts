export type Ghost = {
    id: string;
    name: string;
    classification: string;
    firstSeen: string;
    flags: ('editable' | 'caught')[];
};
