import { Link } from "@inertiajs/react";

export default function Pagination({ meta, noScroll = false }) {
    const links = meta.links;
    return (
        <div className="flex items-center justify-between w-full mt-5">
            <p className="hidden text-sm lg:block">
                Showing <strong>{meta.from}</strong> to{" "}
                <strong>{meta.to}</strong> from <strong>{meta.total}</strong>{" "}
                entries
            </p>
            <nav
                className="flex items-center justify-between w-full h-10 text-sm lg:w-fit lg:justify-normal lg:-space-x-px"
                aria-label="Navigasi Halaman"
            >
                {links.map((link, index) => (
                    <Link
                        key={index}
                        preserveScroll={noScroll}
                        href={link.url}
                        disabled={link.url === null || link.active}
                        as="button"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        aria-label={"Halaman ke-" + link.label}
                        className={
                            "hidden lg:flex items-center justify-center px-4 py-2 leading-tight " +
                            (link.active
                                ? "bg-gray-800 text-gray-100 "
                                : "text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 ") +
                            (link.url == null ? "cursor-not-allowed " : "") +
                            (index === 0 ? "rounded-l" : "") +
                            (index === links.length - 1 ? "rounded-r" : "")
                        }
                    ></Link>
                ))}
            </nav>
        </div>
    );
}
