import { currencyFormat } from "@/Utils/currencyFormat";

export default function CustomerInfo({ customer, isLoading = false }) {
    return (
        <div className="w-full bg-gray-200 rounded p-4 flex flex-col lg:flex-row justify-between">
            {isLoading ? <Skeleton /> : <CustomerData customer={customer} />}
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

const CustomerData = ({ customer, withBalance = false }) => {
    return (
        <div className="flex gap-4 w-full">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-1">
                <div className="text-sm font-medium text-gray-800">
                    {customer?.user.name ?? "Not Found"}
                </div>
                <span className="text-xs font-medium text-gray-400">
                    {customer?.account.account_number ?? "Not Found"}
                </span>
            </div>
            {withBalance && (
                <div className="text-lg font-semibold">
                    {currencyFormat(customer?.account.balance) ?? 0}
                </div>
            )}
        </div>
    );
};
