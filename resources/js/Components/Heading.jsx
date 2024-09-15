import React from "react";

export default function Heading({ title, children, className, level = "h1" }) {
    const classLevel = {
        h1: "text-2xl font-bold mb-1",
        h2: "text-lg font-bold mb-1",
        h3: "text-base font-bold mb-1",
        h4: "text-sm font-bold mb-1",
        h5: "text-xs font-bold mb-1",
        h6: "text-xs font-bold mb-1",
    };

    return (
        <div className={"text-gray-900 " + className}>
            <p className={classLevel[level]}>{title}</p>
            <span className="text-gray-500 text-sm">{children}</span>
        </div>
    );
}
