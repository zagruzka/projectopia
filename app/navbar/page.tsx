'use client'

// App.tsx atau SidebarLayout.tsx
import { useState } from "react";
import {
  Menu,
  Home,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SidebarLayout() {
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <LogOut size={20} />, label: "Logout" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out
        ${expanded ? "w-64" : "w-16"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold">
            {expanded ? "My App" : "🧩"}
          </span>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="space-y-4">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              {item.icon}
              {expanded && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <button onClick={() => setExpanded(!expanded)} className="md:hidden">
              <Menu />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="text-gray-600">User</div>
          </div>
        </header>

        {/* Content area */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <div className="h-[90rem]">
          <p>Konten halaman di sini...</p>
          </div>
        </main>
      </div>
    </div>
  );
}
