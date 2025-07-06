"use client"

import Table, { columnType } from "@/app/components/Table"
import RequestLog from "../request/RequestLog"
import { FaChevronRight } from "react-icons/fa"

const columns: columnType[] = [
    { title: 'Date', data: 'CreatedDate', sortable: true },
    { title: 'Applicant', data: 'Applicant', sortable: true },
    { title: 'Item', data: 'ItemSample', sortable: true },
    { title: 'Detail', style: {width: '0px', textAlign: 'center'}, render: (r) =>
    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"><FaChevronRight /></button>}
]

const rows = [
    { CreatedDate: '2025-01-01', Applicant: 'Fauzi', ItemSample: 'Honda HRV...' }
]

const Approval = () => {
    return (
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
    );
};

export default Approval