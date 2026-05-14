import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Send, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type JobStatus = 'sent' | 'accepted' | 'repairing' | 'fixed' | 'confirmed';

interface Message {
  id: string;
  sender: 'contractor' | 'nh';
  text: string;
  timestamp: string;
  type: 'text' | 'status' | 'photo';
  photoUrl?: string;
  status?: JobStatus;
}

// Mock job data
const jobData = {
  id: 'JOB-001',
  defectId: 'DEF-1247',
  contractor: {
    name: 'Alex Thompson',
    company: 'QuickFix Contractors',
    initials: 'AT',
    color: '#3B82F6',
  },
  description: 'Pothole repair required',
  location: 'M1',
  section: 'J15A-N',
  status: 'confirmed' as JobStatus,
  repairCost: 450,
  invoiceId: null,
  invoiced: false,
};

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'nh',
    text: 'Pothole repair needed urgently at M1 Junction 15A northbound. Approx 45cm diameter, depth 8cm. Please confirm receipt and estimated arrival time.',
    timestamp: '2d ago',
    type: 'text',
  },
  {
    id: 'msg-2',
    sender: 'contractor',
    text: 'Job accepted. Team will be on site within 2 hours.',
    timestamp: '2d ago',
    type: 'text',
  },
  {
    id: 'msg-3',
    sender: 'nh',
    text: '',
    timestamp: '2d ago',
    type: 'status',
    status: 'accepted',
  },
  {
    id: 'msg-4',
    sender: 'contractor',
    text: 'Team on site now. Starting repair work.',
    timestamp: '2d ago',
    type: 'text',
  },
  {
    id: 'msg-5',
    sender: 'nh',
    text: '',
    timestamp: '2d ago',
    type: 'status',
    status: 'repairing',
  },
  {
    id: 'msg-6',
    sender: 'contractor',
    text: 'Repair completed. Please see attached photo for confirmation.',
    timestamp: '2d ago',
    type: 'text',
  },
  {
    id: 'msg-7',
    sender: 'contractor',
    text: '',
    timestamp: '2d ago',
    type: 'photo',
    photoUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400',
  },
  {
    id: 'msg-8',
    sender: 'nh',
    text: '',
    timestamp: '2d ago',
    type: 'status',
    status: 'fixed',
  },
  {
    id: 'msg-9',
    sender: 'nh',
    text: 'Repair confirmed. Quality check passed. Job marked as complete.',
    timestamp: '1d ago',
    type: 'text',
  },
  {
    id: 'msg-10',
    sender: 'nh',
    text: '',
    timestamp: '1d ago',
    type: 'status',
    status: 'confirmed',
  },
];

const statusSteps: { key: JobStatus; label: string }[] = [
  { key: 'sent', label: 'Sent' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'repairing', label: 'Repairing' },
  { key: 'fixed', label: 'Fixed' },
  { key: 'confirmed', label: 'Confirmed' },
];

function JobProgressIndicator({ currentStatus }: { currentStatus: JobStatus }) {
  const currentIndex = statusSteps.findIndex(step => step.key === currentStatus);

  return (
    <div>
      {/* Progress dots */}
      <div className="flex items-center justify-between mb-1">
        {statusSteps.map((step, index) => (
          <div key={step.key} className="flex items-center flex-1">
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full border-2 ${
                index <= currentIndex
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
            />
            {/* Line */}
            {index < statusSteps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 ${
                  index < currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Labels */}
      <div className="flex justify-between">
        {statusSteps.map((step, index) => (
          <div
            key={step.key}
            className={`text-[10px] ${
              index <= currentIndex ? 'text-gray-900 font-semibold' : 'text-gray-400'
            }`}
            style={{ width: `${100 / statusSteps.length}%`, textAlign: 'center' }}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  const { personaId, jobId } = useParams<{ personaId: string; jobId: string }>();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState('');

  const getStatusText = (status: JobStatus) => {
    switch (status) {
      case 'sent':
        return 'Job sent to contractor';
      case 'accepted':
        return 'Job accepted by contractor';
      case 'repairing':
        return 'Repair work in progress';
      case 'fixed':
        return 'Repair completed';
      case 'confirmed':
        return 'Job confirmed and completed';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center gap-3">
        <button
          onClick={() => navigate(`/persona/${personaId}/chats`)}
          className="p-2 hover:bg-gray-100 rounded-full -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: jobData.contractor.color }}
        >
          {jobData.contractor.initials}
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-900">{jobData.defectId}</h2>
          <p className="text-xs text-gray-500">{jobData.contractor.company}</p>
        </div>
        {jobData.invoiced && jobData.invoiceId && (
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
            {jobData.invoiceId}
          </span>
        )}
      </header>

      {/* Job Summary Card */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="mb-2">
          <h3 className="font-bold text-gray-900">{jobData.description}</h3>
          <p className="text-sm text-gray-600">
            {jobData.location} • {jobData.section}
          </p>
        </div>
        {jobData.repairCost && (
          <p className="text-lg font-bold text-blue-600 mb-3">£{jobData.repairCost}</p>
        )}
        <JobProgressIndicator currentStatus={jobData.status} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mockMessages.map(message => {
          if (message.type === 'status' && message.status) {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-700 font-medium">
                    {getStatusText(message.status)}
                  </span>
                </div>
              </div>
            );
          }

          if (message.type === 'photo' && message.photoUrl) {
            return (
              <div
                key={message.id}
                className={`flex ${message.sender === 'nh' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.sender === 'nh'
                      ? 'bg-blue-500'
                      : 'bg-white border border-gray-200'
                  } rounded-lg p-2`}
                >
                  <img
                    src={message.photoUrl}
                    alt="Repair completion"
                    className="rounded-lg w-full max-w-xs"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">{message.timestamp}</p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex ${message.sender === 'nh' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === 'nh'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                } rounded-lg px-4 py-2`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    message.sender === 'nh' ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}