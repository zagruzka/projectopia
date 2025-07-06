"use client"

import Table, { columnType } from "@/app/components/Table"
import RequestLog from "../request/RequestLog"
import { FaChevronRight } from "react-icons/fa"
import Modal from "@/app/components/Modal"
import RequestDetail from "@/app/components/RequestDetail"
import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'

const Review = () => {

    const [detailModal, setDetailModal] = useState(false)

    const columns: columnType[] = [
        { title: 'Date', data: 'CreatedDate', sortable: true },
        { title: 'Applicant', data: 'Applicant', sortable: true },
        { title: 'Item', data: 'ItemSample', sortable: true },
        { title: 'Detail', style: {width: '0px', textAlign: 'center'}, render: (r) =>
        <button onClick={() => onDetail(r)} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"><FaChevronRight /></button>}
    ]

    const rows = [
        { CreatedDate: '2025-01-01', Applicant: 'Fauzi', ItemSample: 'Honda HRV...' }
    ]

    const onDetail = (data: any) => {
        setDetailModal(true)
    }

    return (
        <>
        <div className="flex gap-2">
            <div className="flex-1">
                <div className="bg-white shadow rounded p-4">
                    <div className="font-bold text-xl mb-4">Request List</div>
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
        <Modal open={detailModal} onClose={() => setDetailModal(false)}>
            <div className="bg-white rounded w-[50rem] p-4">
                <RequestDetail />
                <div className="flex items-end gap-2 mt-4">
                    <TextareaAutosize
                        spellCheck={false}
                        className="input w-full resize-none"
                        placeholder="Review remarks" />
                    <div className="flex gap-1">
                        <button className="button-green w-20">Approve</button>
                        <button className="button-red w-20">Reject</button>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    );
};

export default Review