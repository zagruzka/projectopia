"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"
import Image from "next/image"
import { useState } from "react"
import { MdChevronRight, MdOutlineSpaceDashboard } from "react-icons/md"
import { LuConciergeBell } from "react-icons/lu"

const Sidebar = () => {

    const [open] = useAtom(sidebarStore)

    const [menu, setMenu] = useState([
        { name: "Dashboard", icon: <MdOutlineSpaceDashboard size={25} />, expand: false },
        { name: "Request", icon: <LuConciergeBell size={25} />, expand: false },
    ])

    return (
        <div className={"flex flex-col gap-1 bg-white shadow duration-300 px-2 w-52 "+(!open && '-ms-52')}>
            <Image src="/company-logo.jpg" alt="Company Logo" width={150} height={100} className="mx-auto my-4" />
            {
            menu.map((i, key) => (
                <div key={key} className="relative">
                    <button key={key}
                    onClick={() => setMenu(pv => (pv.map((m, index) => ( index === key ? { ...m, expand: !m.expand } : m))))}
                    className="flex justify-between items-center w-full p-2 bg-slate-200 hover:bg-slate-300 rounded">
                        <div className="flex gap-1">
                            {i.icon}{i.name}
                        </div>
                        <MdChevronRight className="rotate-90" />
                    </button>
                    <div className={"overflow-hidden duration-300 transition-all bg-slate-100 rounded "+(i.expand ? 'max-h-40' : 'max-h-0')}>
                        <div className="h-96 bg-red-500">

                        </div>
                    </div>
                </div>
            ))
            }
            {/* <div>
                <input type="checkbox" id="toggle" className="peer hidden" />
                <label htmlFor="toggle" className="top-0 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded block">
                    Toggle
                </label>
                <FontAwesomeIcon icon={faChevronRight} className="ml-2 duration-300 peer-checked:rotate-90" />
                <div className="max-h-0 peer-checked:max-h-40 overflow-hidden duration-300 bg-blue-100 rounded">
                    Hidden content shown when checkbox is checked.
                </div>
            </div> */}
            <div className="flex-grow"></div>
            <footer className="py-2 px-4 text-center text-sm text-gray-500">
                © 2023 Company Name
            </footer>
        </div>
    )
}

export default Sidebar