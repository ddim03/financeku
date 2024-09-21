export const showAccountNumber = (
    account,
    targetAccount = null,
    type = null
) => {
    let name = account.user.name.split(" ")[0];
    let targetName = targetAccount?.user.name.split(" ")[0];

    if (!targetAccount) return `${name}(${account.account_number})`;
    if (type === "transfer out") {
        return (
            `${name}(${account.account_number})` +
            " -> " +
            `${targetName}(${targetAccount.account_number})`
        );
    }
    if (type === "transfer in") {
        return (
            `${targetName}(${targetAccount.account_number})` +
            " -> " +
            `${name}(${account.account_number})`
        );
    }
};
