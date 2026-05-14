import { useParams, Navigate } from 'react-router';
import { getPersonaById } from '../data/personas';
import InternalProfilePage from './stephen/ProfilePage';
import ExternalProfilePage from './leo/ProfilePage';

export default function ProfilePageWrapper() {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate profile page based on role type
  if (persona.roleType === 'external') {
    return <ExternalProfilePage />;
  }

  return <InternalProfilePage />;
}
