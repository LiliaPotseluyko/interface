import { useNavigate, useParams } from 'react-router';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { personaId } = useParams<{ personaId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Submission Confirmed</h1>
        <p className="text-gray-600 mb-8">
          Your defect review has been successfully submitted.
        </p>

        <button
          onClick={() => navigate(`/persona/${personaId}`)}
          className="w-full h-[44px] bg-[#4b5563] text-[#e6edf2] rounded-lg font-bold text-base hover:bg-[#374151] transition-colors"
        >
          Back to Defects
        </button>
      </div>
    </div>
  );
}
