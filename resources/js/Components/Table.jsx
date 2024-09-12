const Table = ({ header, children }) => {
    return (
        <div className="relative overflow-x-auto sm:rounded">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
                    <tr>
                        {header.map((item, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-center"
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
};

const Tr = ({ children }) => (
    <tr className="even:bg-gray-100 odd:bg-white">{children}</tr>
);

const Td = ({ item }) => <td className="px-6 py-4">{item}</td>;

const TdAction = ({ children }) => (
    <td className="px-6 py-4 text-nowrap flex flex-col lg:flex-row gap-2">
        {children}
    </td>
);

Table.Tr = Tr;
Table.Td = Td;
Table.TdAction = TdAction;
export default Table;
