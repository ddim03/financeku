import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stat({
    title,
    value,
    icon,
    variant,
    description = null,
}) {
    const classVariant = {
        info: " border-violet-100 bg-violet-50 text-violet-500",
        success: " border-green-100 bg-green-50 text-green-500",
        danger: " border-red-100 bg-red-50 text-red-500",
        warning: " border-yellow-100 bg-yellow-50 text-yellow-500",
    };
    return (
        <div className="p-5 border rounded">
            <div className="flex items-center justify-between">
                <dl>
                    <dt className="text-2xl font-bold">{value}</dt>
                    <dd className="text-sm font-medium text-slate-500 mt-1">
                        {title}
                    </dd>
                </dl>
                <div
                    className={
                        "flex h-12 w-12 items-center justify-center rounded border" +
                        classVariant[variant]
                    }
                >
                    <FontAwesomeIcon icon={icon} size="lg" />
                </div>
            </div>
            {description && (
                <div className="text-xs text-slate-500 mt-4">{description}</div>
            )}
        </div>
    );
}
