import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center shadow h-14 px-4">
            <FontAwesomeIcon icon={faBars} />
            <div className="size-10 rounded-full bg-slate-200"></div>
        </div>
    )
}

export default Navbar