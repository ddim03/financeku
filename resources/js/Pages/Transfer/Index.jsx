import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import TransferModal from "./Partials/TransferModal";
import Toast from "@/Components/Toast";
import { calculateStartingNumber } from "@/Utils/calculateStartingNumber";

export default function Index({
    auth,
    userAccount,
    contacts,
    queryParams = null,
    success = null,
}) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const debouncedSearchParams = useDebounce(searchParams, 800);
    const [showModal, setShowModal] = useState(false);
    const [contactToTransfer, setContactToTransfer] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
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

    useEffect(() => {
        if (success) {
            setSuccessMessage(true);
            let timeout = setTimeout(() => {
                setSuccessMessage(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [success]);

    const handleSearchChange = (e) => {
        setSearchParams(e.target.value);
    };

    const handleSendMoney = (item) => {
        setShowModal(true);
        setContactToTransfer(item);
    };

    const header = ["no", "account number", "name", "action"];
    const startNumber = calculateStartingNumber(
        contacts.meta.current_page,
        contacts.meta.per_page
    );
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Transfer" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Transfer" className="mb-6">
                        Send money quickly and securely.
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
                            {contacts.data.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td
                                        item={startNumber + index}
                                        className="text-center"
                                    />
                                    <Table.Td
                                        item={item.account.account_number}
                                        className="text-center"
                                    />
                                    <Table.Td item={item.alias} />
                                    <Table.TdAction>
                                        <SecondaryButton
                                            className="inline-flex justify-center gap-3"
                                            onClick={() =>
                                                handleSendMoney(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                            />
                                            Transfer
                                        </SecondaryButton>
                                    </Table.TdAction>
                                </Table.Tr>
                            ))}
                        </Table>
                        {contacts.data.length > 0 && (
                            <Pagination meta={contacts.meta} noScroll={true} />
                        )}
                    </div>
                </div>
            </div>
            <TransferModal
                show={showModal}
                user={auth.user}
                setShowModal={setShowModal}
                contact={contactToTransfer}
                userAccount={userAccount.data}
            />
            {successMessage && <Toast message={success} variant="success" />}
        </AuthenticatedLayout>
    );
}
