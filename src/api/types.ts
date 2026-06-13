export interface Ghost {
    id: string;
    name: string;
    classification: string;
    firstSeen: string;
    flags: string[];
}

export interface GhostUpdate {
    name: string;
    flags: string[];
}