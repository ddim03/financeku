export default function Badge({ value, variant, onClick }) {
    const classVariant = {
        info: " border-violet-100 bg-violet-50 text-violet-500",
        success: " border-green-100 bg-green-50 text-green-500",
        danger: " border-red-100 bg-red-50 text-red-500",
        warning: " border-yellow-100 bg-yellow-50 text-yellow-500",
        accent: " border-emerald-100 bg-emerald-50 text-emerald-500",
    };
    return (
        <span
            onClick={onClick}
            className={
                "text-xs font-medium px-2.5 py-0.5 rounded border cursor-pointer " +
                classVariant[variant]
            }
        >
            {value}
        </span>
    );
}

