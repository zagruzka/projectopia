const Request = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Purchase Request</h1>
            <p>Here you can input purchase request.</p>
        </div>
    )
}
export default Request;

export const metadata = {
    title: "Request",
    description: "Request purchase requests",
}

export const dynamic = 'force-dynamic'

export const revalidate = 0

// This is a placeholder for the Request page.
// You can replace this with your actual Request logic and components.

// Note: The metadata and revalidate settings are used for Next.js dynamic routing and caching.
// The `dynamic` export ensures that this page is always rendered on the server, and `revalidate` set to 0 means it will not cache the page.