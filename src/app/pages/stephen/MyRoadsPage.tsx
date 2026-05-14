import { useParams, useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
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
  markerPosition: { x: string; y: string }; // Position on chart
}

const roadSections: RoadSection[] = [
  {
    id: 'section-01',
    sectionNumber: '01',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 50,
    color: '#F59E0B', // Amber/Orange
    markerPosition: { x: '45%', y: '40%' },
  },
  {
    id: 'section-02',
    sectionNumber: '02',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 75,
    color: '#EF4444', // Red
    markerPosition: { x: '35%', y: '58%' },
  },
  {
    id: 'section-03',
    sectionNumber: '03',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 25,
    color: '#10B981', // Green
    markerPosition: { x: '30%', y: '22%' },
  },
  {
    id: 'section-04',
    sectionNumber: '04',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    deterioration: 80,
    color: '#DC2626', // Dark Red
    markerPosition: { x: '55%', y: '50%' },
  },
];

export default function MyRoadsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  const getDeteriorationColor = (percentage: number) => {
    if (percentage >= 80) return '#DC2626'; // Red - Very Poor
    if (percentage >= 60) return '#EF4444'; // Red - Poor
    if (percentage >= 40) return '#F59E0B'; // Amber - Fair
    if (percentage >= 20) return '#10B981'; // Green - Good
    return '#059669'; // Dark Green - Excellent
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">My Roads</h1>
      </header>

      {/* Deterioration Curve Chart */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 max-w-7xl mx-auto">
        <div className="relative w-full">
          {/* Chart Image */}
          <ImageWithFallback
            src={chartImage}
            alt="Deterioration curve showing condition over time"
            className="w-full h-auto"
          />
          
          {/* Section Markers Overlaid on Chart */}
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
              onClick={() => navigate(`/persona/${personaId}/roads/${section.id}`)}
            >
              {section.sectionNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Road Sections List */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadSections.map((section) => {
            const bgColor = getDeteriorationColor(section.deterioration);
            
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/persona/${personaId}/roads/${section.id}`)}
              >
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
                <div className="text-right flex-shrink-0 mr-2">
                  <div className="font-bold text-gray-900">{section.deterioration}%</div>
                  <div className="text-xs text-gray-500">deterioration</div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
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