import React, { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Code2, Building2, FileText, BarChart3, Bell, Moon, Sun, Settings, LogOut, User, Calendar, Mail, X, Menu, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Imported the Footer component

const PlacementPortalDashboard = () => {
  const [dark, setDark] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Code2 size={18} />, label: "Coding", path: "/coding" },
    { icon: <Building2 size={18} />, label: "Companies", path: "/companies" },
    { icon: <FileText size={18} />, label: "Quizzes", path: "/quizzes" }, // Updated Quizzes path
    { icon: <BarChart3 size={18} />, label: "Reports", path: "/reports" },
    { icon: <Calendar size={18} />, label: "Schedule", path: "/schedule" },
    { icon: <Mail size={18} />, label: "Applications", path: "/applications" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
            {/* Brand and Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-3">
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

              <button
                className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 hover:bg-slate-800"
                aria-label="Notifications"
                onClick={() => navigate("/notifications")} // Navigate to Notifications page on click
              >
                <Bell size={18} />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-indigo-600 text-[10px] grid place-content-center">3</span>
              </button>

              <div
                className="relative"
                ref={profileRef}
                onMouseEnter={() => setOpenUser(true)}
              >
                <button
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2 py-1.5 hover:bg-slate-800"
                >
                  <span className="text-lg">👤</span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>

                {openUser && (
                  <div
                    className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl"
                  >
                    <Link
                      to="/profile"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800"
                    >
                      <User size={16} /> Profile
                    </Link>
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr] gap-6 px-4 py-6 flex-grow">
          {/* Sidebar for desktop */}
          <aside className="hidden md:block h-fit rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
            <DesktopSidebar navItems={navItems} />
          </aside>

          {/* Mobile sidebar overlay */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black/70 md:hidden" onClick={() => setMobileSidebarOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-64 bg-slate-900 p-4" onClick={e => e.stopPropagation()}>
                <button className="absolute right-4 top-4" onClick={() => setMobileSidebarOpen(false)}>
                  <X size={24} />
                </button>
                <DesktopSidebar navItems={navItems} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="space-y-6">
            {/* Greeting */}
            <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
              <h1 className="text-xl font-semibold">Welcome back, Kunj 👋</h1>
              <p className="mt-1 text-sm text-slate-400">Here's your placement prep snapshot.</p>

              {/* KPIs - Responsive grid */}
              <div className="mt-4 grid gap-4 grid-cols-2 lg:grid-cols-4">
                <KPI title="Coding Problems" value="248" sub="+12 this week" />
                <KPI title="Quizzes Attempted" value="18" sub="Avg 76%" />
                <KPI title="Upcoming Drives" value="02" sub="Next: 25 Aug" />
                <KPI title="Companies Applied" value="07" sub="3 responses" />
              </div>
            </section>

            {/* Application Status */}
            <ApplicationStatus />

            {/* Two columns: Activity + Charts */}
            <section className="grid gap-6 lg:grid-cols-3">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-4">
                <Card title="Recent Activity">
                  <ActivityItem icon={<Code2 size={16} />} title="Solved 3 Medium DSA questions" meta="Today • 14:20" />
                  <ActivityItem icon={<FileText size={16} />} title="Quiz: DBMS Basics submitted" meta="Yesterday • Score 82%" />
                  <ActivityItem icon={<Building2 size={16} />} title="Applied for Microsoft SWE role" meta="22 Aug • 18:05" />
                  <ActivityItem icon={<Mail size={16} />} title="Received response from Amazon" meta="21 Aug • 09:30" />
                </Card>

                <Card title="Company-wise Questions">
                  <div className="grid gap-3 grid-cols-2">
                    {[
                      { name: "TCS", count: 64 },
                      { name: "Infosys", count: 52 },
                      { name: "Wipro", count: 33 },
                      { name: "Accenture", count: 41 },
                      { name: "Microsoft", count: 78 },
                      { name: "Amazon", count: 65 },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                        <span>{c.name}</span>
                        <span className="text-sm text-slate-400">{c.count} Qs</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Upcoming Drives */}
                <Card title="Upcoming Drives">
                  <div className="space-y-3">
                    <DriveItem company="Microsoft" date="Aug 28" time="10:00 AM" type="Coding Test" />
                    <DriveItem company="Amazon" date="Sep 2" time="11:30 AM" type="Virtual Interview" />
                  </div>
                  <button className="mt-4 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800 flex items-center justify-center gap-2">
                    <Calendar size={16} /> View Full Schedule
                  </button>
                </Card>

                {/* Skill Progress */}
                <Card title="Skill Progress">
                  <div className="space-y-4">
                    <SkillProgressItem skill="Data Structures" progress={75} />
                    <SkillProgressItem skill="Algorithms" progress={65} />
                    <SkillProgressItem skill="DBMS" progress={80} />
                    <SkillProgressItem skill="Communication" progress={60} />
                  </div>
                </Card>
              </div>
            </section>

            {/* Interview Prep Resources */}
            <InterviewResources />

            {/* Quick actions */}
            <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ActionCard icon={<Code2 size={18} />} title="Practice Coding" desc="Filter by difficulty & topic" btn="Browse" />
              <ActionCard icon={<FileText size={18} />} title="Take a Quiz" desc="Timed with instant scorecard" btn="Start" />
              <ActionCard icon={<Building2 size={18} />} title="Explore Companies" desc="Interview experiences & Qs" btn="Explore" />
            </section>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

// Extracted Sidebar Component
const DesktopSidebar = ({ navItems }) => {
  return (
    <>
      <nav className="space-y-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path} // Added dynamic path navigation
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <span className="opacity-90"><Settings size={18} /></span>
          Settings
        </Link>
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
    </>
  );
};

// New Interview Resources Component
const InterviewResources = () => {
  const resources = [
    { title: "Resume Builder", desc: "Create an ATS-friendly resume", icon: <FileText size={20} /> },
    { title: "Mock Interviews", desc: "Practice with AI or peers", icon: <User size={20} /> },
    { title: "Interview Questions", desc: "Company-specific questions", icon: <FileText size={20} /> },
    { title: "Placement Papers", desc: "Previous year questions", icon: <BarChart3 size={20} /> },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <h3 className="font-semibold text-slate-100 mb-4">Interview Preparation Resources</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource, index) => (
          <div key={index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800/40 transition-colors cursor-pointer">
            <div className="text-indigo-400 mb-2">{resource.icon}</div>
            <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
            <p className="text-xs text-slate-400">{resource.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Application Status Component
const ApplicationStatus = () => {
  const statuses = [
    { status: "Applied", count: 12, color: "bg-blue-500", icon: <Mail size={14} /> },
    { status: "Under Review", count: 8, color: "bg-yellow-500", icon: <Settings size={14} /> },
    { status: "Interview", count: 4, color: "bg-purple-500", icon: <Calendar size={14} /> },
    { status: "Rejected", count: 2, color: "bg-red-500", icon: <X size={14} /> },
    { status: "Offered", count: 1, color: "bg-green-500", icon: <User size={14} /> },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <h3 className="font-semibold text-slate-100 mb-4">Application Status</h3>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {statuses.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className={`p-2 rounded-full ${item.color} bg-opacity-20 text-${item.color.split('-')[1]}-400`}>
                {item.icon}
              </div>
            </div>
            <p className="text-lg font-semibold mt-1">{item.count}</p>
            <p className="text-xs text-slate-500">{item.status}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
        <span>Total Applications: 27</span>
        <span>Success Rate: 12%</span>
      </div>
    </section>
  );
};

// Drive Item Component
const DriveItem = ({ company, date, time, type }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/60">
      <div>
        <p className="font-medium">{company}</p>
        <p className="text-xs text-slate-400">{type}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
};

// Skill Progress Component
const SkillProgressItem = ({ skill, progress }) => {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{skill}</span>
        <span className="text-slate-400">{progress}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full">
        <div 
          className="h-2 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// KPI Component
const KPI = ({ title, value, sub }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
};

// Card Component
const Card = ({ title, children }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ icon, title, meta }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
      <div className="mt-0.5 text-slate-300">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-slate-500">{meta}</p>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ icon, title, desc, btn }) => {
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
};

export default PlacementPortalDashboard;