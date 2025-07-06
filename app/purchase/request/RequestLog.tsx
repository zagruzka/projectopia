import Modal from "@/app/components/Modal"
import RequestDetail from "@/app/components/RequestDetail"
import Table from "@/app/components/Table"
import { useState } from "react"

const RequestLog = () => {

    const [logModal, setLogModal] = useState(false)

    const columns = [
        { title: 'Date', data: 'CreatedDate', sortable: true },
        { title: 'Item', data: 'ItemSample', sortable: true },
        { title: 'Status', data: 'Status', sortable: true,
        render: (row: any) => <button onClick={() => setLogModal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 rounded">{row.Status}</button> },
    ]

    const rows = [
        { ItemSample: 'Honda HRV...', CreatedDate: '2025-01-01', Status: 'Review' }
    ]

    return (
        <>
        <div className="bg-white shadow rounded p-4">
            <div className="font-bold text-xl mb-4">Request Log</div>
            <Table
                columns={columns}
                rows={rows}
            />
        </div>
        <Modal open={logModal} onClose={() => setLogModal(false)}>
            <div className="bg-white rounded w-[50rem] p-4">
                <RequestDetail />
            </div>
        </Modal>
        </>
    )
}

export default RequestLog