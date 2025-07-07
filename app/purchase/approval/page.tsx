"use client"

import Table, { columnType } from "@/app/components/Table"
import RequestLog from "../request/RequestLog"
import { FaChevronRight } from "react-icons/fa"
import Modal from "@/app/components/Modal"
import RequestDetail from "@/app/components/RequestDetail"
import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'

const Approval = () => {

    const [detailModal, setDetailModal] = useState(false)

    const reqDetail = {
        Priority: 'high',
        List: [
            { ItemName: 'Honda HRV', Qty: 1, Unit: 'unit', Description: 'Buat nganter sembako' },
            { ItemName: 'Beras', Qty: 1, Unit: 'kg', Description: 'Buat makan' },
        ],
        Remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui delectus totam veritatis corporis quia saepe, earum incidunt cupiditate explicabo esse.',
        Timeline: [
            { Status: 'Request', Approved: true, CreatedBy: 'Fauzi', CreatedDate: '2025-01-01' },
            { Status: 'Review', Approved: true, CreatedBy: 'Sufendi', CreatedDate: '2025-01-01' },
        ]
    }

    const columns: columnType[] = [
        { title: 'Date', data: 'CreatedDate', sortable: true },
        { title: 'Request By', data: 'CreatedBy', sortable: true },
        { title: 'Item', data: 'ItemSample', sortable: true },
        { title: 'Detail', style: {width: '0px', textAlign: 'center'}, render: (r) =>
        <button onClick={() => onDetail(r)} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"><FaChevronRight /></button>}
    ]

    const rows: any[] = [
        { CreatedDate: '2025-01-01', CreatedBy: 'Fauzi', ItemSample: 'Honda HRV...' }
    ]

    const onDetail = (data: any) => {
        setDetailModal(true)
    }

    return (
        <>
        <div className="flex gap-2">
            <div className="flex-1">
                <div className="bg-white shadow rounded p-4">
                    <div className="font-bold text-xl mb-4">Requests Approval</div>
                    <Table
                    columns={columns}
                    rows={rows}
                    />
                </div>
            </div>
            <div className="w-1/3">
                <RequestLog />
            </div>
        </div>
        <Modal open={detailModal} closable={false}>
            <div className="bg-white rounded w-[50rem] p-4">
                <RequestDetail data={reqDetail} />
                <div className="flex items-end gap-1 mt-4">
                    <TextareaAutosize
                    spellCheck={false}
                    className="input w-full resize-none"
                    placeholder="Approval remarks" />
                    <div className="flex gap-1">
                        <button className="button-green w-20">Approve</button>
                        <button className="button-red w-20">Reject</button>
                        <button onClick={() => setDetailModal(false)} className="button-slate w-20">Back</button>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    );
};

export default Approval