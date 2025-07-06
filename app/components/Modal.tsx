import { ReactNode, useEffect, useState } from "react"

type ModalType = {
    children: ReactNode,
    open: boolean,
    onClose: () => void,
    outerClose?: boolean,
    escClose?: boolean
}

const Modal:React.FC<ModalType> = ({ children, open, onClose, outerClose = true, escClose = true }) => {

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (escClose && e.key === "Escape") {
                onClose()
            }
        }

        if (open) {
            document.body.classList.add("overflow-hidden")
            window.addEventListener("keydown", onEscape)
            setAnimate(true)
        } else {
            document.body.classList.remove("overflow-hidden")
            window.removeEventListener("keydown", onEscape)
            setAnimate(false)
        }
    }, [open])

    return (
        <dialog open={open}>
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur overflow-y-auto" onClick={outerClose ? onClose : undefined}>
            <div className={"max-w-fit mx-auto duration-300 "+(animate ? '' : 'scale-0')} onClick={e => e.stopPropagation()}>
                { children }
            </div>
        </div>
        </dialog>
        // <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur" onClick={onClose}>
        //     <div className="max-w-fit mx-auto" onClick={e => e.stopPropagation()}>
        //         { children }
        //     </div>
        // </div>
    )
}

export default Modal