"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"
import { FaBars } from "react-icons/fa"
import { useState } from "react"

const Navbar = () => {

    const [expand, setExpand] = useAtom(sidebarStore)

    const [showLogout, setShowLogout] = useState(false)

    return (
        <header className="sticky w-full top-0 flex justify-between items-center bg-white shadow h-16 px-4">
            <button onClick={() => (setExpand(!expand))} className="py-2 px-4 rounded hover:bg-slate-200"><FaBars size={20} /></button>
            <button onClick={() =>  setShowLogout(true) } className="relative size-10 bg-slate-500 rounded-full bg-top bg-cover" style={{ backgroundImage: "url(/profile.jpg)" }}>
                <div tabIndex={0} ref={e => e?.focus()} onBlur={() => setShowLogout(false)}
                className={"absolute -bottom-16 right-0 bg-white shadow border border-slate-300 p-2 rounded "+(!showLogout && 'hidden')}>
                    <div onClick={() => alert('logout')} className="button-red w-20">Logout</div>
                </div>
            </button>
        </header>
    )
}

export default Navbar