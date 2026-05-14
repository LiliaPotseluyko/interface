import { useNavigate, useParams } from 'react-router';
import svgPaths from "../../imports/svg-rgqq1fxne0";
import { getPersonaById } from '../data/personas';

export default function PersonaDetailPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();

  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    console.log(`Logging in as ${persona.name}`);
    alert(`Demo login as ${persona.name} (${persona.role})`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Container - Mobile Width */}
      <div className="w-full max-w-[390px] bg-white flex flex-col shadow-lg min-h-[600px]">
        
        {/* Plain White Container (Top) */}
        <div className="bg-white h-[20px]" />

        {/* Gray Container with Logo */}
        <div className="bg-[#4b5563] py-8 flex items-center justify-center">
          <div className="w-[70px] h-[54px]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 94 72">
              <g>
                <path d={svgPaths.p3618d680} fill="#E6EDF2" />
                <path clipRule="evenodd" d={svgPaths.p10e49100} fill="#E6EDF2" fillRule="evenodd" />
                <path d={svgPaths.p22388200} fill="#E6EDF2" />
                <path d={svgPaths.p37bf9780} fill="#6B7280" />
                <path d={svgPaths.p29438680} fill="#29C5F6" />
                <path d={svgPaths.p37324d80} fill="#29C5F6" />
                <path d={svgPaths.p24c96400} fill="#29C5F6" />
                <path d={svgPaths.p2b28d360} fill="#29C5F6" />
                <path d={svgPaths.p3868f140} fill="#29C5F6" />
                <path d={svgPaths.p36df3100} fill="#29C5F6" />
              </g>
            </svg>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white px-8 py-8 flex flex-col items-center flex-1">
          
          {/* Profile Image */}
          <div className="w-[140px] h-[140px] mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-50 flex items-center justify-center overflow-hidden">
              <img
                src={persona.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

          {/* User Information */}
          <div className="flex flex-col items-center w-full mb-6 text-center">
            {/* Name */}
            <h1 className="text-[28px] font-bold text-black mb-2">
              {persona.name}
            </h1>

            {/* Role */}
            <h2 className="text-[16px] font-semibold text-gray-600 mb-6">
              {persona.role}
            </h2>

            {/* Description */}
            <p className="text-[14px] text-gray-700 leading-relaxed text-left w-full">
              {persona.description}
            </p>
          </div>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="w-full flex gap-4 justify-center items-center pb-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="bg-white border-2 border-[#4b5563] rounded-lg flex-1 h-[48px] font-semibold text-[16px] text-[#4b5563] hover:bg-gray-50 active:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4b5563]"
              aria-label="Go back to persona selection"
            >
              Back
            </button>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="bg-[#0082ca] rounded-lg flex-1 h-[48px] font-semibold text-[16px] text-white hover:bg-[#0070dd] active:bg-[#006bc7] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0082ca]"
              aria-label={`Login as ${persona.name}`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Bottom Container - Gray with white line (Home Indicator) */}
        <div className="bg-gray-200 h-[40px] w-full flex items-center justify-center">
          <div className="bg-white h-[4px] rounded-full w-[120px]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
