import React from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useForm } from "@inertiajs/react";
import SuccessButton from "@/Components/SuccessButton";

export default function BlockTellerModal({ show, teller, onClose }) {
    const { put, processing } = useForm();

    const handleDelete = () => {
        put(route("teller.block", teller.id), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={show} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {teller?.is_active === 0
                        ? "Activate Teller"
                        : "Block Teller"}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to{" "}
                    {teller?.is_active === 0 ? "activate" : "block"} this
                    teller?
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton
                        onClick={() => onClose()}
                        disabled={processing}
                    >
                        Cancel
                    </SecondaryButton>
                    {teller?.is_active === 0 ? (
                        <SuccessButton
                            onClick={handleDelete}
                            disabled={processing}
                            className="!rounded"
                        >
                            Yes, Activate
                        </SuccessButton>
                    ) : (
                        <DangerButton
                            onClick={handleDelete}
                            disabled={processing}
                            className="!rounded"
                        >
                            Yes, Block
                        </DangerButton>
                    )}
                </div>
            </div>
        </Modal>
    );
}
