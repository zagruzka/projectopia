"use client"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import useHasMounted from "./utils/useHasMounted"

const App: React.FC<{children: React.ReactNode}> = ({children}) => {
  const hasMounted = useHasMounted()
  if (!hasMounted) return null

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="overflow-y-auto w-full h-full py-4 bg-slate-200">
          {children}
        </main>
      </div>
    </div>
  )
}

export default App