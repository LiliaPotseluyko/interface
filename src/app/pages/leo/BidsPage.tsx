import { useParams } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { MapPin, DollarSign, Wrench, Award, Clock, CheckCircle, XCircle, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

type BidStatus = 'pending' | 'accepted' | 'rejected';

interface BidHistoryItem {
  id: string;
  jobTitle: string;
  location: string;
  section: string;
  status: BidStatus;
  amount: string;
  submittedDate: string;
  deadline: string;
  description: string;
}

const mockBidHistory: BidHistoryItem[] = [
  {
    id: 'BID-001',
    jobTitle: 'M1 J15A-N Pothole Repair',
    location: 'M1',
    section: 'Junction 15A northbound',
    status: 'pending',
    amount: '£2,450',
    submittedDate: '15 Mar 2026',
    deadline: '20 Mar 2026',
    description: 'Urgent pothole repair required, 45cm diameter',
  },
  {
    id: 'BID-002',
    jobTitle: 'A14 Surface Cracking Repair',
    location: 'A14',
    section: 'Near Cambridge Services',
    status: 'accepted',
    amount: '£4,200',
    submittedDate: '12 Mar 2026',
    deadline: '25 Mar 2026',
    description: 'Surface cracking repair, 2.5m section',
  },
  {
    id: 'BID-003',
    jobTitle: 'B1040 Edge Defect',
    location: 'B1040',
    section: 'Mile marker 23',
    status: 'rejected',
    amount: '£1,800',
    submittedDate: '10 Mar 2026',
    deadline: '18 Mar 2026',
    description: 'Edge defect repair, low priority',
  },
  {
    id: 'BID-004',
    jobTitle: 'M25 Carriageway Repair',
    location: 'M25',
    section: 'Junction 12-13',
    status: 'pending',
    amount: '£5,600',
    submittedDate: '14 Mar 2026',
    deadline: '22 Mar 2026',
    description: 'Major carriageway surface repair',
  },
];

export default function BidsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');
  const [expandedSections, setExpandedSections] = useState<string[]>(['location']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getStatusColor = (status: BidStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: BidStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Bids</h1>
        <p className="text-sm text-gray-600 mt-1">Your bidding information and history</p>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <TabButton
            onClick={() => setActiveTab('info')}
            active={activeTab === 'info'}
          >
            Bidding Info
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('history')}
            active={activeTab === 'history'}
          >
            Bid History
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {activeTab === 'info' ? (
          // Bidding Information Tab - Collapsible Sections
          <div className="space-y-3">
            {/* Location Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('location')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Location</span>
                </div>
                {expandedSections.includes('location') ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedSections.includes('location') && (
                <div className="px-4 pb-4 space-y-3 bg-white">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Region 1</span>
                    <p className="text-sm text-gray-900 mt-1">Midlands</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Region 2</span>
                    <p className="text-sm text-gray-900 mt-1">East</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Region 3</span>
                    <p className="text-sm text-gray-900 mt-1">Southeast</p>
                  </div>
                </div>
              )}
            </div>

            {/* Prices Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('prices')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Prices</span>
                </div>
                {expandedSections.includes('prices') ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedSections.includes('prices') && (
                <div className="px-4 pb-4 space-y-3 bg-white">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Standard Rate</span>
                    <p className="text-sm text-gray-900 mt-1">£45/hour</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Urgent Rate</span>
                    <p className="text-sm text-gray-900 mt-1">£65/hour</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Emergency Rate</span>
                    <p className="text-sm text-gray-900 mt-1">£90/hour</p>
                  </div>
                </div>
              )}
            </div>

            {/* Specs Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('specs')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Specs</span>
                </div>
                {expandedSections.includes('specs') ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedSections.includes('specs') && (
                <div className="px-4 pb-4 space-y-3 bg-white">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Excavator</span>
                    <p className="text-sm text-gray-900 mt-1">5-ton capacity</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Paver</span>
                    <p className="text-sm text-gray-900 mt-1">Road grade quality</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Roller</span>
                    <p className="text-sm text-gray-900 mt-1">10-ton capacity</p>
                  </div>
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('experience')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Experience</span>
                </div>
                {expandedSections.includes('experience') ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedSections.includes('experience') && (
                <div className="px-4 pb-4 space-y-3 bg-white">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Pothole Repairs</span>
                    <p className="text-sm text-gray-900 mt-1">8 years experience</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Surface Repairs</span>
                    <p className="text-sm text-gray-900 mt-1">5 years experience</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-semibold text-gray-700">Drainage Work</span>
                    <p className="text-sm text-gray-900 mt-1">3 years experience</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Bid History Tab
          <div className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-2xl font-bold text-yellow-600">{mockBidHistory.filter(b => b.status === 'pending').length}</p>
                <p className="text-xs text-gray-600 mt-1">Pending</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{mockBidHistory.filter(b => b.status === 'accepted').length}</p>
                <p className="text-xs text-gray-600 mt-1">Accepted</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{mockBidHistory.filter(b => b.status === 'rejected').length}</p>
                <p className="text-xs text-gray-600 mt-1">Rejected</p>
              </div>
            </div>

            {/* Bids List */}
            <div className="space-y-3">
              {mockBidHistory.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{bid.jobTitle}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {bid.location} • {bid.section}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{bid.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(bid.status)}`}>
                        {getStatusIcon(bid.status)}
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{bid.amount}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Submitted</p>
                      <p className="text-sm font-medium text-gray-900">{bid.submittedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}
