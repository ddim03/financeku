import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import { useForm } from "@inertiajs/react";

export default function BlockCustomerModal({ show, customer, onClose }) {
    const { put, processing } = useForm();

    const handleDelete = () => {
        put(route("customer.block", customer.id), {
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
                    {customer?.is_active === 0
                        ? "Activate customer"
                        : "Block customer"}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Are you sure you want to{" "}
                    {customer?.is_active === 0 ? "activate" : "block"} this
                    customer?
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton
                        onClick={() => onClose()}
                        disabled={processing}
                    >
                        Cancel
                    </SecondaryButton>
                    {customer?.is_active === 0 ? (
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
