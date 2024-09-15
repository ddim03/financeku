import { currencyFormat } from "./currencyFormat";

export const showAmount = (type, amount) => {
    switch (type) {
        case "deposit":
            return "+" + currencyFormat(amount);
        case "withdraw":
            return "-" + currencyFormat(amount);
        default:
            return currencyFormat(amount);
    }
};
