import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { Search, Mic, MapPin, User, Calendar, HelpCircle, Users, FolderOpen, Plus } from 'lucide-react';

const filterOptions = ['Priority', 'Location', 'Status', 'Types', 'Arrival Date'];

// Team members with color coding
const teamMembers = {
  stephen: { name: 'Stephen', initials: 'SH', role: 'analyst', color: 'bg-purple-500' },
  alina: { name: 'Alina', initials: 'AL', role: 'mid-level', color: 'bg-teal-500' },
  ralphie: { name: 'Ralphie', initials: 'RA', role: 'trainee', color: 'bg-coral-500' },
  samira: { name: 'Samira', initials: 'SM', role: 'manager', color: 'bg-indigo-500' },
};

// Mock data for individual defects
const individualDefects = [
  {
    id: 'DEF-1247',
    type: 'Pothole',
    location: 'M1',
    section: 'J15A-N',
    position: 'Junction 15A northbound',
    priority: 'urgent',
    daysToFix: 3,
    confidence: 94,
    reportedDate: '2d ago',
    size: '45cm',
    assignee: 'stephen',
  },
  {
    id: 'DEF-1251',
    type: 'Surface Cracking',
    location: 'A14',
    section: 'CS-E',
    position: 'Near Cambridge Services',
    priority: 'medium',
    daysToFix: 12,
    confidence: 62, // Low confidence
    reportedDate: '5d ago',
    size: '2.5m',
    assignee: 'alina',
  },
  {
    id: 'DEF-1255',
    type: 'Edge Defect',
    location: 'B1040',
    section: 'M23',
    position: 'Mile marker 23',
    priority: 'low',
    daysToFix: 18,
    confidence: 91,
    reportedDate: '1d ago',
    size: '30cm',
    assignee: 'ralphie',
  },
  {
    id: 'DEF-1243',
    type: 'Pothole',
    location: 'M6',
    section: 'J8-S',
    position: 'Junction 8 southbound',
    priority: 'critical',
    daysToFix: -2,
    confidence: 58, // Low confidence
    reportedDate: '8d ago',
    size: '52cm',
    assignee: 'stephen',
  },
];

// Mock data for grouped defects
const groupedDefects = [
  {
    id: 'GROUP-089',
    count: 4,
    type: 'Possible Duplicates',
    primaryDefect: 'DEF-1248',
    location: 'A45',
    section: 'CR-50',
    position: 'Coventry Road, same 50m section',
    priority: 'urgent',
    reportedDate: '3-4d ago',
    description: 'Multiple reports of pothole damage',
    assignee: 'alina',
    confidence: 88,
  },
  {
    id: 'GROUP-091',
    count: 3,
    type: 'Same Case',
    primaryDefect: 'DEF-1252',
    location: 'M25',
    section: 'J12-13',
    position: 'Junction 12-13 carriageway deterioration',
    priority: 'medium',
    reportedDate: '6d ago',
    description: 'Related surface defects - same weather event',
    assignee: 'samira',
    confidence: 71, // Low confidence
  },
  {
    id: 'GROUP-094',
    count: 5,
    type: 'Possible Duplicates',
    primaryDefect: 'DEF-1260',
    location: 'A1(M)',
    section: 'PS-N',
    position: 'Near Peterborough services',
    priority: 'low',
    reportedDate: '2d ago',
    description: 'Multiple edge defect reports',
    assignee: 'ralphie',
    confidence: 95,
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'border-l-[#C8102E]';
    case 'urgent': return 'border-l-[#FF6B00]';
    case 'medium': return 'border-l-[#FFB800]';
    case 'low': return 'border-l-gray-400';
    default: return 'border-l-gray-300';
  }
};

const getDaysToFixColor = (days: number) => {
  if (days < 0) return 'text-[#C8102E]';
  if (days <= 7) return 'text-[#FFB800]';
  return 'text-gray-700';
};

