export const selectVariant = (value) => {
    switch (value) {
        case "deposit":
            return "success";
        case "withdraw":
            return "danger";
        default:
            return "info";
    }
};
