export const getPatchFlags = (flags: string[], isCaught: boolean): string[] => {
    if (isCaught) {
        return [...flags.filter((flag) => flag !== 'caught'), 'caught'];
    }
    
    return flags.filter((flag) => flag !== 'caught');
};