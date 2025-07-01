import Table from "@/app/components/Table"

const Request = () => {
    return (
        <div className="p-2">
            <h1 className="mb-2">Purchase Request</h1>
            <div className="flex-1 bg-white shadow rounded p-6">
                <Table
                    columns={[
                        { title: 'ID', data: 'id', sortable: true },
                        { title: 'Title', data: 'title', sortable: true },
                        { title: 'Description', data: 'description' },
                        { title: 'Status', data: 'status', sortable: true },
                        { title: 'Created At', data: 'createdAt', sortable: true }
                    ]}
                    rows={[]}
                    loading={false}
                />
            </div>
        </div>
    )
}
export default Request