import Badge from "@/Components/Badge";
import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectVariant } from "@/Utils/selectVariant";
import { showAccountNumber } from "@/Utils/showAccountNumber";
import { showAmount } from "@/Utils/showAmount";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Show({ auth, transactions, queryParams = null }) {
    queryParams = queryParams || {};
    const [selectedMonth, setSelectedMonth] = useState(
        queryParams?.month || ""
    );
    const [selectedType, setSelectedType] = useState(queryParams?.type || "");
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (
            selectedMonth !== queryParams?.month ||
            selectedType !== queryParams?.type
        ) {
            let filterMonth = selectedMonth.split("-")[1];
            router.get(
                route("history.customer"),
                { month: filterMonth, type: selectedType },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["transactions"],
                }
            );
        }
    }, [selectedMonth, selectedType]);

    const handleChangeMonth = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleChangeType = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show Cash Transaction" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Transaction History" className="mb-6">
                        All transactions history of your account
                    </Heading>
                    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
                        <div className="w-full lg:w-1/2 flex gap-2">
                            <TextInput
                                type="month"
                                min="2024-01"
                                max="2024-12"
                                onChange={(e) => handleChangeMonth(e)}
                                value={selectedMonth}
                                className="w-full"
                            />
                            <SelectInput
                                className="pl-4 pr-9 w-full"
                                onChange={(e) => handleChangeType(e)}
                            >
                                <option
                                    value="deposit"
                                    defaultValue={selectedType === "deposit"}
                                >
                                    Deposit
                                </option>
                                <option
                                    value="withdraw"
                                    defaultValue={selectedType === "withdraw"}
                                >
                                    Withdraw
                                </option>
                                <option
                                    value="transfer in"
                                    defaultValue={
                                        selectedType === "transfer in"
                                    }
                                >
                                    Transfer In
                                </option>
                                <option
                                    value="transfer out"
                                    defaultValue={
                                        selectedType === "transfer out"
                                    }
                                >
                                    Transfer Out
                                </option>
                            </SelectInput>
                        </div>
                        <a
                            className="block h-10 w-full lg:w-fit"
                            href={route("history.customer.print")}
                            target="_blank"
                        >
                            <PrimaryButton className=" w-full h-full inline-flex gap-2 items-center">
                                <FontAwesomeIcon icon={faPrint} />
                                Print
                            </PrimaryButton>
                        </a>
                    </div>
                    <div className="mt-4">
                        <Table
                            header={[
                                "no",
                                "date",
                                "account",
                                "type",
                                "amount",
                                "note",
                            ]}
                        >
                            {transactions.data.map((item, index) => {
                                let amount =
                                    item.type === "deposit" ||
                                    item.type === "transfer in"
                                        ? item.debit
                                        : item.credit;

                                let accountNumber = showAccountNumber(
                                    item.account,
                                    item.target_account,
                                    item.type
                                );

                                let variant = selectVariant(item.type);

                                let cutomerAmount = showAmount(
                                    item.type,
                                    amount
                                );
                                return (
                                    <Table.Tr key={index}>
                                        <Table.Td item={index + 1} />
                                        <Table.Td item={item.date} />
                                        <Table.Td item={accountNumber} />
                                        <Table.Td
                                            className="text-center"
                                            item={
                                                <Badge
                                                    value={item.type.toUpperCase()}
                                                    variant={variant}
                                                />
                                            }
                                        />
                                        <Table.Td
                                            className="text-center"
                                            item={
                                                <Badge
                                                    value={cutomerAmount}
                                                    variant={variant}
                                                />
                                            }
                                        />
                                        <Table.Td item={item.message} />
                                    </Table.Tr>
                                );
                            })}
                        </Table>
                        <Pagination
                            meta={transactions.meta}
                            links={transactions}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
