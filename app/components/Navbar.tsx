"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"
import { FaBars } from "react-icons/fa"

const Navbar = () => {

    const [expand, setExpand] = useAtom(sidebarStore)

    return (
        <header className="sticky w-full top-0 flex justify-between items-center bg-white shadow h-16 px-4">
            <button onClick={() => (setExpand(!expand))} className="py-2 px-4 rounded hover:bg-slate-200"><FaBars size={20} /></button>
            <div className="size-10 rounded-full bg-slate-200"></div>
        </header>
    )
}

export default Navbar