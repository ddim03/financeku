export const showAccountNumber = (
    account,
    targetAccount = null,
    type = null
) => {
    if (!targetAccount) return account.account_number;
    if (type && type == "transfer out") {
        return account.account_number + " -> " + targetAccount.account_number;
    }
    return targetAccount.account_number + " -> " + account.account_number;
};
