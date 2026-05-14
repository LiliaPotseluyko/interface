import { useParams, Navigate } from 'react-router';
import { getPersonaById } from '../data/personas';
import InternalSectionPredictionsPage from './stephen/SectionPredictionsPage';
import RajeshSectionPredictionsPage from './rajesh/SectionPredictionsPage';

export default function SectionPredictionsPageWrapper() {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate predictions page based on persona
  if (personaId === 'rajesh') {
    return <RajeshSectionPredictionsPage />;
  }

  // Default to internal predictions page for Stephen and Samira
  return <InternalSectionPredictionsPage />;
}
