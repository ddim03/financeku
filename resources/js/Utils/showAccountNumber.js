export const showAccountNumber = (account, targetAccount = null) => {
    if (!targetAccount) return account.account_number;
    return account.account_number + " -> " + targetAccount.account_number;
};
