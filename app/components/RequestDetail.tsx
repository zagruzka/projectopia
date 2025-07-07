import { priorityColor } from "../utils/colors"
import Table from "./Table"

type ReqDetailType = {
    data: {
        Priority: string,
        List: any[],
        Remarks: string,
        Timeline: any[]
    }
}

const RequestDetail: React.FC<ReqDetailType> = ({ data }) => {

    const columns = [
        { title: 'Item Name', data: 'ItemName' },
        { title: 'Qty', data: 'Qty' },
        { title: 'Unit', data: 'Unit' },
        { title: 'Description', data: 'Description' },
    ]

    if (!data) return

    return (
        <>
            <div className="flex gap-20 mb-5">
                <div>
                    <div className="text-xs">Request By</div>
                    <div>{data.Timeline[0].CreatedBy}</div>
                </div>
                <div>
                    <div className="text-xs">Dept</div>
                    <div>MIS</div>
                </div>
                <div>
                    <div className="text-xs">Request Date</div>
                    <div>{data.Timeline[0].CreatedDate}</div>
                </div>
                <div>
                    <div className="text-xs">Priority</div>
                    <div className={"rounded w-20 text-center "+priorityColor(data.Priority)}>{data.Priority}</div>
                </div>
            </div>
            <Table showPage={false}
                columns={columns}
                rows={data.List}
            />
            <div className="bg-yellow-100 w-full p-4 mt-4 rounded">
                <div className="font-bold">Note:</div>
                {data.Remarks}
            </div>
            <div className="bg-blue-100 p-4 mt-4 rounded">
                <div className="font-bold">Timeline</div>
                <div className="flex w-full mt-5">
                {
                ['Request', 'Review', 'Approval'].map((i, key) => {
                    const found = data.Timeline.find(r => r.Status === i)
                    return (
                    <div key={key} className="flex flex-col items-center gap-1">
                        <div className="font-bold">{i}</div>
                        <div className="flex items-center">
                            <div className={"w-20 h-0.5 " + (key !== 0 ? 'bg-black' : '')}></div>
                            <div className={
                                "flex flex-col items-center justify-center gap-5 size-5 border rounded-full " +
                                (found ? found.Approved ? "bg-green-500" : "bg-red-500" : "bg-slate-400")
                            }></div>
                            <div className={"w-20 h-0.5 " + (key !== 2 ? 'bg-black' : '')}></div>
                        </div>
                        <div className="text-center text-sm">
                            <div>By: {found ? found.CreatedBy : '...'}</div>
                            <div>On: {found ? found.CreatedDate : '...'}</div>
                        </div>
                    </div>
                    )
                })
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