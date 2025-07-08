"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"
import Image from "next/image"
import { useState } from "react"
import { MdChevronRight, MdClose, MdOutlineShoppingCart } from "react-icons/md"
import { LuConciergeBell } from "react-icons/lu"
import { TbFileCheck, TbFileSearch, TbHome } from "react-icons/tb"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {

    const [open, setOpen] = useAtom(sidebarStore)

    const path = usePathname()

    const [menu] = useState([
        { name: "Home", icon: <TbHome size={25} />, href: '#' },
        { name: "Purchasing", icon: <MdOutlineShoppingCart size={25} />, subMenu: [
            { name: "Request", href: '/purchasing/request', icon: <LuConciergeBell size={25} /> },
            { name: "Review", href: '/purchasing/review', icon: <TbFileSearch size={25} /> },
            { name: "Approval", href: '/purchasing/approval', icon: <TbFileCheck size={25} /> }
        ] }
    ])

    const [expendKey, setExpandKey] = useState<number | null>(null)

    return (
        <>
            <div className={"fixed lg:hidden inset-0 bg-black/50 z-40 "+(!open && 'hidden')}></div>
            <div className={"fixed lg:static z-40 h-full flex flex-col gap-1 bg-white shadow duration-300 px-2 w-56 "+(!open && '-ms-56')}>
                <button onClick={() => setOpen(false)} className={"absolute lg:hidden left-56 ms-2 mt-4 rounded-full bg-red-200 "+(!open && 'hidden')}>
                    <MdClose size={30} />
                </button>
                <Image src="/company-logo.jpg" alt="Company Logo" width={150} height={100} className="mx-auto my-4" />
                {
                menu.map((i, key) => (
                    <div key={key}>
                        {
                        i.subMenu?.length ?
                        <>
                        <button onClick={() => setExpandKey(expendKey === key ? null : key)}
                        className="flex justify-between items-center w-full p-2 hover:bg-slate-200 rounded">
                            <div className="flex gap-2">{i.icon}{i.name}</div>
                            <MdChevronRight size={20} className={'duration-300 '+(key === expendKey && "rotate-90")} />
                        </button>
                        <div className={"overflow-hidden duration-300 "+(key === expendKey ? 'max-h-40' : 'max-h-0')}>
                            <div className="flex flex-col gap-1 border-l-2 border-slate-400 ms-4 ps-1 pt-1">
                                {i.subMenu.map((sub, subKey) => (
                                    <Link key={subKey} href={sub.href}
                                    className={"flex gap-2 p-2 hover:bg-slate-200 rounded "+(path === sub.href ? 'bg-slate-200 text-blue-500' : '')}>
                                        {sub.icon}{sub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        </>
                        :
                        <Link href={i.href || '#'} className="flex gap-2 p-2 hover:bg-slate-200 rounded">
                            {i.icon}{i.name}
                        </Link>
                        }
                    </div>
                ))
                }
                <div className="flex-grow"></div>
                <footer className="py-2 px-4 text-center text-sm text-gray-500">
                    © 2023 Company Name
                </footer>
            </div>
        </>
    )
}

export default Sidebar