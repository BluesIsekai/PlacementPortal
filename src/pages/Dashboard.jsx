
import { useState } from "react";
import { LayoutDashboard, Code2, Building2, FileText, BarChart3, Bell, Moon, Sun, Settings, LogOut, User } from "lucide-react";



export default function DarkDashboard() {
  const [dark, setDark] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { icon: <Code2 size={18} />, label: "Coding" },
    { icon: <Building2 size={18} />, label: "Companies" },
    { icon: <FileText size={18} />, label: "Quizzes" },
    { icon: <BarChart3 size={18} />, label: "Reports" },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex">
        {/* Sidebar (slide in/out) */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-full w-64 transform border-r border-slate-800 bg-slate-900 transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-5 border-b border-slate-800 text-lg font-bold">
            Placement Portal
          </div>
          <nav className="space-y-1 p-3">
            {navItems.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
              {/* Left: Menu + Logo */}
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-slate-800"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  {openMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 ring-1 ring-white/10 grid place-content-center font-bold">
                    PP
                  </div>
                  <div className="leading-tight">
                    <p className="font-semibold">Placement Portal</p>
                    <p className="text-xs text-slate-400">Student Dashboard</p>
                  </div>
                </div>
              </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm hover:bg-slate-800"
                aria-label="Toggle theme"
                onClick={() => setDark((d) => !d)}
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
                <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
              </button>

              <button className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 hover:bg-slate-800" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-indigo-600 text-[10px] grid place-content-center">3</span>
              </button>

              <div className="relative">
           <button
  onClick={() => setOpenUser((o) => !o)}
  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2 py-1.5 hover:bg-slate-800"
>
  <span className="text-lg">👤</span>
  <span className="text-sm">Profile</span>
</button>
                
     
               

                {openUser && (
                  <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800">
                      <User size={16} /> Profile
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="h-px bg-slate-800" />
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-300 hover:bg-slate-800">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <h1 className="text-xl font-semibold">Welcome back 👋</h1>
            <p className="text-sm text-slate-400">
              Here’s your placement prep snapshot.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
