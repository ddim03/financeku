import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stat({ title, value, icon, variant }) {
    const classVariant = {
        info: " border-violet-100 bg-violet-50 text-violet-500",
        success: " border-green-100 bg-green-50 text-green-500",
        danger: " border-red-100 bg-red-50 text-red-500",
        warning: " border-yellow-100 bg-yellow-50 text-yellow-500",
    };
    return (
        <div className="flex grow items-center justify-between p-5 border rounded">
            <dl>
                <dt className="text-2xl font-bold">{value}</dt>
                <dd className="text-sm font-medium text-slate-500">{title}</dd>
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
    );
}
