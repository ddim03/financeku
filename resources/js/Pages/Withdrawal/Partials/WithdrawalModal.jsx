import DisplayAccount from "@/Components/DisplayAccount";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function WithdrawalModal({
    show,
    setShowModal,
    contact,
    userAccount,
}) {
    console.log(contact);
    const { data, setData, post, processing, errors, reset } = useForm({
        account_id: userAccount.id,
        target_account_id: "",
        amount: 0,
        message: "",
    });

    const [isMoreThanBalance, setIsMoreThanBalance] = useState(false);

    useEffect(() => {
        if (data.amount > userAccount.balance) {
            setIsMoreThanBalance(true);
            errors.amount = "Insufficient Balance";
        } else {
            errors.amount = "";
            setIsMoreThanBalance(false);
        }
    }, [data.amount, userAccount.balance]);

    useEffect(() => {
        setData("target_account_id", contact?.account?.id);
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("transfer.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <Modal show={show} onClose={() => setShowModal(false)} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Customer Withdrawal
                </h2>
                <hr className="my-3 text-gray-700" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel value="Account Number" className="mb-2" />
                        <TextInput
                            name="amount"
                            type="number"
                            className="w-full"
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                        <InputError message={errors?.amount} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Account" className="mb-2" />
                        <DisplayAccount
                            account_number={userAccount.account_number}
                            name={userAccount.user.name}
                            isLoading={false}
                            balance={userAccount.balance}
                            withBalance={true}
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Nominal" className="mb-2" />
                        <TextInput
                            name="amount"
                            type="number"
                            className="w-full"
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                        <InputError message={errors?.amount} className="mt-2" />
                    </div>
                    <div className="w-full flex gap-2 justify-end mt-4">
                        <SecondaryButton onClick={() => setShowModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            className="!px-7"
                            disabled={processing || isMoreThanBalance}
                        >
                            process
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
