import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import TabButton from '../../components/TabButton';
import { Search, Mic, ChevronRight, MapPin, Briefcase, FileText, Clock, Plus } from 'lucide-react';

type JobStatus = 'sent' | 'accepted' | 'repairing' | 'fixed' | 'confirmed';
type InvoiceStatus = 'draft' | 'submitted' | 'approved' | 'paid';

interface Job {
  id: string;
  defectId: string;
  contractor: {
    name: string;
    company: string;
    initials: string;
    color: string;
  };
  description: string;
  location: string;
  section: string;
  status: JobStatus;
  timeSent: string;
  invoiceId: string | null;
  invoiced: boolean;
  repairCost?: number;
}

interface Invoice {
  id: string;
  contractor: {
    name: string;
    company: string;
  };
  jobIds: string[];
  totalAmount: number;
  status: InvoiceStatus;
  submittedDate?: string;
  locked: boolean;
}

// Mock data
const mockJobs: Job[] = [
  {
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
    status: 'confirmed',
    timeSent: '2d ago',
    invoiceId: null,
    invoiced: false,
    repairCost: 450,
  },
  {
    id: 'JOB-002',
    defectId: 'DEF-1251',
    contractor: {
      name: 'Sarah Williams',
      company: 'RoadCare Solutions',
      initials: 'SW',
      color: '#10B981',
    },
    description: 'Surface cracking repair',
    location: 'A14',
    section: 'CS-E',
    status: 'confirmed',
    timeSent: '3d ago',
    invoiceId: null,
    invoiced: false,
    repairCost: 680,
  },
  {
    id: 'JOB-003',
    defectId: 'DEF-1243',
    contractor: {
      name: 'Mike Chen',
      company: 'Highway Heroes Ltd',
      initials: 'MC',
      color: '#8B5CF6',
    },
    description: 'Critical pothole - urgent',
    location: 'M6',
    section: 'J8-S',
    status: 'repairing',
    timeSent: '1d ago',
    invoiceId: null,
    invoiced: false,
    repairCost: 520,
  },
  {
    id: 'JOB-004',
    defectId: 'DEF-1255',
    contractor: {
      name: 'Alex Thompson',
      company: 'QuickFix Contractors',
      initials: 'AT',
      color: '#3B82F6',
    },
    description: 'Edge defect repair',
    location: 'B1040',
    section: 'M23',
    status: 'confirmed',
    timeSent: '5d ago',
    invoiceId: 'INV-001',
    invoiced: true,
    repairCost: 320,
  },
  {
    id: 'JOB-005',
    defectId: 'DEF-1248',
    contractor: {
      name: 'Sarah Williams',
      company: 'RoadCare Solutions',
      initials: 'SW',
      color: '#10B981',
    },
    description: 'Multiple pothole repairs',
    location: 'A45',
    section: 'CR-50',
    status: 'accepted',
    timeSent: '4h ago',
    invoiceId: null,
    invoiced: false,
    repairCost: 890,
  },
];

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    contractor: {
      name: 'Alex Thompson',
      company: 'QuickFix Contractors',
    },
    jobIds: ['JOB-004'],
    totalAmount: 320,
    status: 'submitted',
    submittedDate: '1d ago',
    locked: true,
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
    <div className="mt-3">
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

