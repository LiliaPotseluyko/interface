import { useParams, Navigate } from 'react-router';
import { getPersonaById } from '../data/personas';
import InternalSectionDetailPage from './stephen/SectionDetailPage';
import RajeshSectionDetailPage from './rajesh/SectionDetailPage';

export default function SectionDetailPageWrapper() {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate section detail page based on persona
  if (personaId === 'rajesh') {
    return <RajeshSectionDetailPage />;
  }

  // Default to internal section detail page for Stephen and Samira
  return <InternalSectionDetailPage />;
}
