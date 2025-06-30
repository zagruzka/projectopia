const Approval = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Purchase Approval</h1>
            <p>Here you can manage purchase approvals.</p>
        </div>
    );
};

export default Approval;

export const metadata = {
    title: "Purchase Approval",
    description: "Manage purchase approvals",
};

export const dynamic = 'force-dynamic';

export const revalidate = 0;