import React from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useForm } from "@inertiajs/react";

export default function DeleteTellerModal({ show, teller, onClose, page }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("teller.destroy", [teller.id, { page: page }]), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={show} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Teller
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to delete this teller? This action
                    cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton
                        onClick={() => onClose()}
                        disabled={processing}
                    >
                        Cancel
                    </SecondaryButton>
                    <DangerButton
                        onClick={handleDelete}
                        disabled={processing}
                        className="!rounded"
                    >
                        Yes, Delete
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
