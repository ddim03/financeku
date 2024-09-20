import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import WithdrawalModal from "./Partials/WithdrawalModal";
import { Button } from "flowbite-react";

export default function Index({
    auth,
    userAccount,
    contacts,
    queryParams = null,
}) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const debouncedSearchParams = useDebounce(searchParams, 800);
    const [showModal, setShowModal] = useState(false);
    const [contactToTransfer, setContactToTransfer] = useState(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (debouncedSearchParams !== queryParams.q) {
            setIsLoading(true);
            router.get(
                route("transfer.index"),
                { q: debouncedSearchParams },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["contacts"],
                    onFinish: () => setIsLoading(false),
                }
            );
        }
    }, [debouncedSearchParams, queryParams.q]);

    const handleSearchChange = (e) => {
        setSearchParams(e.target.value);
    };

    const handleSendMoney = (item) => {
        setShowModal(true); // Tampilkan modal
        setContactToTransfer(item); // Set item untuk transfer
    };

    const header = ["no", "account number", "name", "action"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Withdrawal" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Cash Transaction" className="mb-6">
                        Process cash and withdrawal
                    </Heading>
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-2">
                        <SearchInput
                            className="w-full lg:w-2/5 !rounded"
                            onChange={handleSearchChange}
                            value={searchParams}
                            isLoading={isLoading}
                            placeholder="Cari..."
                        />
                        <div className="flex space-x-2 lg:space-x-4">
                            <Button color="dark">Deposit</Button>
                            {/* Tombol Withdraw */}
                            <Button onClick={() => setShowModal(true)} color="dark">
                                Withdraw
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Table header={header}>
                            {contacts.data.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td
                                        item={index + 1}
                                        className="text-center"
                                    />
                                    <Table.Td
                                        item={item.account.account_number}
                                        className="text-center"
                                    />
                                    <Table.Td item={item.alias} className="text-center"/>
                                </Table.Tr>
                            ))}
                        </Table>
                        {contacts.data.length > 0 && (
                            <Pagination meta={contacts.meta} noScroll={true} />
                        )}
                    </div>
                </div>
            </div>
            <WithdrawalModal
                show={showModal} // Menampilkan modal sesuai state
                user={auth.user}
                setShowModal={setShowModal}
                contact={contactToTransfer} // Mengirimkan data kontak untuk transfer
                userAccount={userAccount.data}
            />
        </AuthenticatedLayout>
    );
}
