import {Link, usePage} from "@inertiajs/react";

export default function SideBar({menuItems}) {
    const { url } = usePage(); // Get the current URL path


    return (
        <div className="bg-[#151515] m-5 rounded-xl text-white w-[20%] shadow">
            <div className="flex h-[20%] w-full pl-[2em] items-center justify-start">
                <img src="/images/logo.png" alt="Logo" className="h-16"/>
            </div>
            <nav className="h-[60%] pl-[2.5em] flex flex-col gap-6 text-lg">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        preserveState // Ensures the page does not reload unnecessarily
                        preserveScroll // Keeps the scroll position intact
                        className={url === item.href ? "bg-gradient-to-r from-[#f5852a] to-[#f585fa] text-transparent bg-clip-text transition-all duration-300 ease-in-out" : "text-white hover:bg-gradient-to-r hover:from-[#f5852a] hover:to-[#f585fa] hover:text-transparent hover:bg-clip-text transition-all duration-300 ease-in-out"}
                    >
                        <i className={`${item.icon} mr-3`}></i>
                        {item.label}
                    </Link>
                ))}

            </nav>
            <nav className="h-[20%] pl-[2.5em] flex flex-col gap-6">
                <Link
                    key='/admin/settings'
                    href='/admin/settings'
                    className={url === '/admin/settings' ? "bg-gradient-to-r from-[#f5852a] to-[#f585fa] text-transparent bg-clip-text transition-all duration-300 ease-in-out" : "text-white hover:bg-gradient-to-r hover:from-[#f5852a] hover:to-[#f585fa] hover:text-transparent hover:bg-clip-text transition-all duration-300 ease-in-out"}
                >
                    <i className={`fa-solid fa-gear mr-3`}></i>
                    Settings
                </Link>
                <Link href="/logout" method="post"
                      className={url === '/admin/settings' ? "bg-gradient-to-r from-[#f5852a] to-[#f585fa] text-transparent bg-clip-text transition-all duration-300 ease-in-out" : "text-white hover:bg-gradient-to-r hover:from-[#f5852a] hover:to-[#f585fa] hover:text-transparent hover:bg-clip-text transition-all duration-300 ease-in-out"}

                >
                    <i className="fa-solid fa-sign-out-alt mr-3"></i>
                    Logout
                </Link>
            </nav>
        </div>

    )
}
