import { useNavigate } from 'react-router';
import svgPaths from "../../imports/svg-rgqq1fxne0";
import { personas, getPersonaById } from '../data/personas';

export default function LoginPage() {
  const navigate = useNavigate();

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const persona = getPersonaById(selectedId);
      
      // Route based on role type and specific persona
      if (persona?.roleType === 'external') {
        if (selectedId === 'rajesh') {
          navigate(`/persona/${selectedId}/sections`);
        } else {
          navigate(`/persona/${selectedId}/home`);
        }
      } else {
        navigate(`/persona/${selectedId}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* Main Container - Desktop Width */}
      <div className="w-full max-w-md bg-white flex flex-col shadow-lg rounded-lg">
        
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
        <div className="bg-white px-8 py-12 flex flex-col items-center">
          
          {/* 1. Select demo account text */}
          <p className="text-[16px] text-gray-700 mb-8 text-center">
            Select demo account to explore the platform
          </p>

          {/* 2. User Icon */}
          <div className="w-[120px] h-[120px] mb-8">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          {/* 3. Login as: */}
          <h2 className="text-[18px] font-semibold text-gray-800 mb-4">
            Login as:
          </h2>

          {/* 4. Pick user persona combo box */}
          <div className="w-full mb-10">
            <label htmlFor="persona-select" className="sr-only">
              Select user persona
            </label>
            <div className="relative">
              <select
                id="persona-select"
                defaultValue=""
                onChange={handlePersonaChange}
                className="w-full h-[54px] bg-white border-2 border-[rgba(75,85,99,0.5)] rounded-lg px-5 pr-12 text-[18px] text-[rgba(75,85,99,0.5)] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0082ca] focus:border-[#0082ca] transition-all"
                aria-label="Select user persona to login"
              >
                <option value="" disabled>
                  pick user persona
                </option>
                {personas.map((persona) => (
                  <option key={persona.id} value={persona.id} className="text-black">
                    {persona.name} - {persona.role}
                  </option>
                ))}
              </select>
              {/* Dropdown Arrow */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-[14px] h-[8px]" fill="none" viewBox="0 0 14 8">
                  <path 
                    d="M1 1L7 7L13 1" 
                    stroke="rgba(75,85,99,0.5)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Login Button - Removed, navigation is automatic */}
        </div>

        {/* Bottom Container - Gray with white line (Home Indicator) */}
        <div className="bg-gray-200 h-[40px] w-full flex items-center justify-center">
          <div className="bg-white h-[4px] rounded-full w-[120px]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}