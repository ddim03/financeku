import Badge from "@/Components/Badge";
import Heading from "@/Components/Heading";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import { useDebounce } from "@/Hooks/useDebounce";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectVariant } from "@/Utils/selectVariant";
import { showAccountNumber } from "@/Utils/showAccountNumber";
import { showAmount } from "@/Utils/showAmount";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function HistoryTr({ auth, transactions, queryParams = null }) {
    const header = ["no", "date", "name", "account number", "type", "amount"];
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const debouncedSearchParams = useDebounce(searchParams, 800);
    const isFirstRender = useRef(true);
    const [filter, setFilter] = useState("");

    // Function to handle filter change
    const handleFilterChange = (type) => {
        setFilter(type);
        router.get(route('history.transactions'), { filter: type }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Function to filter transactions based on search input
    const filteredTransactions = transactions.data.filter(item =>
        item.user.name.toLowerCase().includes(debouncedSearchParams.toLowerCase())
    );

    // Effect to handle search debounce and API call
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debouncedSearchParams !== queryParams.q) {
            setIsLoading(true);
            router.get(
                route("history.transactions"),
                { q: debouncedSearchParams },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["transactions"],
                    onFinish: () => setIsLoading(false),
                }
            );
        }
    }, [debouncedSearchParams, queryParams.q]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchParams(e.target.value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="History Transaction" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white text-gray-900 overflow-hidden shadow-sm sm:rounded p-6">
                        <Heading
                            title="History Transaction"
                            className="mb-6"
                            level="h1"
                        >
                            History Transaction
                        </Heading>

                        <div className="mt-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                                {/* Search Input */}
                                <SearchInput
                                    className="w-full lg:w-2/5 !rounded"
                                    onChange={handleSearchChange}
                                    value={searchParams}
                                    isLoading={isLoading}
                                    placeholder="Cari..."
                                />

                                {/* Filter Dropdown */}
                                <div className="flex space-x-2 lg:space-x-4">
                                    <select
                                        className="border rounded p-2"
                                        value={filter}
                                        onChange={(e) => handleFilterChange(e.target.value)}
                                    >
                                        <option value="">All Transactions</option>
                                        <option value="deposit">Deposit</option>
                                        <option value="withdraw">Withdraw</option>
                                        <option value="transfer out">Transfer Out</option>
                                        <option value="transfer in">Transfer In</option>
                                    </select>
                                </div>
                            </div>

                            <Table header={header}>
                                {filteredTransactions.map((item, index) => {
                                    let amount =
                                        item.type === "deposit"
                                            ? item.debit
                                            : item.credit;

                                    let accountNumber = showAccountNumber(
                                        item.account,
                                        item.target_account
                                    );

                                    let variant = selectVariant(item.type);

                                    let customerAmount = showAmount(
                                        item.type,
                                        amount
                                    );
                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td item={index + 1} />
                                            <Table.Td item={item.date} />
                                            <Table.Td item={item.user.name} />
                                            <Table.Td item={accountNumber} />
                                            <Table.Td
                                                item={
                                                    <Badge
                                                        value={item.type.toUpperCase()}
                                                        variant={variant}
                                                    />
                                                }
                                            />
                                            <Table.Td
                                                item={
                                                    <Badge
                                                        value={customerAmount}
                                                        variant={variant}
                                                    />
                                                }
                                            />
                                        </Table.Tr>
                                    );
                                })}
                            </Table>

                            {/* Add Pagination Component */}
                            {filteredTransactions.length > 0 && (
                                <Pagination meta={transactions.meta} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
