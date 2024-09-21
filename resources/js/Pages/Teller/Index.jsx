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
import TellerFormModal from "./Partials/TellerFormModal";
import DeleteTellerModal from "./Partials/DeleteTellerModal";
import BlockTellerModal from "./Partials/BlockTellerModal";

export default function Index({ auth, tellers, queryParams = null }) {
    queryParams = queryParams || {};
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(queryParams.q || "");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [tellerToEdit, setTellerToEdit] = useState(null);
    const [tellerToDelete, setTellerToDelete] = useState(null);
    const [tellerToBlock, setTellerToBlock] = useState(null);
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
                route("teller.index"),
                { q: debouncedSearchParams },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["tellers"],
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
    const handleAddNewTeller = () => {
        setTellerToEdit(null);
        setShowModal(true);
    };

    // Fungsi untuk membuka modal untuk mengedit data
    const handleEditTeller = (teller) => {
        setTellerToEdit(teller); // Set data teller yang akan diedit
        setShowModal(true);
    };

    const handleDeleteTeller = (teller) => {
        setTellerToDelete(teller); // Set data teller yang akan dihapus
        setShowDeleteModal(true);
    };

    const handleBlockTeller = (teller) => {
        setTellerToBlock(teller); // Set data teller yang akan diblock
        setShowBlockModal(true);
    };

    const header = ["no", "name", "email", "address", "status", "action"];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Teller Management" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded p-6">
                    <Heading title="Teller Management" className="mb-6">
                        Manage teller accounts
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
                            onClick={handleAddNewTeller}
                            disabled={showModal}
                        >
                            Add New Teller
                        </PrimaryButton>
                    </div>
                    <div className="mt-4">
                        <Table header={header}>
                            {tellers.data.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td
                                        className="text-center"
                                        item={index + 1}
                                    />
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
                                                handleBlockTeller(item)
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
                                                handleEditTeller(item)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-yellow-500"
                                            />
                                        </SecondaryButton>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleDeleteTeller(item)
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
                        {tellers.data.length > 0 && (
                            <Pagination meta={tellers.meta} noScroll={true} />
                        )}
                    </div>
                </div>
            </div>
            <TellerFormModal
                show={showModal}
                setShowModal={setShowModal}
                tellerToEdit={tellerToEdit}
            />
            <DeleteTellerModal
                show={showDeleteModal}
                teller={tellerToDelete}
                onClose={setShowDeleteModal}
            />
            <BlockTellerModal
                show={showBlockModal}
                teller={tellerToBlock}
                onClose={setShowBlockModal}
            />
        </AuthenticatedLayout>
    );
}
