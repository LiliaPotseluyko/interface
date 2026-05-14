import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';

export default function SharePage() {
  const navigate = useNavigate();
  const { personaId, defectId } = useParams<{ personaId: string; defectId: string }>();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const teamMembers = [
    { id: 'samira', name: 'Samira', initials: 'SM', color: '#3B82F6', image: null },
    { id: 'alina', name: 'Alina', initials: 'AL', color: '#10B981', image: null },
    { id: 'nonso', name: 'Nonso', initials: 'NO', color: '#8B5CF6', image: null },
    { id: 'ralphy', name: 'Ralphy', initials: 'RA', color: '#F59E0B', image: null },
  ];

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleShare = () => {
    // Handle share logic here
    navigate(`/persona/${personaId}/defect/${defectId}/share-confirmation`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ml-64">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(`/persona/${personaId}/defect/${defectId}`)}
            className="w-10 h-10 bg-[#4b5563] rounded-full flex items-center justify-center hover:bg-[#374151] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Share Defect</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Team Members Selection */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <div className="relative mb-2">
                <input
                  type="checkbox"
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.id)}
                  onChange={() => toggleMember(member.id)}
                  className="absolute -top-1 -left-1 w-5 h-5 rounded border-2 border-gray-300 bg-white cursor-pointer z-10"
                />
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
              </div>
              <label
                htmlFor={`member-${member.id}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {member.name}
              </label>
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6 relative">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-gray-700 text-sm flex-1">
              {comment || 'Can you doublecheck this for me?'}
            </p>
            <button
              onClick={() => setComment('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="write comment"
            className="w-full text-sm text-gray-500 border-t border-gray-200 pt-2 mt-2 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/defect/${defectId}`)}
            className="flex-1 h-[44px] bg-white border-2 border-[#4b5563] text-[#4b5563] rounded-lg font-bold text-base hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleShare}
            className="flex-1 h-[44px] bg-[#0EA5E9] text-white rounded-lg font-bold text-base hover:bg-[#0284C7] transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}