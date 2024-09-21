import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    { type = "text", className = "", isFocused = false, children, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block " +
                className
            }
            ref={input}
            {...props}
        >
            <option value="">All</option>
            {children}
        </select>
    );
});
