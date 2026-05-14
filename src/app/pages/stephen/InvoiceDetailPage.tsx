import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';

interface Job {
  id: string;
  defectId: string;
  description: string;
  location: string;
  section: string;
  repairCost: number;
  status: string;
}

// Mock invoice data
const invoiceData = {
  id: 'INV-001',
  contractor: {
    name: 'Alex Thompson',
    company: 'QuickFix Contractors',
    initials: 'AT',
    color: '#3B82F6',
  },
  status: 'submitted' as const,
  submittedDate: '1d ago',
  locked: true,
  jobs: [
    {
      id: 'JOB-004',
      defectId: 'DEF-1255',
      description: 'Edge defect repair',
      location: 'B1040',
      section: 'M23',
      repairCost: 320,
      status: 'confirmed',
    },
  ],
  totalAmount: 320,
};

export default function InvoiceDetailPage() {
  const { personaId, invoiceId } = useParams<{ personaId: string; invoiceId: string }>();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
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
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(`/persona/${personaId}/chats?tab=invoices`)}
          className="p-2 hover:bg-gray-100 rounded-full -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{invoiceData.id}</h1>
          <p className="text-sm text-gray-600">{invoiceData.contractor.company}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
            invoiceData.status
          )}`}
        >
          {invoiceData.status.charAt(0).toUpperCase() + invoiceData.status.slice(1)}
        </span>
      </header>

      {/* Invoice Summary */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">£{invoiceData.totalAmount}</p>
          </div>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: invoiceData.contractor.color }}
          >
            {invoiceData.contractor.initials}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{invoiceData.jobs.length} jobs</span>
          {invoiceData.submittedDate && <span>Submitted {invoiceData.submittedDate}</span>}
        </div>

        {/* Locked Notice */}
        {invoiceData.locked && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold">Invoice locked</p>
              <p className="text-xs mt-1">
                This invoice has been submitted and cannot be modified. Jobs cannot be added or
                removed.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Jobs List */}
      <main className="p-8 max-w-7xl mx-auto">
        <h2 className="font-bold text-gray-900 mb-3">Jobs Included</h2>
        <div className="space-y-3">
          {invoiceData.jobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-lg p-4 border border-gray-200"
              onClick={() => navigate(`/persona/${personaId}/chats/job/${job.id}`)}
            >
              <div className="flex items-start gap-3">
                {/* Checkmark */}
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{job.defectId}</h3>
                      <p className="text-xs text-gray-500">{job.description}</p>
                    </div>
                    <span className="font-bold text-gray-900">£{job.repairCost}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {job.location} • {job.section}
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anti-Duplication Notice */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900 font-semibold mb-1">
            ✓ Invoice integrity verified
          </p>
          <p className="text-xs text-green-700">
            All jobs in this invoice have been confirmed and cannot be invoiced again. This
            prevents duplicate billing.
          </p>
        </div>
      </main>

      {/* Action Buttons */}
      {invoiceData.status === 'draft' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-4 pb-6">
          <button className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg hover:bg-[#374151]">
            Submit Invoice
          </button>
        </div>
      )}
    </div>
  );
}