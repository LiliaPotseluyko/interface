import { getPersonaById } from '../data/personas';

/**
 * Check if a persona has access to the internal team interface
 * (Defects, Roads, Team, Chats, Profile pages)
 */
export function hasInternalAccess(personaId: string): boolean {
  const persona = getPersonaById(personaId);
  return persona?.roleType === 'internal';
}

/**
 * Check if a persona is an external role
 * (Contractor, Subcontractor - will have their own interface)
 */
export function isExternalRole(personaId: string): boolean {
  const persona = getPersonaById(personaId);
  return persona?.roleType === 'external';
}

/**
 * Get the navigation configuration for a specific role
 */
export function getNavigationForRole(personaId: string) {
  const persona = getPersonaById(personaId);
  
  if (!persona) {
    return null;
  }

  // Internal team navigation (Stephen, Samira)
  if (persona.roleType === 'internal') {
    return {
      type: 'internal',
      items: [
        { id: 'defects', label: 'Defects', path: `/persona/${personaId}` },
        { id: 'roads', label: 'Roads', path: `/persona/${personaId}/roads` },
        { id: 'team', label: 'Team', path: `/persona/${personaId}/team` },
        { id: 'chats', label: 'Chats', path: `/persona/${personaId}/chats` },
        { id: 'profile', label: 'Profile', path: `/persona/${personaId}/profile` },
      ],
    };
  }

  // External roles navigation (Leo, Rajesh)
  // Will be implemented later with different navigation items
  if (persona.roleType === 'external') {
    return {
      type: 'external',
      items: [],
      // Future: Add contractor/subcontractor specific navigation
    };
  }

  return null;
}
