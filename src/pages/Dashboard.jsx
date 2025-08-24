import { useState } from "react";
import { LayoutDashboard, Code2, Building2, FileText, BarChart3, Bell, Moon, Sun, Settings, LogOut, User } from "lucide-react";



export default function DarkDashboard() {
  const [dark, setDark] = useState(true);
  const [openUser, setOpenUser] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { icon: <Code2 size={18} />, label: "Coding" },
    { icon: <Building2 size={18} />, label: "Companies" },
    { icon: <FileText size={18} />, label: "Quizzes" },
    { icon: <BarChart3 size={18} />, label: "Reports" },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 ring-1 ring-white/10 grid place-content-center font-bold">
                PP
              </div>
              <div className="leading-tight">
                <p className="font-semibold">Placement Portal</p>
                <p className="text-xs text-slate-400">Student Dashboard</p>
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

        {/* Shell */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
            <nav className="space-y-1">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <span className="opacity-90">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">Quick Filters</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <button className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-800">DSA</button>
                <button className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-800">Aptitude</button>
                <button className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-800">TCS</button>
                <button className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-800">Infosys</button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="space-y-6">
            {/* Greeting */}
            <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
              <h1 className="text-xl font-semibold">Welcome back, Kunj 👋</h1>
              <p className="mt-1 text-sm text-slate-400">Here’s your placement prep snapshot.</p>

              {/* KPIs */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KPI title="Coding Problems" value="248" sub="+12 this week" />
                <KPI title="Quizzes Attempted" value="18" sub="Avg 76%" />
                <KPI title="Upcoming Quizzes" value="02" sub="Next: 25 Aug" />
                <KPI title="Companies Followed" value="07" sub="3 hiring now" />
              </div>
            </section>

            {/* Two columns: Activity + Charts */}
            <section className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-4">
                <Card title="Recent Activity">
                  <ActivityItem icon={<Code2 size={16} />} title="Solved 3 Medium DSA questions" meta="Today • 14:20" />
                  <ActivityItem icon={<FileText size={16} />} title="Quiz: DBMS Basics submitted" meta="Yesterday • Score 82%" />
                  <ActivityItem icon={<Building2 size={16} />} title="Viewed company-wise questions (Wipro)" meta="22 Aug • 18:05" />
                </Card>

                <Card title="Company-wise Questions">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { name: "TCS", count: 64 },
                      { name: "Infosys", count: 52 },
                      { name: "Wipro", count: 33 },
                      { name: "Accenture", count: 41 },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                        <span>{c.name}</span>
                        <span className="text-sm text-slate-400">{c.count} Qs</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Chart Placeholder */}
              <Card title="Performance (Last 6 Quizzes)">
                <div className="h-48 rounded-xl border border-slate-800 bg-slate-900/60 grid place-content-center text-slate-400 text-sm">
                  {/* Replace with Recharts later */}
                  <span>Chart placeholder</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-400">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2">
                    <p className="text-slate-300">Best</p>
                    <p className="text-lg font-semibold">92%</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2">
                    <p className="text-slate-300">Average</p>
                    <p className="text-lg font-semibold">76%</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2">
                    <p className="text-slate-300">Streak</p>
                    <p className="text-lg font-semibold">4 days</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Quick actions */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ActionCard icon={<Code2 size={18} />} title="Practice Coding" desc="Filter by difficulty & topic" btn="Browse" />
              <ActionCard icon={<FileText size={18} />} title="Take a Quiz" desc="Timed with instant scorecard" btn="Start" />
              <ActionCard icon={<Building2 size={18} />} title="Explore Companies" desc="Interview experiences & Qs" btn="Explore" />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ActivityItem({ icon, title, meta }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
      <div className="mt-0.5 text-slate-300">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-slate-500">{meta}</p>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, btn }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-200">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-slate-400">{desc}</p>
      <div className="mt-3">
        <button className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm hover:bg-slate-800">{btn}</button>
      </div>
    </div>
  );
}
