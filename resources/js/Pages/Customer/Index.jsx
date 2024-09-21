import Badge from "@/Components/Badge";
import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    faBan,
    faCircleCheck,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import CustomerFormModal from "./Partilals/CustomerFormModal";
import DeleteCustomerModal from "./Partilals/DeleteCustomerModal";
import BlockCustomerModal from "./Partilals/BlockCustomerModal";

export default function Index({ auth, customers, queryParams = null }) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [customerToEdit, setcustomerToEdit] = useState(null);
    const [customerToDelete, setcustomerToDelete] = useState(null);
    const [customerToBlock, setcustomerToBlock] = useState(null);
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
                route("customer.index"),
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

    // melacak perubahan value pada search input
    const handleSearchChange = (e) => {
        setSearchParams(e.target.value);
    };

    // Fungsi untuk membuka modal untuk menambah data baru
    const handleAddNewcustomer = () => {
        setcustomerToEdit(null);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal untuk mengedit data
    const handleEditcustomer = (customer) => {
        setcustomerToEdit(customer); // Set data customer yang akan diedit
        setShowModal(true);
    };

    const handleDeletecustomer = (customer) => {
        setcustomerToDelete(customer); // Set data customer yang akan dihapus
        setShowDeleteModal(true);
    };

    const handleBlockcustomer = (customer) => {
        setcustomerToBlock(customer); // Set data customer yang akan diblock
        setShowBlockModal(true);
    };

    const header = ["no", "name", "email", "address", "status", "action"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Customer Management" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Customer Management" className="mb-6">
                        Manage customer accounts
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
                            onClick={handleAddNewcustomer}
                            disabled={showModal}
                        >
                            Add New customer
                        </PrimaryButton>
                    </div>
                    <div className="mt-4">
                        <Table header={header}>
                            {customers.data.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td item={index + 1} />
                                    <Table.Td item={item.name} />
                                    <Table.Td item={item.email} />
                                    <Table.Td item={item.address} />
                                    <Table.Td
                                        item={
                                            <Badge
                                                value={
                                                    item.is_active === 0
                                                        ? "INACTIVE"
                                                        : "ACTIVE"
                                                }
                                                variant={
                                                    item.is_active === 0
                                                        ? "danger"
                                                        : "success"
                                                }
                                            />
                                        }
                                    />
                                    <Table.TdAction>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleBlockcustomer(item)
                                            }
                                        >
                                            {item.is_active === 0 ? (
                                                <FontAwesomeIcon
                                                    icon={faCircleCheck}
                                                    className="text-green-500"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faBan}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </SecondaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleEditcustomer(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-yellow-500"
                                            />
                                        </SecondaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleDeletecustomer(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="text-red-600"
                                            />
                                        </SecondaryButton>
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
            <CustomerFormModal
                show={showModal}
                setShowModal={setShowModal}
                customerToEdit={customerToEdit}
            />
            <DeleteCustomerModal
                show={showDeleteModal}
                customer={customerToDelete}
                onClose={setShowDeleteModal}
            />
            <BlockCustomerModal
                show={showBlockModal}
                customer={customerToBlock}
                onClose={setShowBlockModal}
            />
        </AuthenticatedLayout>
    );
}
