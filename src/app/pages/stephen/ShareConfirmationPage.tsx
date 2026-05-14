import { useNavigate, useParams } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function ShareConfirmationPage() {
  const navigate = useNavigate();
  const { personaId } = useParams<{ personaId: string }>();

  useEffect(() => {
    // Auto-redirect to defects page after 2 seconds
    const timer = setTimeout(() => {
      navigate(`/persona/${personaId}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, personaId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-[#0EA5E9]" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Shared Successfully</h1>
        <p className="text-gray-600 mb-8">
          The defect has been shared with your team members.
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
