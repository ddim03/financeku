import { forwardRef, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

export default forwardRef(function TextInput(
    { className = "", isFocused = false, isLoading = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={"relative " + className}>
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 px-4">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
                {...props}
                ref={input}
                type="text"
                id="search"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded ps-10 py-3 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                autoComplete="off"
            />
            {isLoading && <Spinner className="absolute end-2.5 bottom-2" />}
        </div>
    );
});
