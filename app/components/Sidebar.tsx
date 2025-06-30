"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

const Sidebar = () => {

    const [expand] = useAtom(sidebarStore)

    return (
        <div className={"flex flex-col bg-white shadow duration-300 w-52 "+(!expand && '-ms-52')}>
            <Image src="/company-logo.jpg" alt="Company Logo" width={150} height={100} className="mx-auto my-4" />
            <div className="relative">
                <input type="checkbox" id="toggle" className="peer hidden" />
                <label htmlFor="toggle" className="absolute top-0 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded block">
                    Toggle
                </label>
                <FontAwesomeIcon icon={faChevronRight} className="ml-2 duration-300 peer-checked:rotate-90" />
                <div className="max-h-0 peer-checked:max-h-40 overflow-hidden duration-300 bg-blue-100 rounded">
                    Hidden content shown when checkbox is checked.
                </div>
            </div>
            <nav className="flex flex-col">
                <a href="#" className="py-2 px-4 hover:bg-slate-200">Dashboard</a>
                <a href="#" className="py-2 px-4 hover:bg-slate-200">Projects</a>
                <a href="#" className="py-2 px-4 hover:bg-slate-200">Tasks</a>
                <a href="#" className="py-2 px-4 hover:bg-slate-200">Settings</a>
            </nav>
            <div className="flex-grow"></div>
            <footer className="py-2 px-4 text-center text-sm text-gray-500">
                © 2023 Company Name
            </footer>
        </div>
    )
}

export default Sidebar