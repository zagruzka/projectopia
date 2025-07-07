import Modal from "@/app/components/Modal"
import RequestDetail from "@/app/components/RequestDetail"
import Table, { columnType } from "@/app/components/Table"
import { useState } from "react"

const RequestLog = () => {

    const [logModal, setLogModal] = useState(false)

    const [reqDetal, setReqDetail] = useState<any>()

    const columns: columnType[] = [
        { title: 'Date', data: 'CreatedDate', sortable: true },
        { title: 'Item', data: 'ItemSample', sortable: true },
        { title: 'Status', data: 'Status', sortable: true, style: {width: '0px'},
        render: (row: any, key: number) =>
        <button onClick={() => showModal(key)} className={"w-24 bg-blue-500 hover:bg-blue-600 text-white rounded"}>{row.Status}</button> },
    ]

    const rows = [
        { ItemSample: 'Honda HRV...', CreatedDate: '2025-01-01', Status: 'Approval' },
        { ItemSample: 'Mini PC...', CreatedDate: '2025-01-02', Status: 'Review' },
    ]

    const requestList = [
        {
            List: [
                { ItemName: 'Honda HRV', Qty: 1, Unit: 'unit', Description: 'Buat nganter sembako' },
                { ItemName: 'Beras', Qty: 1, Unit: 'kg', Description: 'Buat makan' },
            ],
            Remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui delectus totam veritatis corporis quia saepe, earum incidunt cupiditate explicabo esse.',
            Timeline: [
                { Status: 'Request', Approved: true, CreatedBy: 'Fauzi', CreatedDate: '2025-01-01' },
                { Status: 'Review', Approved: true, CreatedBy: 'Sufendi', CreatedDate: '2025-01-01' },
            ]
        },
        {
            List: [
                { ItemName: 'Mini PC i5 gen 13', Qty: 1, Unit: 'pcs', Description: 'Untuk karyawan baru' },
                { ItemName: 'Monitor', Qty: 1, Unit: 'pcs', Description: '-' },
            ],
            Remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui delectus totam veritatis corporis quia saepe, earum incidunt cupiditate explicabo esse.',
            Timeline: [
                { Status: 'Request', Approved: true, CreatedBy: 'Fauzi', CreatedDate: '2025-01-01' },
            ]
        }
    ]

    const showModal = (key: number) => {
        setLogModal(true)
        setReqDetail(requestList[key])
    }

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
                <RequestDetail data={reqDetal} />
            </div>
        </Modal>
        </>
    )
}

export default RequestLog