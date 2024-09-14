import { currencyFormat } from "./currencyFormat";

export const showAmount = (type, amount) => {
    return type === "deposit"
        ? "+" + currencyFormat(amount)
        : "-" + currencyFormat(amount);
};
