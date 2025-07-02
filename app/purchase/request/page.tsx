import Table from "@/app/components/Table"
import { FaRegTrashAlt } from "react-icons/fa"

const Request = () => {
    return (
        <div className="flex gap-2">
            <div className="flex-1 bg-white shadow rounded p-4">
                <div className="font-bold text-xl mb-4">Make a Request</div>
                <div className="flex justify-center gap-2">
                    <div>
                        <label htmlFor="itemName" className="block ms-2 text-sm">Title</label>
                        <input id="itemName" type="text" placeholder="Nama item" className="input" />
                    </div>
                    <div>
                        <label htmlFor="itemQty" className="block ms-2 text-sm">Qty</label>
                        <input id="itemQty" type="number" placeholder="Qty" className="input" />
                    </div>
                    <div>
                        <label htmlFor="itemDesc" className="block text-sm text-transparent">-</label>
                        <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Insert</button>
                    </div>
                </div>
                <div className="p-5 bg-slate-200 mt-5">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-start py-1">Nama item</th>
                                <th className="text-start py-1">Qty</th>
                                <th className="w-0 py-1">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Item 1</td>
                                <td>2</td>
                                <td>
                                    <button className="text-slate-500 hover:text-red-500 block mx-auto"><FaRegTrashAlt /></button>
                                </td>
                            </tr>
                            <tr>
                                <td>Item 2</td>
                                <td>1</td>
                                <td>
                                    <button className="text-slate-500 hover:text-red-500 block mx-auto"><FaRegTrashAlt /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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