export default function DefectsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Priority');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Individual Defects</h1>
        <p className="text-sm text-gray-600 mt-1">Working on individual defects</p>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="bg-white rounded-lg border-2 border-gray-300 flex items-center px-4 py-3 shadow-sm">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search or ask a question"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-900 placeholder-gray-500"
            />
            <Mic className="w-5 h-5 text-gray-500 ml-3" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-1.5 rounded-full border-2 border-[#4b5563] font-bold text-lg capitalize whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-[#4b5563] text-[#e6edf2]'
                    : 'bg-white text-[#4b5563]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Individual Issues */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Individual Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {individualDefects.map((defect) => {
              const assignee = teamMembers[defect.assignee as keyof typeof teamMembers];
              const isLowConfidence = defect.confidence < 75;
              
              return (
                <div
                  key={defect.id}
                  className={`bg-white rounded-lg border-l-4 ${getPriorityColor(defect.priority)} border border-gray-300 p-4 shadow-sm`}
                >
                  {/* Header Row - Image Placeholder + Basic Info */}
                  <div className="flex gap-3 mb-3">
                    {/* Image Placeholder */}
                    <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-400 font-medium">Image</span>
                    </div>
                    
                    {/* Info Column */}
                    <div className="flex-1 min-w-0">
                      {/* Defect Type with AI Confidence Indicator */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-gray-900">{defect.type}</h3>
                        {isLowConfidence && (
                          <HelpCircle className="w-4 h-4 text-orange-500 flex-shrink-0" title="AI uncertain - needs review" />
                        )}
                      </div>
                      
                      {/* Location & Section */}
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{defect.location}</span>
                        <span className="text-xs text-gray-500">• {defect.section}</span>
                      </div>
                      
                      {/* ID */}
                      <span className="text-xs text-gray-500 font-mono">{defect.id}</span>
                    </div>

                    {/* Assignee Avatar */}
                    <div className="flex-shrink-0">
                      <div 
                        className={`w-10 h-10 ${assignee.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                        title={`${assignee.name} (${assignee.role})`}
                      >
                        {assignee.initials}
                      </div>
                    </div>
                  </div>

                  {/* Precise Location */}
                  <p className="text-sm text-gray-600 mb-3 pl-1">{defect.position}</p>

                  {/* Icon Grid - Key Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b border-gray-200">
                    {/* Size */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500">Size</span>
                      <span className="text-sm font-bold text-gray-900">{defect.size}</span>
                    </div>

                    {/* Days to Fix */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-500">Days to Fix</span>
                      <span className={`text-sm font-bold ${getDaysToFixColor(defect.daysToFix)}`}>
                        {defect.daysToFix < 0 ? `${Math.abs(defect.daysToFix)}d over` : `${defect.daysToFix}d`}
                      </span>
                    </div>

                    {/* AI Confidence */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500">AI Conf.</span>
                      <span className={`text-sm font-bold ${isLowConfidence ? 'text-orange-600' : 'text-gray-900'}`}>
                        {defect.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Review Button */}
                  <button 
                    onClick={() => navigate(`/persona/${personaId}/defect/${defect.id}`)}
                    className="w-full h-[44px] bg-[#4b5563] text-[#e6edf2] rounded-lg font-bold text-base hover:bg-[#374151] transition-colors"
                  >
                    Review
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create New Group Button */}
        <div className="mb-6">
          <button className="w-full h-[44px] bg-white border-2 border-[#4b5563] text-[#4b5563] rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5" />
            Create New Group
          </button>
        </div>

        {/* Grouped Issues */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Grouped Issues</h2>
          <div className="space-y-3">
            {groupedDefects.map((group) => {
              const assignee = teamMembers[group.assignee as keyof typeof teamMembers];
              const isLowConfidence = group.confidence < 75;
              
              return (
                <div
                  key={group.id}
                  className={`bg-white rounded-lg border-2 border-dashed ${getPriorityColor(group.priority).replace('border-l-', 'border-')} p-4 shadow-sm`}
                >
                  {/* Group Header with Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Group Icon */}
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>

                    {/* Group Info */}
                    <div className="flex-1 min-w-0">
                      {/* Group Type Badge */}
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 border border-blue-300 text-blue-700 text-xs font-bold mb-2">
                        <Users className="w-3 h-3" />
                        {group.type}
                      </div>
                      
                      {/* Description with AI Confidence */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-gray-900">{group.description}</h3>
                        {isLowConfidence && (
                          <HelpCircle className="w-4 h-4 text-orange-500 flex-shrink-0" title="AI uncertain - needs review" />
                        )}
                      </div>
                      
                      {/* Location & Section */}
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{group.location}</span>
                        <span className="text-xs text-gray-500">• {group.section}</span>
                      </div>
                      
                      {/* Primary ID & Count */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-mono">{group.primaryDefect}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                          {group.count} linked
                        </span>
                      </div>
                    </div>

                    {/* Assignee Avatar */}
                    <div className="flex-shrink-0">
                      <div 
                        className={`w-10 h-10 ${assignee.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                        title={`${assignee.name} (${assignee.role})`}
                      >
                        {assignee.initials}
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <p className="text-sm text-gray-600 mb-3 pl-1">{group.position}</p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{group.reportedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className={`text-sm font-bold ${isLowConfidence ? 'text-orange-600' : 'text-gray-700'}`}>
                        {group.confidence}% AI
                      </span>
                    </div>
                  </div>

                  {/* Review Button */}
                  <button className="w-full h-[44px] bg-[#4b5563] text-[#e6edf2] rounded-lg font-bold text-base hover:bg-[#374151] transition-colors">
                    Review
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}