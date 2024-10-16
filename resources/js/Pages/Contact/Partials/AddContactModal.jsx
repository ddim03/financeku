import CustomerInfo from "@/Components/CustomerInfo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useDebounce } from "@/Hooks/useDebounce";
import useFetch from "@/Hooks/useFetch";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AddContactFormModal({ show, setShowModal }) {
    const [accountNumber, setAccountNumber] = useState("");
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            account_number: "",
            alias: "",
        });

    const debouncedAccountNumber = useDebounce(accountNumber, 800); // 500ms debounce delay

    // Fetch customer data ketika debouncedAccountNumber berubah
    useEffect(() => {
        if (debouncedAccountNumber) {
            const fetchCustomerData = async () => {
                setIsLoading(true);
                clearErrors();
                try {
                    let response = await useFetch(
                        route("contact.show", debouncedAccountNumber)
                    );
                    setCustomer(response.data);
                } catch (error) {
                    setCustomer(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCustomerData();
        } else {
            setIsLoading(true);
            clearErrors();
        }
    }, [debouncedAccountNumber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const handleClose = () => {
        setShowModal(false);
        reset();
        clearErrors();
    };

    // Handle perubahan input
    const handleChange = (e) => {
        setData("account_number", e.target.value);
        setAccountNumber(e.target.value);
    };

    return (
        <Modal show={show} maxWidth="lg" onClose={handleClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Add New Contact
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
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors?.account_number}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                        <CustomerInfo
                            customer={customer}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="save_as" value="Save as" />
                        <TextInput
                            id="address"
                            type="text"
                            name="save_as"
                            value={data.save_as}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("alias", e.target.value)}
                        />
                        <InputError
                            message={errors?.save_as}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full flex gap-2 justify-end mt-4">
                        <SecondaryButton onClick={() => setShowModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="!px-7" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
