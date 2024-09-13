export default function Badge({ status }) {
    const statusName = {
        1: "Active",
        0: "Inactive",
    };
    const classByStatus = {
        1: "bg-green-100 text-green-800 border-green-400",
        0: "bg-red-100 text-red-800 border-red-400",
    };
    return (
        <span
            className={
                "text-xs font-medium me-2 px-2.5 py-0.5 rounded border " +
                classByStatus[status]
            }
        >
            {statusName[status]}
        </span>
    );
}
