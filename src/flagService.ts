export const isEditable = (flags: string[]): boolean => {
    return flags.some((flag) => flag === 'editable');
};

export const isCaught = (flags: string[]): boolean => {
    return flags.some((flag) => flag === 'caught');
};