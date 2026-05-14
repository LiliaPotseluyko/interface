import { useParams, Navigate } from 'react-router';
import { getPersonaById } from '../data/personas';
import InternalSectionsPage from './stephen/SectionsPage';
import RajeshSectionsPage from './rajesh/SectionsPage';

export default function SectionsPageWrapper() {
  const { personaId } = useParams<{ personaId: string }>();
  const persona = personaId ? getPersonaById(personaId) : undefined;

  if (!persona) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate sections page based on role type
  if (personaId === 'rajesh') {
    return <RajeshSectionsPage />;
  }

  // Default to internal sections page for Stephen and Samira
  return <InternalSectionsPage />;
}
