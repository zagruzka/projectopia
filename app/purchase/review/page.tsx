const Review = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Purchase Review</h1>
            <p>Here you can manage purchase review.</p>
        </div>
    );
};

export default Review;
export const metadata = {
    title: "Review",
    description: "Review purchase requests",
};

export const dynamic = 'force-dynamic';

export const revalidate = 0;