export default function ChatsPage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobs' | 'invoices'>('jobs');

  const readyToInvoiceJobs = mockJobs.filter(
    job => job.status === 'confirmed' && !job.invoiced
  );
  const activeJobs = mockJobs.filter(job => !job.invoiced && job.status !== 'confirmed');
  const invoicedJobs = mockJobs.filter(job => job.invoiced);

  const draftInvoices = mockInvoices.filter(inv => inv.status === 'draft');
  const submittedInvoices = mockInvoices.filter(inv => inv.status === 'submitted');
  const approvedInvoices = mockInvoices.filter(
    inv => inv.status === 'approved' || inv.status === 'paid'
  );

  const getInvoiceStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'paid':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Chats</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 pt-4 border-b border-gray-200">
        <div className="flex gap-3">
          <TabButton
            onClick={() => setActiveTab('jobs')}
            active={activeTab === 'jobs'}
          >
            Jobs
          </TabButton>
          <TabButton
            onClick={() => setActiveTab('invoices')}
            active={activeTab === 'invoices'}
          >
            Invoices
          </TabButton>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {activeTab === 'jobs' ? (
          <div className="space-y-6">
            {/* Ready to Invoice Section */}
            {readyToInvoiceJobs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900">Ready to Invoice</h2>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {readyToInvoiceJobs.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {readyToInvoiceJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg p-4 border-2 border-green-500"
                      onClick={() => navigate(`/persona/${personaId}/chats/job/${job.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Contractor Avatar */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ backgroundColor: job.contractor.color }}
                        >
                          {job.contractor.initials}
                        </div>

                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-900">{job.defectId}</h3>
                              <p className="text-xs text-gray-500">{job.contractor.company}</p>
                            </div>
                            <span className="text-xs text-gray-500">{job.timeSent}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{job.description}</p>
                          <p className="text-xs text-gray-500">
                            {job.location} • {job.section}
                          </p>
                          {job.repairCost && (
                            <p className="text-sm font-bold text-green-600 mt-2">
                              £{job.repairCost}
                            </p>
                          )}
                          <JobProgressIndicator currentStatus={job.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Jobs Section */}
            {activeJobs.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 mb-3">Active Jobs</h2>
                <div className="space-y-3">
                  {activeJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                      onClick={() => navigate(`/persona/${personaId}/chats/job/${job.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Contractor Avatar */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ backgroundColor: job.contractor.color }}
                        >
                          {job.contractor.initials}
                        </div>

                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-900">{job.defectId}</h3>
                              <p className="text-xs text-gray-500">{job.contractor.company}</p>
                            </div>
                            <span className="text-xs text-gray-500">{job.timeSent}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{job.description}</p>
                          <p className="text-xs text-gray-500">
                            {job.location} • {job.section}
                          </p>
                          <JobProgressIndicator currentStatus={job.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invoiced Jobs Section */}
            {invoicedJobs.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-500 mb-3">Invoiced</h2>
                <div className="space-y-3">
                  {invoicedJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 opacity-60"
                      onClick={() => navigate(`/persona/${personaId}/chats/job/${job.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Contractor Avatar */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ backgroundColor: job.contractor.color }}
                        >
                          {job.contractor.initials}
                        </div>

                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-900">{job.defectId}</h3>
                              <p className="text-xs text-gray-500">{job.contractor.company}</p>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                              {job.invoiceId}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{job.description}</p>
                          <p className="text-xs text-gray-500">
                            {job.location} • {job.section}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Create Invoice Button */}
            {readyToInvoiceJobs.length > 0 && (
              <button
                className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                onClick={() => navigate(`/persona/${personaId}/chats/create-invoice`)}
              >
                <Plus className="w-5 h-5" />
                Create New Invoice
              </button>
            )}

            {/* Draft Invoices */}
            {draftInvoices.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 mb-3">Draft</h2>
                <div className="space-y-3">
                  {draftInvoices.map(invoice => (
                    <div
                      key={invoice.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                      onClick={() => navigate(`/persona/${personaId}/chats/invoice/${invoice.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.contractor.company}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getInvoiceStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {invoice.jobIds.length} job{invoice.jobIds.length > 1 ? 's' : ''}
                        </span>
                        <span className="font-bold text-gray-900">£{invoice.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submitted Invoices */}
            {submittedInvoices.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 mb-3">Submitted</h2>
                <div className="space-y-3">
                  {submittedInvoices.map(invoice => (
                    <div
                      key={invoice.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                      onClick={() => navigate(`/persona/${personaId}/chats/invoice/${invoice.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.contractor.company}</p>
                          {invoice.submittedDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Submitted {invoice.submittedDate}
                            </p>
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getInvoiceStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {invoice.jobIds.length} job{invoice.jobIds.length > 1 ? 's' : ''}
                        </span>
                        <span className="font-bold text-gray-900">£{invoice.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved/Paid Invoices */}
            {approvedInvoices.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 mb-3">Completed</h2>
                <div className="space-y-3">
                  {approvedInvoices.map(invoice => (
                    <div
                      key={invoice.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                      onClick={() => navigate(`/persona/${personaId}/chats/invoice/${invoice.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.contractor.company}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getInvoiceStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {invoice.jobIds.length} job{invoice.jobIds.length > 1 ? 's' : ''}
                        </span>
                        <span className="font-bold text-gray-900">£{invoice.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {mockInvoices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No invoices yet</p>
                {readyToInvoiceJobs.length > 0 && (
                  <p className="text-sm text-gray-400 mt-2">
                    You have {readyToInvoiceJobs.length} job(s) ready to invoice
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation */}
      {personaId && <Navigation personaId={personaId} />}
    </div>
  );
}