import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, Plus, Filter, ChevronDown, 
  ChevronUp, Edit3, Trash2, Bell, CheckCircle, 
  XCircle, AlertCircle, Target, BookOpen, Users,
  Zap, Bookmark, Star, Video, FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SchedulePage = () => {
  const [activeView, setActiveView] = useState("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const navigate = useNavigate(); // Initialize navigate function

  // Sample schedule data
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      title: "TCS Aptitude Test",
      type: "test",
      category: "aptitude",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "10:00 AM",
      duration: "60 min",
      priority: "high",
      completed: false,
      description: "Practice quantitative aptitude and logical reasoning"
    },
    {
      id: 2,
      title: "Data Structures Revision",
      type: "study",
      category: "technical",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: "2:00 PM",
      duration: "90 min",
      priority: "medium",
      completed: false,
      description: "Revise trees and graph algorithms"
    },
    {
      id: 3,
      title: "Mock Interview with Senior",
      type: "interview",
      category: "practice",
      date: new Date(Date.now() + 259200000), // In 3 days
      time: "4:30 PM",
      duration: "45 min",
      priority: "high",
      completed: false,
      description: "Focus on system design questions"
    },
    {
      id: 4,
      title: "Infosys Previous Papers",
      type: "study",
      category: "company",
      date: new Date(Date.now() + 345600000), // In 4 days
      time: "11:00 AM",
      duration: "120 min",
      priority: "medium",
      completed: false,
      description: "Solve last 3 years question papers"
    },
    {
      id: 5,
      title: "Group Discussion Practice",
      type: "activity",
      category: "soft-skills",
      date: new Date(Date.now() + 432000000), // In 5 days
      time: "3:00 PM",
      duration: "60 min",
      priority: "low",
      completed: false,
      description: "Practice with peers on current topics"
    },
    {
      id: 6,
      title: "Resume Review Session",
      type: "review",
      category: "preparation",
      date: new Date(Date.now() + 518400000), // In 6 days
      time: "5:00 PM",
      duration: "30 min",
      priority: "medium",
      completed: false,
      description: "Get feedback from placement coordinator"
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: "",
    type: "study",
    category: "technical",
    date: new Date(),
    time: "10:00 AM",
    duration: "60 min",
    priority: "medium",
    description: ""
  });

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "technical", label: "Technical", icon: <CodeIcon /> },
    { id: "aptitude", label: "Aptitude", icon: <CalculateIcon /> },
    { id: "company", label: "Company Specific", icon: <BuildingIcon /> },
    { id: "practice", label: "Practice", icon: <TargetIcon /> },
    { id: "soft-skills", label: "Soft Skills", icon: <PeopleIcon /> },
    { id: "preparation", label: "Preparation", icon: <ChecklistIcon /> }
  ];

  const types = [
    { id: "study", label: "Study", icon: <BookOpen size={16} /> },
    { id: "test", label: "Test", icon: <FileText size={16} /> },
    { id: "interview", label: "Interview", icon: <Users size={16} /> },
    { id: "activity", label: "Activity", icon: <Zap size={16} /> },
    { id: "review", label: "Review", icon: <Star size={16} /> }
  ];

  const priorities = [
    { id: "low", label: "Low", color: "text-green-600" },
    { id: "medium", label: "Medium", color: "text-amber-600" },
    { id: "high", label: "High", color: "text-red-600" }
  ];

  const views = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" }
  ];

  // Get dates for the current week
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const weekDates = getWeekDates();

  const filteredItems = scheduleItems.filter(item => {
    if (filterCategory !== "all" && item.category !== filterCategory) return false;
    if (!showCompleted && item.completed) return false;
    return true;
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = Math.max(...scheduleItems.map(item => item.id)) + 1;
    setScheduleItems([...scheduleItems, { ...newItem, id: newId }]);
    setNewItem({
      title: "",
      type: "study",
      category: "technical",
      date: new Date(),
      time: "10:00 AM",
      duration: "60 min",
      priority: "medium",
      description: ""
    });
    setShowAddForm(false);
  };

  const toggleCompleted = (id) => {
    setScheduleItems(scheduleItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== id));
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high": return <AlertCircle size={16} className="text-red-500" />;
      case "medium": return <Clock size={16} className="text-amber-500" />;
      case "low": return <CheckCircle size={16} className="text-green-500" />;
      default: return <Bell size={16} />;
    }
  };

  const getTypeIcon = (type) => {
    const typeObj = types.find(t => t.id === type);
    return typeObj ? typeObj.icon : <BookOpen size={16} />;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Study Schedule</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Plan and track your placement preparation
            </p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add New Item
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Schedule</h1>
        </div>

        {/* Filters and Views */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-slate-500" />
                <span className="text-sm font-medium">View:</span>
              </div>
              {views.map(view => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeView === view.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-slate-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    filterCategory === category.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="rounded bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Show Completed</span>
              </label>
            </div>
          </div>
        </div>

        {/* Week View Header */}
        {activeView === "week" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => (
                <div 
                  key={index}
                  className={`text-center p-3 rounded-lg cursor-pointer transition-colors ${
                    isToday(date) 
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-sm font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-lg font-bold">{date.getDate()}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {activeView === "day" 
                    ? "Today's Schedule" 
                    : activeView === "week" 
                    ? "This Week's Schedule" 
                    : "This Month's Schedule"}
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredItems.length} items
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No schedule items found.</p>
                  <p className="text-sm">Add new items to your schedule.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        item.completed 
                          ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" 
                          : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(item.priority)}
                          <button 
                            onClick={() => toggleCompleted(item.id)}
                            className={`p-1 rounded ${
                              item.completed 
                                ? "text-green-600 hover:text-green-700" 
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            }`}
                          >
                            {item.completed ? <CheckCircle size={18} /> : <CheckCircle size={18} />}
                          </button>
                          <button 
                            onClick={() => deleteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{item.time} • {item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TagIcon />
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Deadlines</h2>
              
              <div className="space-y-4">
                {scheduleItems
                  .filter(item => !item.completed)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map(item => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(item.date)} • {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Schedule Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Total Items</span>
                  <span className="font-semibold">{scheduleItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Completed</span>
                  <span className="font-semibold text-green-600">
                    {scheduleItems.filter(item => item.completed).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Pending</span>
                  <span className="font-semibold text-amber-600">
                    {scheduleItems.filter(item => !item.completed).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">High Priority</span>
                  <span className="font-semibold text-red-600">
                    {scheduleItems.filter(item => item.priority === "high").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <Video size={18} />
                  <span>Schedule Mock Interview</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <FileText size={18} />
                  <span>Add Practice Test</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <Bookmark size={18} />
                  <span>Set Study Reminder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-6">Add New Schedule Item</h2>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  >
                    {types.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  >
                    {categories.filter(c => c.id !== "all").map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={newItem.date.toISOString().split('T')[0]}
                    onChange={(e) => setNewItem({...newItem, date: new Date(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={newItem.time}
                    onChange={(e) => setNewItem({...newItem, time: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select
                    value={newItem.duration}
                    onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  >
                    <option value="30 min">30 minutes</option>
                    <option value="60 min">60 minutes</option>
                    <option value="90 min">90 minutes</option>
                    <option value="120 min">120 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={newItem.priority}
                    onChange={(e) => setNewItem({...newItem, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:bg-slate-700"
                  >
                    {priorities.map(priority => (
                      <option key={priority.id} value={priority.id}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Icon components
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const CalculateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="12" y2="14"></line>
    <line x1="16" y1="14" x2="16" y2="18"></line>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <rect x="9" y="6" width="6" height="6"></rect>
    <line x1="9" y1="14" x2="9" y2="20"></line>
    <line x1="15" y1="14" x2="15" y2="20"></line>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const PeopleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export default SchedulePage;