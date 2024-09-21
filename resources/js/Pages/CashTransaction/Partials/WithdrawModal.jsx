import DisplayAccount from "@/Components/DisplayAccount";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function WithdrawModal({ show, setShowModal, customer }) {
    const [isMoreThanBalance, setIsMoreThanBalance] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        account_id: "",
        amount: "",
        message: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cash.withdraw.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    useEffect(() => {
        if (data.amount > customer?.account.balance) {
            setIsMoreThanBalance(true);
            errors.amount = "Insufficient Balance";
        } else {
            errors.amount = "";
            setIsMoreThanBalance(false);
        }
    }, [data.amount, customer?.account.balance]);

    useEffect(() => {
        setData("account_id", customer?.account.id);
    }, [customer]);

    return (
        <Modal show={show} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Customer Deposit
                </h2>
                <hr className="my-3 text-gray-700" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel value="Account" className="mb-2" />
                        <DisplayAccount
                            account_number={customer?.account.account_number}
                            name={customer?.name}
                            isLoading={false}
                            balance={customer?.account.balance}
                            withBalance={true}
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Amount" className="mb-2" />
                        <TextInput
                            name="amount"
                            type="number"
                            className="w-full"
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                        <InputError message={errors?.amount} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Message" className="mb-2" />
                        <TextAreaInput
                            name="message"
                            className="w-full"
                            onChange={(e) => setData("message", e.target.value)}
                        />
                        <InputError
                            message={errors?.message}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-full flex gap-2 justify-end mt-4">
                        <SecondaryButton onClick={() => setShowModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            className="!px-7"
                            disabled={processing || isMoreThanBalance}
                        >
                            Process
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
