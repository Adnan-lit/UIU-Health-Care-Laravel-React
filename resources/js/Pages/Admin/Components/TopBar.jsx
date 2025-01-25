export default function TopBar({ notifications, user, title }) {
    return (
        <div className={"flex justify-between w-full h-[15%] text-[#f5852a]"}>
            <div className={"flex items-center pl-5"}>
                <h1 className={"text-2xl font-bold"}>{title}</h1>
            </div>
            <div className="flex items-center gap-6">
                <div className={'bg-white h-10 w-10 flex justify-center items-center rounded-full '}>
                    <i className="fa-solid fa-magnifying-glass text-xl text-[#f5852a]"></i>
                </div>
                <div className={'bg-white h-10 w-10 flex justify-center items-center rounded-full '}>
                    <i className="fa-solid fa-bell text-xl text-[#f5852a]"></i>
                </div>
                <div className="flex items-center gap-4">
                    <img height='40px' width='40px' src={user.profile_photo_path} alt="User"
                         className="w-10 h-10 rounded-full"/>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-black">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.user_type}</p>
                    </div>
                    <i className="fa-solid fa-angle-down text-xl text-black"></i>

                </div>
            </div>
        </div>

    )
}
