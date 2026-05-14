import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Wrench, TrendingUp, ChevronLeft, ChevronRight, Map, Eye, Users, Bot, UserCheck, Star } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useState } from 'react';
import chartImage from 'figma:asset/342178484bec0783cf53224badfc228f9629a2f7.png';

interface SectionData {
  id: string;
  sectionNumber: string;
  roadName: string;
  description: string;
  deterioration: number;
  color: string;
  markerPosition: { x: string; y: string };
  condition: string;
  healthScore: number;
  deteriorationRate: string;
  remainingLife: string;
  repairDeliveryMode: 'autonomous' | 'human' | 'mixed';
  infrastructure: {
    crackingSeverity: string;
    ruttingDepth: string;
    roughness: string;
    skiddingResistance: string;
    surfaceTexture: string;
  };
}

// Mock data
const sectionData: Record<string, SectionData> = {
  'section-01': {
    id: 'section-01',
    sectionNumber: '01',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 50,
    color: '#F59E0B',
    markerPosition: { x: '45%', y: '40%' },
    condition: 'FAIR',
    healthScore: 62,
    deteriorationRate: '+8% per year',
    remainingLife: '15 years',
    repairDeliveryMode: 'mixed',
    infrastructure: {
      crackingSeverity: 'Medium',
      ruttingDepth: 'High',
      roughness: 'Medium',
      skiddingResistance: 'Good',
      surfaceTexture: 'Moderate',
    },
  },
  'section-02': {
    id: 'section-02',
    sectionNumber: '02',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 75,
    color: '#EF4444',
    markerPosition: { x: '35%', y: '58%' },
    condition: 'POOR',
    healthScore: 38,
    deteriorationRate: '+12% per year',
    remainingLife: '8 years',
    repairDeliveryMode: 'human',
    infrastructure: {
      crackingSeverity: 'High',
      ruttingDepth: 'High',
      roughness: 'High',
      skiddingResistance: 'Fair',
      surfaceTexture: 'Poor',
    },
  },
  'section-03': {
    id: 'section-03',
    sectionNumber: '03',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 25,
    color: '#10B981',
    markerPosition: { x: '30%', y: '22%' },
    condition: 'GOOD',
    healthScore: 82,
    deteriorationRate: '+4% per year',
    remainingLife: '22 years',
    repairDeliveryMode: 'autonomous',
    infrastructure: {
      crackingSeverity: 'Low',
      ruttingDepth: 'Low',
      roughness: 'Low',
      skiddingResistance: 'Excellent',
      surfaceTexture: 'Good',
    },
  },
  'section-04': {
    id: 'section-04',
    sectionNumber: '04',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 80,
    color: '#DC2626',
    markerPosition: { x: '55%', y: '50%' },
    condition: 'VERY POOR',
    healthScore: 28,
    deteriorationRate: '+15% per year',
    remainingLife: '5 years',
    repairDeliveryMode: 'human',
    infrastructure: {
      crackingSeverity: 'Severe',
      ruttingDepth: 'Severe',
      roughness: 'High',
      skiddingResistance: 'Poor',
      surfaceTexture: 'Very Poor',
    },
  },
};

const crews = [
  { id: '1', name: 'Leo', company: 'Patch Adams', type: 'human' as const },
  { id: '2', name: 'Rachel', company: 'Road Therapy', type: 'human' as const },
  { id: '3', name: 'Franco', company: 'Mine the Gap Repairs', type: 'human' as const },
  { id: '4', name: 'Arif', company: 'Smooth Operators', type: 'human' as const },
];

const autonomousResources = [
  { 
    id: 'a1', 
    name: 'Colossus', 
    company: 'Large autonomous unit with multimodal sensors. Performs high...', 
    type: 'autonomous' as const,
    rating: 5
  },
  { 
    id: 'a2', 
    name: 'Swarm', 
    company: 'Medium vehicle with multiple gantries fixing several cracks...', 
    type: 'autonomous' as const,
    rating: 4
  },
  { 
    id: 'a3', 
    name: 'Stealth', 
    company: 'Fast and nimble IMP for urgent, single-point repairs.', 
    type: 'autonomous' as const,
    rating: 5
  },
  { 
    id: 'a4', 
    name: 'Inferno', 
    company: 'Spray-injection repair unit (cleans, washes, fills).', 
    type: 'autonomous' as const,
    rating: 4
  },
];

