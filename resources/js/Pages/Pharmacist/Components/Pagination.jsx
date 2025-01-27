import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="flex justify-center items-center space-x-2">
            {/* Loop through pagination links */}
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.url || "#"}
                    preserveScroll
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 
                        ${link.active 
                            ? "bg-orange-500 text-white"  // Active link styling
                            : "text-gray-700 hover:bg-orange-200 hover:text-gray-900"} 
                        ${!link.url 
                            ? "cursor-not-allowed text-gray-400"  // Disabled link styling
                            : "cursor-pointer"}`}
                >
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                </Link>
            ))}
        </nav>
    );
}
