export interface PersonaData {
  id: string;
  name: string;
  role: string;
  roleType: 'internal' | 'external';
  description: string;
  imageUrl: string;
}

export const personas: PersonaData[] = [
  {
    id: 'stephen',
    name: 'Stephen',
    role: 'Road Analyst',
    roleType: 'internal',
    description: 'Works at National Highways, reviews assessed defects, defines repair strategies and treatments, sets maintenance priorities, and manages urgent make-safe repairs.',
    imageUrl: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzczNDA1NzY1fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'samira',
    name: 'Samira',
    role: 'Manager',
    roleType: 'internal',
    description: 'Works at National Highways, reviewing assessors\' work and performance, monitoring AI performance and assurance, and overseeing completion of repair work by contractors and subcontractors.',
    imageUrl: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwbWFuYWdlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzM5MTQ3MXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'rajesh',
    name: 'Rajesh',
    role: 'Contractor',
    roleType: 'external',
    description: 'Focuses on planning and preparing bids for subcontractors for non-urgent repair works using RoadGP decision support.',
    imageUrl: 'https://images.unsplash.com/photo-1652565436975-5ac0c22fb3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwb2ZmaWNlJTIwd29ya2VyJTIwY29udHJhY3RvcnxlbnwxfHx8fDE3NzM0MDkzNzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Subcontractor',
    roleType: 'external',
    description: 'Owns Patch Adams, a subcontractor repair company. Manages a small crew, sometimes working alone and sometimes with his team. Provides availability for urgent National Highways repairs and submits bids and required information for road section works.',
    imageUrl: 'https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMHRlY2huaWNpYW4lMjB3b3JrZXIlMjBwb3J0cmFpdCUyMHNhZmV0eXxlbnwxfHx8fDE3NzM0MDkxMTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export function getPersonaById(id: string): PersonaData | undefined {
  return personas.find(p => p.id === id);
}