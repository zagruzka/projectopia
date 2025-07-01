import { ReactNode, useEffect } from 'react'

type DialogType = {
    children: ReactNode,
    open: boolean,
    onClose: () => void,
    outerClose?: boolean
}

const Dialog:React.FC<DialogType> = ({ children, open, onClose, outerClose = false }) => {

    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (open) {
            document.body.classList.add('overflow-hidden')
            window.addEventListener('keydown', onEscape)
        }
        return(() => {
            document.body.classList.remove('overflow-hidden')
            window.removeEventListener('keydown', onEscape)
        })
    }, [open])

    return (
        open &&
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur overflow-y-auto' onClick={outerClose ? onClose : undefined}>
            <div className='max-w-fit mx-auto' onClick={e => e.stopPropagation()}>
                { children }
            </div>
        </div>
        // <div className='fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur' onClick={onClose}>
        //     <div className='max-w-fit mx-auto' onClick={e => e.stopPropagation()}>
        //         { children }
        //     </div>
        // </div>
    )
}

export default Dialog