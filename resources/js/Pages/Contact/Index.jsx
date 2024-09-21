import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/Hooks/useDebounce";
import AddContactFormModal from "./Partials/AddContactModal";
import EditContactModal from "./Partials/EditContactModal";
import DeleteContactModal from "./Partials/DeleteContactModal";
import Toast from "@/Components/Toast";

export default function Index({
    auth,
    contacts,
    queryParams = null,
    success = null,
}) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
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
                route("contact.index"),
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

    const handleAddContact = () => {
        setShowModal(true);
    };

    // Fungsi untuk membuka modal untuk mengedit data
    const handleEditContact = (contact) => {
        setContactToEdit(contact); // Set data contact yang akan diedit
        setShowEditModal(true);
    };

    const handleDeleteContact = (contact) => {
        setContactToDelete(contact); // Set data contact yang akan dihapus
        setShowDeleteModal(true);
    };

    const header = ["no", "account number", "name", "save at", "action"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contact Management" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Contact Management" className="mb-6">
                        Manage your contacts
                    </Heading>
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-2">
                        <SearchInput
                            className="w-full lg:w-2/5 !rounded"
                            onChange={handleSearchChange}
                            value={searchParams}
                            isLoading={isLoading}
                            placeholder="Cari..."
                        />
                        <PrimaryButton
                            className="justify-center py-3 lg:py-0"
                            onClick={handleAddContact}
                        >
                            Add New Contact
                        </PrimaryButton>
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
                                    <Table.Td item={item.alias} />
                                    <Table.Td
                                        item={item.created_at}
                                        className="text-center"
                                    />
                                    <Table.TdAction>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleEditContact(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-yellow-400"
                                            />
                                        </SecondaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleDeleteContact(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="text-red-500"
                                            />
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
            <AddContactFormModal show={showModal} setShowModal={setShowModal} />
            <EditContactModal
                show={showEditModal}
                setShowEditModal={setShowEditModal}
                contactToEdit={contactToEdit}
            />
            <DeleteContactModal
                show={showDeleteModal}
                contact={contactToDelete}
                onClose={() => setShowDeleteModal(false)}
            />
            {successMessage && <Toast message={success} variant="success" />}
        </AuthenticatedLayout>
    );
}
