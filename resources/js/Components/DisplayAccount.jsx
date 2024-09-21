import { currencyFormat } from "@/Utils/currencyFormat";
import { showAcronymName } from "@/Utils/showAcronymName";

export default function DisplayAccount({
    name,
    balance = null,
    account_number,
    isLoading,
    withBalance = false,
}) {
    return (
        <div className="w-full bg-gray-200 rounded p-4 flex flex-col lg:flex-row justify-between">
            {isLoading ? (
                <Skeleton />
            ) : (
                <CustomerData
                    name={name}
                    account_number={account_number}
                    balance={balance}
                    withBalance={withBalance}
                />
            )}
        </div>
    );
}

const Skeleton = () => (
    <div className="flex gap-4 animate-pulse w-full">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-2/12"></div>
    </div>
);

const CustomerData = ({
    name,
    account_number,
    balance,
    withBalance = false,
}) => {
    return (
        <div className="flex gap-4 w-full">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">
                    {showAcronymName(name)}
                </span>
            </div>

            <div className="flex-1 space-y-1">
                <div className="text-sm font-medium text-gray-800">
                    {name ?? "Not Found"}
                </div>
                <span className="text-xs font-medium text-gray-400">
                    {account_number ?? "Not Found"}
                </span>
            </div>
            {withBalance && (
                <div className="font-semibold ">
                    <span className="text-lg">
                        {currencyFormat(balance) ?? 0}
                    </span>
                    <span className="block text-xs text-end font-light text-gray-400">
                        Current
                    </span>
                </div>
            )}
        </div>
    );
};
