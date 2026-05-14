import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { getPersonaById } from '../../data/personas';
import { MapPin, Navigation2, AlertTriangle, ChevronRight, X, FileText, Clock, ChevronLeft, Map, Camera, Eye, Bell, CheckCircle, User, Calendar } from 'lucide-react';

type TabType = 'home' | 'urgent' | 'sections';

export default function HomePage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const persona = personaId ? getPersonaById(personaId) : undefined;
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (activeTab === 'urgent' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTab, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const carouselItems = [
    { type: 'route', label: 'Route Map', icon: Map },
    { type: 'defect', label: 'Defect Image', icon: Camera },
    { type: 'street', label: 'Street View', icon: Eye },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleAcceptRepair = () => {
    // Mock acceptance functionality
    alert('Repair accepted! You will be navigated to the defect location.');
  };

  const handleCancelRepair = () => {
    // Mock cancel functionality
    if (confirm('Are you sure you want to cancel this repair request?')) {
      alert('Repair request cancelled.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
        <p className="text-sm text-gray-600 mt-1">Your repair requests and to-do items</p>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <TabButton
            onClick={() => setActiveTab('home')}
            active={activeTab === 'home'}
          >
            Home
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('urgent')}
            active={activeTab === 'urgent'}
          >
            Urgent Repairs
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('sections')}
            active={activeTab === 'sections'}
          >
            Road Sections
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="h-[calc(100vh-140px)] overflow-y-auto">
        {activeTab === 'home' ? (
          // Dashboard View
          <div className="p-4 space-y-4">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#4b5563] to-[#374151] rounded-lg p-6 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome, {persona?.name.split(' ')[0]}!</h2>
              <p className="text-gray-200 text-sm">Here's your overview for today</p>
            </div>

            {/* Urgent Tasks Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Urgent Tasks</h3>
              
              {/* Urgent Repair Notification */}
              <div 
                onClick={() => setActiveTab('urgent')}
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-red-900">New Urgent Repair Request</h4>
                      <span className="text-xs text-red-700 font-semibold">{formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-sm text-red-800 mb-2">Pothole repair - 2.3 miles away</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-900">£450.00</span>
                      <ChevronRight className="w-5 h-5 text-red-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduled Work Today */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-yellow-900 mb-1">Work Scheduled Today</h4>
                    <p className="text-sm text-yellow-800 mb-2">A14 Surface Treatment - Starting at 9:00 AM</p>
                    <button className="text-yellow-700 hover:text-yellow-900 font-semibold text-sm flex items-center gap-1">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* To-Do List Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">To-Do List</h3>
              
              {/* Update Profile */}
              <div 
                onClick={() => navigate(`/persona/${personaId}/profile`)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Update Your Profile</h4>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Complete your availability and qualifications</p>
                  </div>
                </div>
              </div>

              {/* Review Pending Bids */}
              <div 
                onClick={() => navigate(`/persona/${personaId}/bids`)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Review Pending Bids</h4>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2 new road section jobs available</p>
                  </div>
                </div>
              </div>

              {/* Update Availability */}
              <div 
                onClick={() => navigate(`/persona/${personaId}/availability`)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Update Your Availability</h4>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Set your schedule for next week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Quick Stats</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 mb-1">Jobs This Month</p>
                  <p className="text-3xl font-bold text-blue-900">12</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-700 mb-1">Total Earned</p>
                  <p className="text-3xl font-bold text-green-900">£8.4k</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'urgent' ? (
          // Urgent Repairs View
          <div className="relative h-full">
            {/* Image Carousel */}
            <div className="relative bg-gray-800 h-96">
              {/* Carousel Content */}
              <div className="relative h-full">
                {carouselItems.map((item, index) => (
                  <div
                    key={item.type}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* Different views based on carousel item */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      {item.type === 'route' ? (
                        // Route Map View
                        <div className="relative w-full h-full">
                          {/* User Location (bottom left) */}
                          <div className="absolute bottom-20 left-12">
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center mb-2 border-4 border-white">
                                <Navigation2 className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-white text-xs font-medium bg-gray-900 px-2 py-1 rounded">You</span>
                            </div>
                          </div>

                          {/* Defect Location (top right) */}
                          <div className="absolute top-16 right-12">
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 bg-red-500 rounded-full shadow-lg flex items-center justify-center mb-2 border-4 border-white animate-pulse">
                                <AlertTriangle className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-white text-xs font-medium bg-gray-900 px-2 py-1 rounded">Defect</span>
                            </div>
                          </div>

                          {/* Connecting Line/Route */}
                          <svg 
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 0 }}
                          >
                            <defs>
                              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                              </linearGradient>
                            </defs>
                            <line
                              x1="20%"
                              y1="75%"
                              x2="80%"
                              y2="25%"
                              stroke="url(#routeGradient)"
                              strokeWidth="4"
                              strokeDasharray="8,4"
                              strokeLinecap="round"
                            />
                          </svg>

                          {/* Distance indicator */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                            2.3 miles
                          </div>
                        </div>
                      ) : (
                        // Placeholder for other views
                        <div className="text-center px-4">
                          <item.icon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                          <div className="text-lg text-gray-300 font-medium mb-2">
                            {item.label}
                          </div>
                          <div className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full inline-block">
                            Coming Soon
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Arrow - Top Left */}
              <div className="absolute top-4 left-4 z-20">
                <button
                  onClick={() => setActiveTab('home')}
                  className="w-10 h-10 bg-[#4b5563] rounded-full flex items-center justify-center shadow-lg hover:bg-[#374151] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Carousel Navigation - White arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Task Summary Card */}
            <div className="bg-white rounded-t-3xl -mt-6 relative z-10 shadow-2xl">
              <div className="px-6 pt-6 pb-6">
                {/* Cost */}
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-gray-900">£450.00</h2>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Distance</span>
                    <span className="text-gray-900 font-semibold">2.3 miles</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Type</span>
                    <span className="text-gray-900 font-semibold">Pothole</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Severity</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      High
                    </span>
                  </div>
                </div>

                {/* More Details Link */}
                <button className="text-[#0082ca] font-semibold text-sm mb-6 hover:underline flex items-center gap-1">
                  more...
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Accept Button with Timer */}
                  <button
                    onClick={handleAcceptRepair}
                    className="bg-[#0082ca] text-white rounded-lg py-4 px-4 font-bold hover:bg-[#006ba6] transition-all shadow-lg flex flex-col items-center justify-center"
                  >
                    <span className="text-lg">Accept</span>
                    <span className="text-xs mt-1 opacity-90">{formatTime(timeLeft)}</span>
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={handleCancelRepair}
                    className="bg-[#C8102E] text-white rounded-lg py-4 px-4 text-lg font-bold hover:bg-[#a00d25] transition-all shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Road Section Repairs View
          <div className="p-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Contractor Jobs</h3>
                  <p className="text-sm text-blue-800">
                    These repairs are assigned through your contractor and follow the standard bidding process.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Repairs List */}
            <div className="space-y-3">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">M1 J15A-N Section Maintenance</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Via Highways Express Ltd.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-sm text-gray-700 mb-3">Multiple pothole repairs along 2.5km section</p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Bidding Open
                  </span>
                  <span className="text-sm font-bold text-gray-900">£8,500</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">A14 Surface Treatment</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Via Highways Express Ltd.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-sm text-gray-700 mb-3">Surface cracking repair and resurfacing work</p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Assigned to You
                  </span>
                  <span className="text-sm font-bold text-gray-900">£4,200</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">M25 Junction 12 Repairs</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Via Highways Express Ltd.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-sm text-gray-700 mb-3">Edge defect repairs and drainage work</p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Bidding Open
                  </span>
                  <span className="text-sm font-bold text-gray-900">£12,300</span>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <button
              onClick={() => navigate(`/persona/${personaId}/bids`)}
              className="w-full bg-[#4b5563] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#374151] transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              View All Bids
            </button>
          </div>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}