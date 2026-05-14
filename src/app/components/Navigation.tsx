import { useNavigate, useLocation } from 'react-router';
import { AlertTriangle, Map, Users, MessageSquare, User, CheckCircle, FileText, Calendar } from 'lucide-react';
import { getPersonaById } from '../data/personas';

interface NavigationProps {
  personaId: string;
}

export default function Navigation({ personaId }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get persona data to check role type
  const persona = getPersonaById(personaId);

  // Don't show navigation if persona not found
  if (!persona) {
    return null;
  }

  // Define navigation items based on role type
  let navItems;

  if (persona.roleType === 'internal') {
    // Navigation for internal team (Stephen, Samira)
    navItems = [
      { id: 'defects', icon: AlertTriangle, label: 'Defects', path: `/persona/${personaId}` },
      { id: 'roads', icon: Map, label: 'Roads', path: `/persona/${personaId}/roads` },
      { id: 'team', icon: Users, label: 'Team', path: `/persona/${personaId}/team` },
      { id: 'chats', icon: MessageSquare, label: 'Chats', path: `/persona/${personaId}/chats` },
      { id: 'profile', icon: User, label: 'Profile', path: `/persona/${personaId}/profile` },
    ];
  } else if (persona.roleType === 'external') {
    // Navigation for external roles - differentiate between Leo (subcontractor) and Rajesh (contractor)
    if (personaId === 'leo') {
      // Leo's navigation
      navItems = [
        { id: 'home', icon: CheckCircle, label: 'Tasks', path: `/persona/${personaId}/home` },
        { id: 'bids', icon: FileText, label: 'Bids', path: `/persona/${personaId}/bids` },
        { id: 'availability', icon: Calendar, label: 'Availability', path: `/persona/${personaId}/availability` },
        { id: 'chats', icon: MessageSquare, label: 'Chats', path: `/persona/${personaId}/chats` },
        { id: 'profile', icon: User, label: 'Profile', path: `/persona/${personaId}/profile` },
      ];
    } else if (personaId === 'rajesh') {
      // Rajesh's navigation
      navItems = [
        { id: 'sections', icon: Map, label: 'Sections', path: `/persona/${personaId}/sections` },
        { id: 'crews', icon: Users, label: 'Crews', path: `/persona/${personaId}/crews` },
        { id: 'chats', icon: MessageSquare, label: 'Chats', path: `/persona/${personaId}/chats` },
        { id: 'profile', icon: User, label: 'Profile', path: `/persona/${personaId}/profile` },
      ];
    } else {
      return null;
    }
  } else {
    return null;
  }

  const isActive = (path: string) => {
    // Special handling for home route
    if (path.endsWith('/home')) {
      return location.pathname === path;
    }

    // Check if current path matches or starts with the nav path (for sub-pages)
    if (path === `/persona/${personaId}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-[#374151] border-r border-[#4B5563] shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#4B5563]">
        <h1 className="text-white text-xl font-bold">RoadGP</h1>
        <p className="text-gray-400 text-sm mt-1">Digital Twin Platform</p>
        {persona && (
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0082ca] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{persona.name}</p>
              <p className="text-gray-400 text-xs">{persona.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-[#0082ca] text-white'
                  : 'text-gray-300 hover:text-white hover:bg-[#4B5563]'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}