import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Construction } from 'lucide-react';
import { getPersonaById } from '../data/personas';

export default function ExternalRolePlaceholderPage() {
  const navigate = useNavigate();
  const { personaId } = useParams<{ personaId: string }>();
  
  const persona = personaId ? getPersonaById(personaId) : undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {persona?.role} Interface
        </h1>
        
        <p className="text-gray-600 mb-6">
          The interface for <strong>{persona?.name}</strong> ({persona?.role}) is currently under development.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-900 mb-2">
            <strong>Role:</strong> {persona?.role}
          </p>
          <p className="text-sm text-blue-900">
            <strong>Description:</strong> {persona?.description}
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          This role will have a separate interface with custom navigation and task flows tailored for external contractors and subcontractors.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#374151] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>
      </div>
    </div>
  );
}
