export const currencyFormat = (value) => {
    if (value == 0) return "Rp 0";
    if (!value) return;
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};
