export const currencyFormat = (value) => {
    if (!value) return;
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};
