"use client"

import { useEffect, useRef, useState } from "react"
import { FaPlus, FaRegTrashCan } from "react-icons/fa6"
import TextareaAutosize from 'react-textarea-autosize'
import RequestLog from "./RequestLog"

type reqListType = {
    ItemName: string,
    Qty: string,
    Unit: string,
    Description: string
}

const Request = () => {

    const [priority, setPriority] = useState(() => {
        const persist = localStorage.getItem('priority')
        return persist || 'medium'
    })

    const [reqList, setReqList] = useState<reqListType[]>(() => {
        const persist = localStorage.getItem('reqList')
        return persist ? JSON.parse(persist) : []
    })

    const [remarks, setRemarks] = useState(() => {
        const persist = localStorage.getItem('remarks')
        return persist || ''
    })

    const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([])

    let removeItemTimeout: ReturnType<typeof setTimeout>
    let keyTimeout: number

    const addreqList = () => {
        clearTimeout(removeItemTimeout)
        if (!reqList.some(i => !i.ItemName && !i.Qty && !i.Qty)) {
            setReqList(p => ([...p, { ItemName: '', Qty: '', Unit: '', Description: '' }]))
        }
        setTimeout(() => inputRefs.current[inputRefs.current.length-1]?.focus(), 0)
    }

    const handleInput = (key: number, e: any) => {
        setReqList(p => p.map((x, index) => (key === index ? {...x, [e.target.name]: e.target.value} : x)))
    }

    const removeItem = (key: number) => {
        setReqList(p => p.filter((_, index) => index !== key))
        inputRefs.current.splice(key, 1)
    }

    const handleBlur = (key: number) => {
        if (!reqList[key].ItemName && !reqList[key].Qty && !reqList[key].Unit && !reqList[key].Description) {
            removeItemTimeout = setTimeout(() => removeItem(key), 100)
            keyTimeout = key
        }
    }

    const handleFocus = (key: number) => {
        if (keyTimeout === key) {
            clearTimeout(removeItemTimeout)
        }
    }

    useEffect(() => {
        localStorage.setItem('reqList', JSON.stringify(reqList))
    }, [reqList])
    useEffect(() => {
        localStorage.setItem('remarks', remarks)
    }, [remarks])
    useEffect(() => {
        localStorage.setItem('priority', priority)
    }, [priority])

    return (
        <>
        <div className="flex justify-center flex-wrap gap-2">
            <div className="w-full lg:max-w-[40rem]">
                <div className="bg-white shadow rounded p-4">
                    <div className="font-bold text-xl mb-4">Make a Request</div>
                    <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                        <div>Priority</div>
                        <div className="flex bg-slate-200 p-1 rounded overflow-hidden">
                            <button onClick={() => setPriority('low')} className={"w-20 "+(priority === 'low' && 'bg-cyan-300')}>low</button>
                            <button onClick={() => setPriority('medium')} className={"w-20 "+(priority === 'medium' && 'bg-yellow-300')}>medium</button>
                            <button onClick={() => setPriority('high')} className={"w-20 "+(priority === 'high' && 'bg-red-300')}>high</button>
                        </div>
                    </div>
                    <div className="bg-slate-200 border border-slate-200 shadow rounded">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-400">
                                    <th className="text-start ps-4 py-1 w-40">Item Name</th>
                                    <th className="text-start ps-4 py-1 w-24">Qty</th>
                                    <th className="text-start ps-4 py-1 w-24">Unit</th>
                                    <th className="text-start ps-4 py-1 w-40">Description</th>
                                    <th className="py-1 w-0">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                reqList.map((i, key) => (
                                    <tr key={key} className={key % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}>
                                        <td className="px-2">
                                            <TextareaAutosize
                                            ref={el => { inputRefs.current[key] = el }}
                                            spellCheck={false}
                                            className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2 mt-1 resize-none"
                                            value={i.ItemName}
                                            placeholder="Item Name"
                                            name="ItemName"
                                            onBlur={() => handleBlur(key)}
                                            onFocus={e => {handleFocus(key); e.target.select()}}
                                            onChange={e => handleInput(key, e)} />
                                        </td>
                                        <td className="px-2">
                                            <input type="number"
                                            spellCheck={false}
                                            className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2"
                                            value={i.Qty}
                                            min={1}
                                            placeholder="Qty"
                                            name="Qty"
                                            onBlur={() => handleBlur(key)}
                                            onFocus={e => {handleFocus(key); e.target.select()}}
                                            onChange={e => handleInput(key, e)} />
                                        </td>
                                        <td className="px-2">
                                            <input className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2"
                                            placeholder="pcs/dus/kg"
                                            value={i.Unit}
                                            name="Unit"
                                            onFocus={e => {handleFocus(key); e.target.select()}}
                                            onBlur={() => handleBlur(key)}
                                            onChange={e => handleInput(key, e)} />
                                        </td>
                                        <td className="px-2">
                                            <TextareaAutosize
                                            spellCheck={false}
                                            className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2 mt-1 resize-none"
                                            value={i.Description}
                                            placeholder="Description"
                                            name="Description"
                                            onBlur={() => handleBlur(key)}
                                            onFocus={e => {handleFocus(key); e.target.select()}}
                                            onChange={e => handleInput(key, e)} />
                                        </td>
                                        <td>
                                            <button onClick={() => removeItem(key)}
                                            className="text-slate-500 hover:text-red-500 block mx-auto">
                                                <FaRegTrashCan />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }{
                                !reqList.length && (
                                    <tr>
                                        <td colSpan={5} className="bg-slate-100 text-center text-slate-500 py-3">
                                            No Request Data
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                    <button
                    onClick={addreqList}
                    className="bg-blue-500 hover:bg-blue-400 text-white w-32 py-1 mx-auto rounded-b-xl flex justify-center items-center gap-2">
                        Add Item <FaPlus />
                    </button>
                    <div className="flex items-end gap-2 mt-4">
                        <TextareaAutosize
                        spellCheck={false}
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                        placeholder="Request note..."
                        className="input w-full resize-none"/>
                        <button className="button-green w-32">Send</button>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3">
                <RequestLog />
            </div>
        </div>
        </>
    )
}
export default Request