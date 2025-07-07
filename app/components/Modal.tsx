import { ReactNode, useEffect, useState } from "react"

type ClosableModal = {
  children: ReactNode;
  open: boolean;
  closable?: true;
  onClose: () => void;
};

type NonClosableModal = {
  children: ReactNode;
  open: boolean;
  closable: false;
  onClose?: undefined;
};

const Modal:React.FC<ClosableModal|NonClosableModal> = ({ children, open, closable = true, onClose }) => {

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (closable && e.key === "Escape") {
                if (onClose) onClose()
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur overflow-y-auto" onClick={closable ? onClose : undefined}>
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