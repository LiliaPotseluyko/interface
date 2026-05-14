import { useParams, useNavigate } from 'react-router';
import Navigation from '../../components/Navigation';
import { getPersonaById } from '../../data/personas';
import { LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Your account settings</p>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {persona && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                <img
                  src={persona.imageUrl}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{persona.name}</h2>
              <p className="text-gray-600 mt-1">{persona.role}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-sm text-gray-700 text-center">{persona.description}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-[#C8102E] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#a00d25] transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}