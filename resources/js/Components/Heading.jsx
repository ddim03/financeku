import React from "react";

export default function Heading({ title, children }) {
    return (
        <div className="p-6 text-gray-900">
            <h1 className="text-xl font-bold mb-1">{title}</h1>
            <span className="text-gray-500 text-sm">{children}</span>
        </div>
    );
}
