"use client"

import Table, { columnType } from "@/app/components/Table"
import RequestLog from "../request/RequestLog"
import { FaChevronRight } from "react-icons/fa"
import Modal from "@/app/components/Modal"
import RequestDetail from "@/app/components/RequestDetail"
import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import { priorityColor } from "@/app/utils/colors"

const Review = () => {

    const [detailModal, setDetailModal] = useState(false)

    const reqDetail = {
        Priority: 'high',
        List: [
            { ItemName: 'Mini PC i5 gen 13', Qty: 1, Unit: 'pcs', Description: 'Untuk karyawan baru' },
            { ItemName: 'Monitor', Qty: 1, Unit: 'pcs', Description: '-' },
        ],
        Remarks: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui delectus totam veritatis corporis quia saepe, earum incidunt cupiditate explicabo esse.',
        Timeline: [
            { Status: 'Request', Approved: true, CreatedBy: 'Fauzi', CreatedDate: '2025-01-02' },
        ]
    }

    const columns: columnType[] = [
        { title: 'Date', data: 'CreatedDate', sortable: true },
        { title: 'Request By', data: 'CreatedBy', sortable: true },
        { title: 'Item', data: 'ItemSample', sortable: true },
        { title: 'Priority', data: 'Priority', render: (r) => <div className={'w-20 text-center rounded '+priorityColor(r.Priority)}>{r.Priority}</div>, sortable: true },
        { title: 'Detail', style: {width: '0px', textAlign: 'center'}, render: (r) =>
        <button onClick={() => onDetail(r)} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"><FaChevronRight /></button>}
    ]

    const rows = [
        { CreatedDate: '2025-01-02', CreatedBy: 'Fauzi', ItemSample: 'Mini PC...', Priority: 'high' }
    ]

    const onDetail = (data: any) => {
        setDetailModal(true)
    }

    return (
        <>
        <div className="flex gap-2">
            <div className="flex-1">
                <div className="bg-white shadow rounded p-4">
                    <div className="font-bold text-xl mb-4">Requests Review</div>
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
                    placeholder="Review remarks" />
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

export default Review