import { useParams, useNavigate } from 'react-router';
import { ChevronRight, Bot, UserCheck, Users } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import chartImage from 'figma:asset/342178484bec0783cf53224badfc228f9629a2f7.png';

interface RoadSection {
  id: string;
  sectionNumber: string;
  roadName: string;
  description: string;
  deterioration: number;
  color: string;
  markerPosition: { x: string; y: string };
  repairDeliveryMode: 'autonomous' | 'human' | 'mixed';
}

const roadSections: RoadSection[] = [
  {
    id: 'section-01',
    sectionNumber: '01',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 50,
    color: '#F59E0B',
    markerPosition: { x: '45%', y: '40%' },
    repairDeliveryMode: 'mixed',
  },
  {
    id: 'section-02',
    sectionNumber: '02',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 75,
    color: '#EF4444',
    markerPosition: { x: '35%', y: '58%' },
    repairDeliveryMode: 'human',
  },
  {
    id: 'section-03',
    sectionNumber: '03',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 25,
    color: '#10B981',
    markerPosition: { x: '30%', y: '22%' },
    repairDeliveryMode: 'autonomous',
  },
  {
    id: 'section-04',
    sectionNumber: '04',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 80,
    color: '#DC2626',
    markerPosition: { x: '55%', y: '50%' },
    repairDeliveryMode: 'human',
  },
];

export default function SectionsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  const getDeteriorationColor = (percentage: number) => {
    if (percentage >= 80) return '#DC2626';
    if (percentage >= 60) return '#EF4444';
    if (percentage >= 40) return '#F59E0B';
    if (percentage >= 20) return '#10B981';
    return '#059669';
  };

  const handleSectionClick = (sectionId: string) => {
    navigate(`/persona/${personaId}/section/${sectionId}`);
  };

  const getRepairModeDisplay = (mode: string) => {
    switch (mode) {
      case 'autonomous':
        return {
          label: 'Autonomous',
          icon: Bot,
          color: 'text-blue-700 bg-blue-50 border-blue-200',
        };
      case 'human':
        return {
          label: 'Human',
          icon: UserCheck,
          color: 'text-purple-700 bg-purple-50 border-purple-200',
        };
      case 'mixed':
        return {
          label: 'Mixed',
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

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">My Sections</h1>
      </header>

      {/* Deterioration Curve Chart */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="relative w-full">
          <ImageWithFallback
            src={chartImage}
            alt="Deterioration curve showing condition over time"
            className="w-full h-auto"
          />
          
          {roadSections.map((section) => (
            <div
              key={section.id}
              className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
              style={{
                backgroundColor: section.color,
                left: section.markerPosition.x,
                top: section.markerPosition.y,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.sectionNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Road Sections List */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="space-y-3">
          {roadSections.map((section) => {
            const bgColor = getDeteriorationColor(section.deterioration);
            const repairMode = getRepairModeDisplay(section.repairDeliveryMode);
            const RepairModeIcon = repairMode.icon;
            
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSectionClick(section.id)}
              >
                <div className="flex items-center gap-3">
                  {/* Circular Section Marker */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: bgColor }}
                  >
                    {section.sectionNumber}
                  </div>

                  {/* Road Info */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{section.roadName}</h3>
                      <span className="text-sm text-gray-600">{section.description}</span>
                    </div>
                    <div className="text-sm text-gray-500">section</div>
                  </div>

                  {/* Deterioration Percentage */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-900">{section.deterioration}%</div>
                    <div className="text-xs text-gray-500">deterioration</div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
                
                {/* Repair Mode Badge */}
                <div className="mt-2 ml-15">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${repairMode.color} text-xs font-medium`}>
                    <RepairModeIcon className="w-3.5 h-3.5" />
                    {repairMode.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}