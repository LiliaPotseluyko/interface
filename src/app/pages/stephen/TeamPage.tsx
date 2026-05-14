import { useParams } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { TrendingUp, MessageCircle, ChevronRight, Calendar, Award, MapPin, Image, Check } from 'lucide-react';

export default function TeamPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const [activeTab, setActiveTab] = useState<'performance' | 'discussions'>('performance');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('today');

  const teamMembers = [
    { id: 'alina', name: 'Alina', role: 'senior t.m.', progress: 115, initials: 'AL', color: '#10B981' },
    { id: 'nonso', name: 'Nonso', role: 'senior t.m.', progress: 100, initials: 'NO', color: '#8B5CF6' },
    { id: 'samira', name: 'Samira', role: 'manager', progress: 99, initials: 'SM', color: '#3B82F6' },
    { id: 'stephen', name: 'Stephen', role: 'team member', progress: 85, initials: 'ST', color: '#6B7280' },
    { id: 'ralphy', name: 'Ralphy', role: 'new start', progress: 65, initials: 'RA', color: '#F59E0B' },
  ];

  const discussions = [
    {
      id: 'DEF-1247',
      caseId: 'DEF-1247',
      type: 'Pothole',
      location: 'M1',
      section: 'J15A-N',
      position: 'Junction 15A northbound',
      image: 'figma:asset/7a25572a7079f1f0a2cffbf87c8c1aa9d825a115.png',
      size: '45cm',
      daysToFix: 3,
      confidence: 94,
      assignedMembers: [
        { id: 'stephen', reviewed: true },
        { id: 'alina', reviewed: true },
        { id: 'samira', reviewed: false },
      ],
    },
    {
      id: 'DEF-1251',
      caseId: 'DEF-1251',
      type: 'Surface Cracking',
      location: 'A14',
      section: 'CS-E',
      position: 'Near Cambridge Services',
      image: 'figma:asset/93bd6a2076de807a386d814846bc921278a53f5e.png',
      size: '2.5m',
      daysToFix: 12,
      confidence: 62,
      assignedMembers: [
        { id: 'alina', reviewed: true },
        { id: 'nonso', reviewed: false },
        { id: 'ralphy', reviewed: false },
        { id: 'stephen', reviewed: false },
      ],
    },
    {
      id: 'DEF-1255',
      caseId: 'DEF-1255',
      type: 'Edge Defect',
      location: 'B1040',
      section: 'M23',
      position: 'Mile marker 23',
      image: 'figma:asset/7a25572a7079f1f0a2cffbf87c8c1aa9d825a115.png',
      size: '30cm',
      daysToFix: 18,
      confidence: 91,
      assignedMembers: [
        { id: 'ralphy', reviewed: true },
        { id: 'samira', reviewed: true },
        { id: 'stephen', reviewed: true },
        { id: 'alina', reviewed: true },
        { id: 'nonso', reviewed: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 pt-4 border-b border-gray-200">
        <div className="flex gap-3">
          <TabButton
            onClick={() => setActiveTab('performance')}
            active={activeTab === 'performance'}
          >
            Performance
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('discussions')}
            active={activeTab === 'discussions'}
          >
            Discussions
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {activeTab === 'performance' ? (
          <div>
            {/* Time Filter */}
            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 text-[#0EA5E9] font-semibold">
                {timeFilter === 'today' ? 'Today' : timeFilter === 'week' ? 'Week' : 'Month'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Team Members List */}
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg p-4 flex items-center gap-4 border border-gray-200"
                >
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>

                  {/* Progress */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-xl">{member.progress}%</p>
                    <p className="text-sm text-gray-600">progress</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Discussions List */}
            {discussions.map((discussion) => {
              const reviewedCount = discussion.assignedMembers.filter(m => m.reviewed).length;
              const totalCount = discussion.assignedMembers.length;
              const reviewProgress = Math.round((reviewedCount / totalCount) * 100);

              return (
                <div
                  key={discussion.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Image Placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-bold text-gray-900">{discussion.type}</h3>
                        <p className="text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {discussion.location}
                          </span>
                          {' • '}
                          <span>{discussion.section}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{discussion.caseId}</p>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{discussion.position}</p>

                      {/* Assigned Members with Review Status */}
                      <div className="flex gap-1 flex-wrap">
                        {discussion.assignedMembers.map((member) => {
                          const teamMember = teamMembers.find(m => m.id === member.id);
                          return teamMember ? (
                            <div
                              key={member.id}
                              className="relative"
                            >
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                style={{ backgroundColor: teamMember.color }}
                              >
                                {teamMember.initials}
                              </div>
                              {member.reviewed && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {/* Review Progress */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-xl">{reviewProgress}%</p>
                      <p className="text-sm text-gray-600 whitespace-nowrap">review progress</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}