export default function SectionDetailPage() {
  const { personaId, sectionId } = useParams<{ personaId: string; sectionId: string }>();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBidSelection, setShowBidSelection] = useState(false);
  const [selectedCrews, setSelectedCrews] = useState<string[]>([]);

  const section = sectionId ? sectionData[sectionId] : sectionData['section-01'];

  if (!section) {
    return <div>Section not found</div>;
  }

  const carouselItems = [
    { type: 'deterioration', label: 'Deterioration Curve', icon: TrendingUp, future: false },
    { type: 'map', label: 'Geographic Map', icon: Map, future: false },
    { type: 'twin', label: 'Digital Twin 3D', icon: Eye, future: true },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'EXCELLENT':
        return 'text-green-700 bg-green-100';
      case 'GOOD':
        return 'text-green-600 bg-green-50';
      case 'FAIR':
        return 'text-amber-600 bg-amber-50';
      case 'POOR':
        return 'text-red-600 bg-red-50';
      case 'VERY POOR':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRepairModeDisplay = (mode: string) => {
    switch (mode) {
      case 'autonomous':
        return {
          label: 'Autonomous Fixable',
          icon: Bot,
          color: 'text-blue-700 bg-blue-50 border-blue-200',
        };
      case 'human':
        return {
          label: 'Human Crew Required',
          icon: UserCheck,
          color: 'text-purple-700 bg-purple-50 border-purple-200',
        };
      case 'mixed':
        return {
          label: 'Mixed Intervention',
          icon: Users,
          color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        };
      default:
        return {
          label: 'Unknown',
          icon: Users,
          color: 'text-gray-700 bg-gray-50 border-gray-200',
        };
    }
  };

  const toggleCrewSelection = (crewId: string) => {
    setSelectedCrews((prev) =>
      prev.includes(crewId) ? prev.filter((id) => id !== crewId) : [...prev, crewId]
    );
  };

  const handleSendBid = () => {
    if (selectedCrews.length > 0) {
      alert(
        `Bid invitation sent to ${selectedCrews.length} crew${selectedCrews.length > 1 ? 's' : ''} for section ${section.sectionNumber}`
      );
      setShowBidSelection(false);
      setSelectedCrews([]);
    }
  };

  const repairMode = getRepairModeDisplay(section.repairDeliveryMode);
  const RepairModeIcon = repairMode.icon;

  // Get available resources based on repair delivery mode
  const availableResources = section.repairDeliveryMode === 'human'
    ? crews
    : section.repairDeliveryMode === 'autonomous'
    ? autonomousResources
    : [...autonomousResources, ...crews]; // mixed mode shows both

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/sections`)}
            className="p-2 hover:bg-gray-100 rounded-full -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Section</h1>
        </div>

        {/* Section Summary Row */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ backgroundColor: section.color }}
          >
            {section.sectionNumber}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h2 className="font-bold text-gray-900 text-lg">{section.roadName}</h2>
              <span className="text-sm text-gray-600">{section.description}</span>
            </div>
            <div className="text-xs text-gray-500">section</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-gray-900">{section.deterioration}%</div>
            <div className="text-xs text-gray-500">deterioration</div>
          </div>
        </div>
      </header>

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
              {/* Background content */}
              <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center">
                {item.type === 'deterioration' && !item.future ? (
                  <div className="relative w-full h-full bg-white flex items-center justify-center p-4">
                    <ImageWithFallback
                      src={chartImage}
                      alt="Deterioration curve showing condition over time"
                      className="w-full h-auto max-h-full object-contain"
                    />
                    {/* Highlighted Section Marker */}
                    <div
                      className="absolute w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white animate-pulse"
                      style={{
                        backgroundColor: section.color,
                        left: section.markerPosition.x,
                        top: section.markerPosition.y,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {section.sectionNumber}
                    </div>
                  </div>
                ) : item.type === 'map' && !item.future ? (
                  <img
                    src="https://images.unsplash.com/photo-1666167495201-aef3606a586e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjByb2FkJTIwbWFwJTIwaGlnaHdheXxlbnwxfHx8fDE3NzM2Nzk5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Geographic map view"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <item.icon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <div className="text-lg text-gray-300 font-medium mb-2">{item.label}</div>
                    {item.future && (
                      <div className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full inline-block">
                        Coming Soon
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
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
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Repair Delivery Mode Card */}
        <div className={`bg-white rounded-lg p-4 border-2 ${repairMode.color}`}>
          <div className="flex items-start gap-3">
            <RepairModeIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Repair Delivery Mode</h3>
              <p className="font-semibold">{repairMode.label}</p>
              <p className="text-xs text-gray-600 mt-2">
                {section.repairDeliveryMode === 'autonomous' &&
                  'This section can be repaired using autonomous maintenance vehicles.'}
                {section.repairDeliveryMode === 'human' &&
                  'This section requires human crew intervention due to complexity.'}
                {section.repairDeliveryMode === 'mixed' &&
                  'This section requires both autonomous systems and human crew support.'}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Metrics Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Condition:</span>
              <span
                className={`font-bold px-3 py-1 rounded-full text-sm ${getConditionColor(section.condition)}`}
              >
                {section.condition}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Health Score:</span>
              <span className="font-bold text-gray-900">{section.healthScore} / 100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Deterioration Rate:</span>
              <span className="font-bold text-gray-900">{section.deteriorationRate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remaining Life:</span>
              <span className="font-bold text-gray-900">{section.remainingLife}</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Health Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Infrastructure Health</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cracking severity</span>
              <span className="text-sm font-semibold text-gray-900">
                {section.infrastructure.crackingSeverity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rutting depth</span>
              <span className="text-sm font-semibold text-gray-900">
                {section.infrastructure.ruttingDepth}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Roughness</span>
              <span className="text-sm font-semibold text-gray-900">
                {section.infrastructure.roughness}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Skidding resistance</span>
              <span className="text-sm font-semibold text-gray-900">
                {section.infrastructure.skiddingResistance}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Surface texture</span>
              <span className="text-sm font-semibold text-gray-900">
                {section.infrastructure.surfaceTexture}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/section/${sectionId}/diagnostics`)}
            className="w-full bg-white text-[#4b5563] font-semibold py-3 rounded-lg border-2 border-[#4b5563] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Wrench className="w-5 h-5" />
            View Detailed Diagnostics
          </button>
          <button
            onClick={() => navigate(`/persona/${personaId}/section/${sectionId}/predictions`)}
            className="w-full bg-white text-[#4b5563] font-semibold py-3 rounded-lg border-2 border-[#4b5563] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            View Predictions
          </button>

          {/* Invite to Bid Button */}
          <button
            onClick={() => setShowBidSelection(!showBidSelection)}
            className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#374151] transition-colors"
          >
            <Users className="w-5 h-5" />
            {showBidSelection ? 'Cancel Bid Selection' : 'Invite to Bid'}
          </button>
        </div>

        {/* Bid Selection Panel */}
        {showBidSelection && (
          <div className="bg-[#e3f2fd] rounded-lg p-4 border-2 border-[#90caf9] space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#0082ca]" />
              <h3 className="font-semibold text-gray-900">
                {section.repairDeliveryMode === 'human' && 'Select Human Subcontractors for Bid'}
                {section.repairDeliveryMode === 'autonomous' && 'Select Autonomous Resources for Task'}
                {section.repairDeliveryMode === 'mixed' && 'Select Resources for Bid (Autonomous & Human)'}
              </h3>
            </div>

            <div className="space-y-2">
              {availableResources.map((resource) => {
                const isChecked = selectedCrews.includes(resource.id);
                const isAutonomous = resource.type === 'autonomous';
                const rating = 'rating' in resource ? resource.rating : undefined;
                return (
                  <label
                    key={resource.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-white border-[#0082ca] shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCrewSelection(resource.id)}
                      className="w-5 h-5 text-[#0082ca] border-gray-300 rounded focus:ring-[#0082ca] cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{resource.name}</p>
                        {isAutonomous && (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{resource.company}</p>
                      {rating && (
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowBidSelection(false);
                  setSelectedCrews([]);
                }}
                className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-lg py-2.5 font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBid}
                disabled={selectedCrews.length === 0}
                className={`flex-1 rounded-lg py-2.5 font-medium transition-all ${
                  selectedCrews.length > 0
                    ? 'bg-[#4b5563] text-white hover:bg-[#374151]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Send Bid ({selectedCrews.length})
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}