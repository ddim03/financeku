import {
    faCheck,
    faExclamation,
    faInfo,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Toast({ message, variant }) {
    const variantClasses = {
        success: "text-green-500 bg-green-100",
        error: "text-red-500 bg-red-100",
        warning: "text-yellow-500 bg-yellow-100",
        info: "text-blue-500 bg-blue-100",
    }[variant];

    return (
        <div
            className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded shadow top-20 right-5"
            role="alert"
        >
            <div
                className={
                    "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded " +
                    variantClasses
                }
            >
                {variant === "success" && <FontAwesomeIcon icon={faCheck} />}
                {variant === "error" && <FontAwesomeIcon icon={faTimes} />}
                {variant === "warning" && (
                    <FontAwesomeIcon icon={faExclamation} />
                )}
                {variant === "info" && <FontAwesomeIcon icon={faInfo} />}
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
        </div>
    );
}
