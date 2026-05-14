import { useParams } from 'react-router';
import Navigation from '../../components/Navigation';

export default function SectionsPage() {
  const { personaId } = useParams<{ personaId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Road Sections</h1>
        <p className="text-sm text-gray-600 mt-1">Working with road sections</p>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-500">Content coming soon...</p>
        </div>
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}
