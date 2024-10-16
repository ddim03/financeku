import Badge from "@/Components/Badge";
import Heading from "@/Components/Heading";
import Stat from "@/Components/Stat";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { currencyFormat } from "@/Utils/currencyFormat";
import { selectVariant } from "@/Utils/selectVariant";
import { showAccountNumber } from "@/Utils/showAccountNumber";
import { showAmount } from "@/Utils/showAmount";
import {
    faArrowTrendDown,
    faArrowTrendUp,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";

export default function Index({ auth, statistics, transactions }) {
    console.log(statistics);
    const header = ["no", "date", "account", "type", "amount"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white text-gray-900 overflow-hidden shadow-sm sm:rounded p-6">
                        <Heading
                            title="Quick Overview"
                            className="mb-6"
                            level="h1"
                        >
                            Welcome to your personal e-finance dashboard.
                        </Heading>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Stat
                                title="Total Balance"
                                value={currencyFormat(statistics.balance)}
                                variant={"info"}
                                icon={faWallet}
                                description={
                                    "Account Number: " +
                                    auth.user.account.account_number
                                }
                            />
                            <Stat
                                title="Income"
                                value={currencyFormat(statistics.income)}
                                variant={"success"}
                                icon={faArrowTrendUp}
                                description="This Month"
                            />
                            <Stat
                                title="Expenses"
                                value={currencyFormat(statistics.expense)}
                                variant={"danger"}
                                icon={faArrowTrendDown}
                                description="This Month"
                            />
                        </div>
                        <div className="mt-8">
                            <Heading
                                title="Recent Transaction"
                                className="mb-6"
                                level="h2"
                            >
                                All your recent transactions in one place
                            </Heading>
                            <Table header={header}>
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
                                                        value={cutomerAmount}
                                                        variant={variant}
                                                    />
                                                }
                                            />
                                        </Table.Tr>
                                    );
                                })}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
