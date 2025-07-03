"use client"

import Table from "@/app/components/Table"
import { useRef, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import TextareaAutosize from 'react-textarea-autosize'

type itemListType = {
    ItemName: string,
    Qty: string,
    Desc: string
}

const Request = () => {

    const [itemList, setItemList] = useState<itemListType[]>([])

    const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    const addItemList = () => {
        setItemList(p => ([...p, { ItemName: '', Qty: '', Desc: '' }]))
        setTimeout(() => inputRefs.current[inputRefs.current.length-1]?.focus(), 0)
    }

    const removeItem = (key: number) => {
        setItemList(p => p.filter((_, index) => index !== key))
        inputRefs.current.splice(key, 1)
    }

    let removeItemTimeout: ReturnType<typeof setTimeout>
    let keyTimeout: number

    const handleBlur = (key: number) => {
        if (!itemList[key].ItemName && !itemList[key].Qty && !itemList[key].Desc) {
            removeItemTimeout = setTimeout(() => removeItem(key), 100)
            keyTimeout = key
        }
    }

    const handleFocus = (key: number) => {
        if (keyTimeout === key) {
            clearTimeout(removeItemTimeout)
        }
    }

    return (
        <div className="flex gap-2">
            <div className="flex-1 bg-white shadow rounded p-4">
                <div className="font-bold text-xl mb-4">Make a Request</div>
                <div className="bg-slate-200 shadow rounded">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-slate-400">
                                <th className="text-start ps-4 py-1 w-40">Item Name</th>
                                <th className="text-start ps-4 py-1 w-20">Qty</th>
                                <th className="text-start ps-4 py-1 w-40">Description</th>
                                <th className="py-1 w-0">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            itemList.map((i, key) => (
                                <tr key={key} className={key % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}>
                                    <td className="px-2">
                                        <TextareaAutosize
                                        ref={el => { inputRefs.current[key] = el }}
                                        spellCheck={false}
                                        className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2 mt-1 resize-none"
                                        value={i.ItemName}
                                        placeholder="Item Name"
                                        onBlur={() => handleBlur(key)}
                                        onFocus={() => handleFocus(key)}
                                        onChange={e =>
                                        setItemList(p =>
                                        p.map((x, index) =>
                                        (key === index ? {...x, ItemName: e.target.value} : x)))} />
                                    </td>
                                    <td className="px-2">
                                        <input type="number"
                                        spellCheck={false}
                                        className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2"
                                        value={i.Qty}
                                        placeholder="Qty"
                                        onBlur={() => handleBlur(key)}
                                        onFocus={() => handleFocus(key)}
                                        onChange={e =>
                                        setItemList(p =>
                                        p.map((x, index) =>
                                        (key === index ? {...x, Qty: e.target.value} : x)))} />
                                    </td>
                                    <td className="px-2">
                                        <TextareaAutosize
                                        spellCheck={false}
                                        className="w-full hover:bg-white focus:bg-white outline-blue-500 rounded p-2 mt-1 resize-none"
                                        value={i.Desc}
                                        placeholder="Description"
                                        onBlur={() => handleBlur(key)}
                                        onFocus={() => handleFocus(key)}
                                        onChange={e =>
                                        setItemList(p =>
                                        p.map((x, index) =>
                                        (key === index ? {...x, Desc: e.target.value} : x)))} />
                                    </td>
                                    <td>
                                        <button onClick={() => removeItem(key)}
                                        className="text-slate-500 hover:text-red-500 block mx-auto">
                                            <FaRegTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }{
                            !itemList.length && (
                                <tr>
                                    <td colSpan={4} className="bg-slate-100 text-center text-slate-500 py-3">No Request Data</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
                <button
                onClick={addItemList}
                className="bg-blue-500 hover:bg-blue-400 text-white w-32 block mx-auto rounded-b-xl">Add Item</button>
                <div className="flex items-end gap-2 mt-4">
                    <TextareaAutosize
                    placeholder="Request note..."
                    className="input w-full resize-none"/>
                    <button className="button-green w-32">Send</button>
                </div>
            </div>
            <div className="w-1/3 bg-white shadow rounded p-4">
                <div className="font-bold text-xl mb-4">Request History</div>
                <Table
                    columns={[
                        { title: 'Title', data: 'title', sortable: true },
                        { title: 'Description', data: 'description' },
                        { title: 'Status', data: 'status', sortable: true },
                        { title: 'Date', data: 'createdAt', sortable: true }
                    ]}
                    rows={[]}
                    loading={false}
                />
            </div>
        </div>
    )
}
export default Request