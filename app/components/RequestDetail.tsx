import Table from "./Table"

const RequestDetail = () => {
    return (
        <>
            <div className="flex gap-20 mb-5">
                <div>
                    <div className="text-xs">Applicant</div>
                    <div>Fauzi Ahmad</div>
                </div>
                <div>
                    <div className="text-xs">Dept</div>
                    <div>MIS</div>
                </div>
                <div>
                    <div className="text-xs">Request Date</div>
                    <div>2025-01-01</div>
                </div>
                <div>
                    <div className="text-xs">Priority</div>
                    <div className="bg-red-200 rounded-full px-2">High</div>
                </div>
            </div>
            <Table paginator={false}
                columns={[
                    { title: 'Item Name', data: 'ItemName' },
                    { title: 'Qty', data: 'Qty' },
                    { title: 'Description', data: 'Description' },
                ]}
                rows={[
                    { ItemName: 'Honda HRV', Qty: 1, Desc: 'Buat nganter sembako' },
                    { ItemName: 'Beras', Qty: 1, Desc: 'Buat makan' },
                ]}
            />
            <div className="bg-yellow-100 w-full p-4 mt-4 rounded">
                <div className="font-bold">Note:</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui delectus totam veritatis corporis quia saepe, earum incidunt cupiditate explicabo esse.
            </div>
            <div className="bg-blue-100 p-4 mt-4 rounded">
                <div className="font-bold">Timeline</div>
                <div className="flex w-full mt-5">
                {
                ['Request', 'Review', 'Approval'].map((i, key) => (
                    <div key={key} className="flex flex-col items-center gap-1">
                        <div>{i}</div>
                        <div className="flex items-center">
                            <div className={"w-20 h-0.5 "+(key !== 0 && 'bg-black')}></div>
                            <div className="flex flex-col items-center justify-center gap-5 size-5 bg-green-500 border rounded-full"></div>
                            <div className={"w-20 h-0.5 "+(key !== 2 && 'bg-black')}></div>
                        </div>
                        <div className="text-center text-sm">
                            <div>By: Fauzi</div>
                            <div>On: 2025-01-01</div>
                        </div>
                    </div>
                ))
                }
                    <div className="p-4 rounded border">
                        <div className="flex gap-2">
                            <div className="size-5 bg-slate-400 border rounded-full"></div>
                            <span>Waiting</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="size-5 bg-green-500 border rounded-full"></div>
                            <span>Approved</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="size-5 bg-red-500 border rounded-full"></div>
                            <span>Rejected</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestDetail