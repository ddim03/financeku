import { currencyFormat } from "./currencyFormat";

export const showAmount = (type, amount) => {
    switch (type) {
        case "deposit":
            return "+" + currencyFormat(amount);
        case "withdraw":
            return "-" + currencyFormat(amount);
        case "transfer in":
            return "+" + currencyFormat(amount);
        case "transfer out":
            return "-" + currencyFormat(amount);
    }
};
