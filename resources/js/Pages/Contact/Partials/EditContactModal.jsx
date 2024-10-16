import CustomerInfo from "@/Components/CustomerInfo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function EditContactModal({
    show,
    contactToEdit,
    setShowEditModal,
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        account_number: "",
        alias: "",
    });

    useEffect(() => {
        if (show) {
            if (contactToEdit) {
                setData({
                    account_number: contactToEdit.account.account_number,
                    alias: contactToEdit.alias,
                });
            } else {
                reset();
            }
        } else {
            reset();
        }
    }, [contactToEdit, show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("contact.update", contactToEdit.id), {
            onSuccess: () => {
                setShowEditModal(false);
                reset();
            },
        });
    };

    const handleClose = () => {
        setShowEditModal(false);
        reset();
    };

    return (
        <Modal show={show} maxWidth="lg" onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Edit Contact
                </h2>
                <hr className="my-3 text-gray-700" />
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel
                            htmlFor="account_number"
                            value="Account Number"
                        />
                        <TextInput
                            id="account_number"
                            type="number"
                            name="account_number"
                            value={data.account_number}
                            className="mt-1 block w-full"
                            readOnly={true}
                        />
                    </div>
                    <div className="mt-4">
                        <CustomerInfo
                            customer={contactToEdit}
                            isLoading={false}
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="save_as" value="Save as" />
                        <TextInput
                            id="address"
                            type="text"
                            name="alias"
                            value={data.alias}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("alias", e.target.value)}
                        />
                        <InputError message={errors?.alias} className="mt-2" />
                    </div>
                    <div className="w-full flex gap-2 justify-end mt-4">
                        <SecondaryButton
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="!px-7" disabled={processing}>
                            Update
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
