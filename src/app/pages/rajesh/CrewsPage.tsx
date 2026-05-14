import { useParams } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { Star, MoreVertical, X, TrendingUp, TrendingDown, Info } from 'lucide-react';

type HumanCrew = {
  id: string;
  name: string;
  company: string;
  imageUrl: string;
  specialization: string;
  strengths: string;
  weaknesses: string;
  rating: number;
};

type AutonomousUnit = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  strengths: string;
  weaknesses: string;
  rating: number;
};

export default function CrewsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const [activeTab, setActiveTab] = useState<'human' | 'autonomous'>('human');
  const [selectedCrew, setSelectedCrew] = useState<HumanCrew | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<AutonomousUnit | null>(null);

  const humanCrews: HumanCrew[] = [
    {
      id: '1',
      name: 'Leo',
      company: 'Patch Adams',
      imageUrl: 'https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMHRlY2huaWNpYW4lMjB3b3JrZXIlMjBwb3J0cmFpdCUyMHNhZmV0eXxlbnwxfHx8fDE3NzM0MDkxMTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      specialization: 'All-round repairs',
      strengths: 'Highest quality workmanship, follows NH standards precisely, excellent on complex jobs',
      weaknesses: 'Very high demand; long waiting list; slower turnaround',
      rating: 5,
    },
    {
      id: '2',
      name: 'Rachel',
      company: 'Road Therapy',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVuZ2luZWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzQyNTU1NzAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      specialization: 'All-round repairs',
      strengths: 'Fast and reliable, easier to book than Leo, solid quality output',
      weaknesses: 'Slightly less meticulous; occasional minor rework needed',
      rating: 4,
    },
    {
      id: '3',
      name: 'Franco',
      company: 'Mine the Gap Repairs',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc0MjU1NTcwMHww&ixlib=rb-4.1.0&q=80&w=400',
      specialization: 'Temporary "make safe" fixes',
      strengths: 'Extremely quick response, ideal for emergencies, low-cost',
      weaknesses: 'Short-term results, repairs may not last long',
      rating: 3,
    },
    {
      id: '4',
      name: 'Arif',
      company: 'Smooth Operators',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29ya2VyfGVufDF8fHx8MTc0MjU1NTcwMHww&ixlib=rb-4.1.0&q=80&w=400',
      specialization: 'Crack-only maintenance',
      strengths: 'Specialist precision in crack sealing, proactive maintenance mindset',
      weaknesses: 'Limited scope; avoids deep potholes or structural jobs',
      rating: 4,
    },
  ];

  const autonomousUnits: AutonomousUnit[] = [
    {
      id: 'au1',
      name: 'Colossus',
      imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm90b21vdXMlMjB2ZWhpY2xlJTIwY29uc3RydWN0aW9ucxlufDF8fHx8MTc0MjU1NTcwMHww&ixlib=rb-4.1.0&q=80&w=400',
      description: 'Large autonomous unit with multimodal sensors. Performs high-resolution scans and large-scale repairs.',
      strengths: 'Data accuracy, deep repairs',
      weaknesses: 'Major repairs, structural faults',
      rating: 5,
    },
    {
      id: 'au2',
      name: 'Swarm',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMHZlaGljbGUlMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc0MjU1NTcwMHww&ixlib=rb-4.1.0&q=80&w=400',
      description: 'Medium vehicle with multiple gantries fixing several cracks simultaneously.',
      strengths: 'Efficiency, multitasking',
      weaknesses: 'Crack clusters, network-scale fixes',
      rating: 4,
    },
    {
      id: 'au3',
      name: 'Stealth',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm90b21vdXMlMjBwb2JvdCUyMGZvciUyMGVtZXJnZW5jeSUyMGZpeGVzJTIwYW5kJTIwcmVwYWlycyxlbnwxfHx8fDE3NDI1NTU3MDB8MA&ixlib=rb-4.1.0&q=80&w=400',
      description: 'Fast and nimble IMP for urgent, single-point repairs.',
      strengths: 'Speed, minimal traffic disruption',
      weaknesses: 'Emergency pothole response',
      rating: 5,
    },
    {
      id: 'au4',
      name: 'Inferno',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1hY2hpbmVyeSUyMGF1dG9tYXRpb258ZW58MXx8fHwxNzQyNTU1NzAwfDA&ixlib=rb-4.1.0&q=80&w=400',
      description: 'Spray-injection repair unit (cleans, washes, fills).',
      strengths: 'Consistency, speed',
      weaknesses: 'Routine and temporary surface repairs',
      rating: 4,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Crews</h1>
        <p className="text-sm text-gray-600 mt-1">Manage human and autonomous repair units</p>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <TabButton onClick={() => setActiveTab('human')} active={activeTab === 'human'}>
            Human
          </TabButton>
          <TabButton onClick={() => setActiveTab('autonomous')} active={activeTab === 'autonomous'}>
            Autonomous
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-3">
        {activeTab === 'human' ? (
          <>
            {/* Human Crews List */}
            {humanCrews.map((crew) => (
              <div key={crew.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={crew.imageUrl}
                        alt={crew.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{crew.name}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{crew.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCrew(crew)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="More details"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Info className="w-4 h-4 text-gray-500" />
                    <span>{crew.specialization}</span>
                  </div>
                  {renderStars(crew.rating)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Autonomous Units List */}
            {autonomousUnits.map((unit) => (
              <div key={unit.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={unit.imageUrl}
                        alt={unit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                      <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{unit.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUnit(unit)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="More details"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center justify-end">
                  {renderStars(unit.rating)}
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      {/* Human Crew Detail Modal */}
      {selectedCrew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={selectedCrew.imageUrl}
                    alt={selectedCrew.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedCrew.name}</h2>
                  <p className="text-sm text-gray-600">{selectedCrew.company}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCrew(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4">
              {/* Rating */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Rating</p>
                {renderStars(selectedCrew.rating)}
              </div>

              {/* Specialization */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Specialization</p>
                <p className="text-sm text-gray-900">{selectedCrew.specialization}</p>
              </div>

              {/* Strengths */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-900">Strengths</h3>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">{selectedCrew.strengths}</p>
              </div>

              {/* Weaknesses */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-900">Weaknesses</h3>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">{selectedCrew.weaknesses}</p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#4b5563] text-white rounded-lg py-3 font-medium hover:bg-[#374151] transition-all">
                Assign to Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Autonomous Unit Detail Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={selectedUnit.imageUrl}
                    alt={selectedUnit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedUnit.name}</h2>
                  <p className="text-sm text-gray-600">Autonomous Unit</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUnit(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4">
              {/* Rating */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Rating</p>
                {renderStars(selectedUnit.rating)}
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-sm text-gray-900 leading-relaxed">{selectedUnit.description}</p>
              </div>

              {/* Strengths */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-green-900">Strengths</h3>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">{selectedUnit.strengths}</p>
              </div>

              {/* Weaknesses */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-900">Weaknesses</h3>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">{selectedUnit.weaknesses}</p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#4b5563] text-white rounded-lg py-3 font-medium hover:bg-[#374151] transition-all">
                Deploy Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}