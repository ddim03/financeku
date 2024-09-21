import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { currencyFormat } from "@/Utils/currencyFormat";
import {
    faDollarSign,
    faList,
    faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import DepositModal from "./Partials/DepositModal";
import WithdrawModal from "./Partials/WithdrawModal";
import Toast from "@/Components/Toast";

export default function Index({
    auth,
    customers,
    queryParams = null,
    success = null,
}) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [customerToDeposit, setCustomerToDeposit] = useState(null);
    const [customerToWithdraw, setCustomerToWithdraw] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const debouncedSearchParams = useDebounce(searchParams, 800);
    const isFirstRender = useRef(true);

    // untuk menghandle search dan debouncing
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debouncedSearchParams !== queryParams.q) {
            setIsLoading(true);
            router.get(
                route("cash.index"),
                { q: debouncedSearchParams },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["customers"],
                    onFinish: () => setIsLoading(false),
                }
            );
        }
    }, [debouncedSearchParams, queryParams.q]);

    useEffect(() => {
        if (success) {
            setSuccessMessage(true);
            let timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [success]);

    // melacak perubahan value pada search input
    const handleSearchChange = (e) => {
        setSearchParams(e.target.value);
    };

    const handleDeposit = (customer) => {
        setCustomerToDeposit(customer);
        setShowDepositModal(true);
    };

    const handleWithdraw = (customer) => {
        setCustomerToWithdraw(customer);
        setShowWithdrawModal(true);
    };

    const header = ["no", "nama", "account number", "balance", "action"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Customer Management" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Cash Transaction" className="mb-6">
                        Process cash deposits and withdrawals of your customers.
                    </Heading>
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-2">
                        <SearchInput
                            className="w-full lg:w-2/5 !rounded"
                            onChange={handleSearchChange}
                            value={searchParams}
                            isLoading={isLoading}
                            placeholder="Cari..."
                        />
                    </div>
                    <div className="mt-4">
                        <Table header={header}>
                            {customers.data.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td item={index + 1} />
                                    <Table.Td item={item.name} />
                                    <Table.Td
                                        item={item.account.account_number}
                                    />
                                    <Table.Td
                                        item={
                                            currencyFormat(
                                                item.account.balance
                                            ) ?? 0
                                        }
                                    />
                                    <Table.TdAction>
                                        <SecondaryButton
                                            className="flex gap-2 items-center"
                                            onClick={() => handleDeposit(item)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faDollarSign}
                                            />
                                            Deposit
                                        </SecondaryButton>
                                        <SecondaryButton
                                            className="flex gap-2 items-center"
                                            onClick={() => handleWithdraw(item)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faDollarSign}
                                            />
                                            Withdraw
                                        </SecondaryButton>
                                        <Link
                                            href={route(
                                                "history.index",
                                                item.id
                                            )}
                                        >
                                            <SecondaryButton className="flex gap-2 items-center">
                                                <FontAwesomeIcon
                                                    icon={faTimeline}
                                                />
                                                History
                                            </SecondaryButton>
                                        </Link>
                                    </Table.TdAction>
                                </Table.Tr>
                            ))}
                        </Table>
                        {customers.data.length > 0 && (
                            <Pagination meta={customers.meta} noScroll={true} />
                        )}
                    </div>
                </div>
            </div>
            <DepositModal
                show={showDepositModal}
                setShowModal={setShowDepositModal}
                customer={customerToDeposit}
            />
            <WithdrawModal
                show={showWithdrawModal}
                setShowModal={setShowWithdrawModal}
                customer={customerToWithdraw}
            />
            {successMessage && <Toast message={success} variant="success" />}
        </AuthenticatedLayout>
    );
}
