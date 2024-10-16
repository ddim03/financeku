import React from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useForm } from "@inertiajs/react";

export default function DeleteContactModal({ show, contact, onClose }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("contact.destroy", contact.id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={show} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Contact
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to delete this contact? This action
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
