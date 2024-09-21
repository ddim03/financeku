import Badge from "@/Components/Badge";
import Heading from "@/Components/Heading";
import Stat from "@/Components/Stat";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectVariant } from "@/Utils/selectVariant";
import { showAccountNumber } from "@/Utils/showAccountNumber";
import { showAmount } from "@/Utils/showAmount";
import {
    faUserCheck,
    faUserSlash,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";

export default function Index({ auth, statistics, transactions }) {
    const header = ["no", "date", "name", "account", "type", "amount"];

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
                                title="Total Customer"
                                value={statistics.total_customers}
                                variant={"info"}
                                icon={faUsers}
                            />
                            <Stat
                                title="Active Customer"
                                value={statistics.active_customers}
                                variant={"success"}
                                icon={faUserCheck}
                            />
                            <Stat
                                title="Blocked Customer"
                                value={statistics.blocked_customers}
                                variant={"danger"}
                                icon={faUserSlash}
                            />
                        </div>
                        <div className="mt-8">
                            <Heading
                                title="Recent Transaction"
                                className="mb-3"
                                level="h2"
                            >
                                All your customer recent transactions in one
                                place
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
                                            <Table.Td
                                                className="text-center"
                                                item={index + 1}
                                            />
                                            <Table.Td item={item.date} />
                                            <Table.Td
                                                item={item.account.user.name}
                                            />
                                            <Table.Td
                                                className="text-nowrap"
                                                item={accountNumber}
                                            />
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
