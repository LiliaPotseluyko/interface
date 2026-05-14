import { useParams, useNavigate } from 'react-router';
import Navigation from '../../components/Navigation';
import { getPersonaById } from '../../data/personas';
import { LogOut, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  const handleLogout = () => {
    navigate('/');
  };

  // Different company details based on persona
  const getCompanyDetails = () => {
    if (personaId === 'leo') {
      return {
        company: 'Patch Adams Ltd.',
        email: 'leo@patchadams.co.uk',
        phone: '+44 7700 900123',
        location: 'East Midlands, UK',
      };
    } else if (personaId === 'rajesh') {
      return {
        company: 'National Road Solutions',
        email: 'rajesh@nrsolutions.co.uk',
        phone: '+44 7700 900456',
        location: 'Birmingham, UK',
      };
    }
    return {
      company: 'Unknown',
      email: 'unknown@example.com',
      phone: 'N/A',
      location: 'N/A',
    };
  };

  const companyDetails = getCompanyDetails();

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Your account settings</p>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {persona && (
          <>
            {/* Profile Card */}
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
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-700 text-center">{persona.description}</p>
              </div>

              {/* Account Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Account Details</h3>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Company</p>
                    <p className="text-sm font-medium text-gray-900">{companyDetails.company}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900">{companyDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{companyDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm font-medium text-gray-900">{companyDetails.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-[#C8102E] text-white rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-2 hover:bg-[#a00d25] transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}