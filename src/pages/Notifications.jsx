import React, { useState } from "react";
import { 
  Bell, CheckCircle, Clock, AlertCircle, 
  Calendar, Mail, FileText, Users, 
  ChevronDown, ChevronUp, Filter, Check,
  X, Trash2
} from "lucide-react";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, notificationId: null });

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New coding challenge available",
      message: "A new coding challenge from Amazon has been posted. Practice now to improve your skills.",
      time: "10 minutes ago",
      read: false,
      type: "coding",
      icon: <FileText size={18} className="text-blue-500" />,
      priority: "high"
    },
    {
      id: 2,
      title: "Mock interview scheduled",
      message: "Your mock interview with Senior Developer John Smith has been scheduled for tomorrow at 3:00 PM.",
      time: "1 hour ago",
      read: false,
      type: "interview",
      icon: <Users size={18} className="text-green-500" />,
      priority: "high"
    },
    {
      id: 3,
      title: "Quiz results available",
      message: "Your results for the Aptitude Test #3 are now available. You scored 82% - well above average!",
      time: "2 hours ago",
      read: true,
      type: "quiz",
      icon: <CheckCircle size={18} className="text-purple-500" />,
      priority: "medium"
    },
    {
      id: 4,
      title: "New company added",
      message: "Microsoft has been added to the companies list. Check out their specific interview questions and requirements.",
      time: "5 hours ago",
      read: true,
      type: "company",
      icon: <Bell size={18} className="text-orange-500" />,
      priority: "medium"
    },
    {
      id: 5,
      title: "Weekly preparation report",
      message: "Your weekly preparation report is ready. You've solved 24 problems this week, a 15% increase from last week.",
      time: "1 day ago",
      read: true,
      type: "report",
      icon: <FileText size={18} className="text-indigo-500" />,
      priority: "low"
    },
    {
      id: 6,
      title: "Deadline approaching",
      message: "The application deadline for Google's Software Engineer position is in 3 days. Make sure to submit your application.",
      time: "2 days ago",
      read: true,
      type: "reminder",
      icon: <AlertCircle size={18} className="text-red-500" />,
      priority: "high"
    },
    {
      id: 7,
      title: "New study material available",
      message: "New study material for Database Management Systems has been added to the resources section.",
      time: "3 days ago",
      read: true,
      type: "resource",
      icon: <FileText size={18} className="text-teal-500" />,
      priority: "medium"
    },
    {
      id: 8,
      title: "System maintenance notice",
      message: "The portal will be down for maintenance on Sunday from 2:00 AM to 4:00 AM. Please plan your practice sessions accordingly.",
      time: "4 days ago",
      read: true,
      type: "system",
      icon: <X size={18} className="text-gray-500" />,
      priority: "low"
    }
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "coding", label: "Coding" },
    { id: "interview", label: "Interviews" },
    { id: "quiz", label: "Quizzes" },
    { id: "company", label: "Companies" }
  ];

  const markAsRead = (id) => {
    // In a real app, this would update the notification status in the backend
    console.log(`Marked notification ${id} as read`);
  };

  const deleteNotifications = (id) => {
    // In a real app, this would delete the selected notifications
    console.log("Deleted notification:", id);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    return notification.type === activeFilter;
  });

  const recentNotifications = filteredNotifications.filter(notif => {
    return notif.time.includes("minute") || notif.time.includes("hour") || notif.time.includes("today");
  });

  const olderNotifications = filteredNotifications.filter(notif => {
    return !(notif.time.includes("minute") || notif.time.includes("hour") || notif.time.includes("today"));
  });

  const handleDelete = (id) => {
    console.log(`Notification ${id} deleted`);
  };

  const handleRightClick = (event, id) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, notificationId: id });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, notificationId: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100" onClick={handleCloseContextMenu}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Stay updated with your placement preparation activities
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-slate-500" />
            <span className="font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          {/* Recent Notifications */}
          {recentNotifications.length > 0 && (
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/30">
                <h2 className="font-semibold text-slate-700 dark:text-slate-300">Recent</h2>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 transition-colors ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'}`}
                    onContextMenu={(event) => handleRightClick(event, notification.id)}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          {notification.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Older Notifications */}
          {olderNotifications.length > 0 && (
            <div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700/30">
                <h2 className="font-semibold text-slate-700 dark:text-slate-300">Older</h2>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {olderNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 transition-colors`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          {notification.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Bell size={32} className="text-slate-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No notifications</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {activeFilter === "all" 
                  ? "You're all caught up! No notifications at this time." 
                  : `No ${activeFilter} notifications at this time.`}
              </p>
            </div>
          )}
        </div>

        {/* Notification Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Bell size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Notifications</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Clock size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Unread Notifications</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.read).length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Read Notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-300 shadow-md rounded-md p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(contextMenu.notificationId)}
          >
            Delete Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;