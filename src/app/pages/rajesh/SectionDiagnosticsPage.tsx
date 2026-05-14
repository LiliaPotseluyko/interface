import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function SectionDiagnosticsPage() {
  const navigate = useNavigate();
  const { personaId, sectionId } = useParams<{ personaId: string; sectionId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/section/${sectionId}`)}
            className="p-2 hover:bg-gray-100 rounded-full -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Detailed Diagnostics (Read-Only)</h1>
            <p className="text-sm text-gray-600">
              Section {sectionId ? sectionId.replace('section-', '') : '01'} - A14 Woolpit to Hagley Bridge
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-blue-900 mb-2">Read-Only Access</h3>
          <p className="text-sm text-blue-800">
            Stephen (Road Analyst) has already reviewed and finalized the diagnostics for this section.
            As a Contractor, you can view the diagnostic information to understand the repair requirements,
            but cannot modify the repair design or AI insights.
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-center py-8">
            Diagnostic information view coming soon. This will display all the infrastructure health,
            structural condition, traffic analysis, and safety metrics that Stephen has reviewed.
          </p>
        </div>
      </div>
    </div>
  );
}
