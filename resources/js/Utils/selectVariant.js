export const selectVariant = (value) => {
    switch (value) {
        case "deposit":
            return "success";
        case "withdraw":
            return "danger";
        case "transfer in":
            return "info";
        case "transfer out":
            return "warning";
    }
};
