import { useParams, Navigate } from 'react-router';
import { getPersonaById } from '../data/personas';
import InternalSectionDiagnosticsPage from './stephen/SectionDiagnosticsPage';
import RajeshSectionDiagnosticsPage from './rajesh/SectionDiagnosticsPage';

export default function SectionDiagnosticsPageWrapper() {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate diagnostics page based on persona
  if (personaId === 'rajesh') {
    return <RajeshSectionDiagnosticsPage />;
  }

  // Default to internal diagnostics page for Stephen and Samira
  return <InternalSectionDiagnosticsPage />;
}
