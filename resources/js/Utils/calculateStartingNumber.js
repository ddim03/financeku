export const calculateStartingNumber = (current, perPage) => {
    return (current - 1) * perPage + 1;
};
