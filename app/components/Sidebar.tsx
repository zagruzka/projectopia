"use client"

import { useAtom } from "jotai"
import { sidebarStore } from "../state/sidebar"

const Sidebar = () => {

    const [expand] = useAtom(sidebarStore)

    return (
        <div className={"bg-white shadow duration-300 "+(expand ? 'w-64' : 'w-0')}>
            {JSON.stringify(expand)}
        </div>
    )
}

export default Sidebar