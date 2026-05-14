import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

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
  repairCost: number;
  selected: boolean;
}

// Mock completed jobs ready to invoice
const readyToInvoiceJobs: Job[] = [
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
    repairCost: 450,
    selected: false,
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
    repairCost: 680,
    selected: false,
  },
];

export default function CreateInvoicePage() {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(readyToInvoiceJobs);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);

  // Group jobs by contractor
  const jobsByContractor = jobs.reduce((acc, job) => {
    if (!acc[job.contractor.company]) {
      acc[job.contractor.company] = [];
    }
    acc[job.contractor.company].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  const toggleJobSelection = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, selected: !job.selected } : job
      )
    );
  };

  const selectedJobs = jobs.filter(job => job.selected);
  const totalAmount = selectedJobs.reduce((sum, job) => sum + job.repairCost, 0);

  const handleCreateInvoice = () => {
    if (selectedJobs.length === 0) return;
    // In a real app, this would create the invoice
    navigate(`/persona/${personaId}/chats?tab=invoices`);
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
        <h1 className="text-xl font-bold text-gray-900">Create Invoice</h1>
      </header>

      {/* Instructions */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-3">
        <p className="text-sm text-blue-900">
          Select completed jobs to include in this invoice. Only confirmed jobs are shown.
        </p>
      </div>

      {/* Jobs List by Contractor */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {Object.entries(jobsByContractor).map(([company, contractorJobs]) => (
            <div key={company}>
              <h2 className="font-bold text-gray-900 mb-3">{company}</h2>
              <div className="space-y-3">
                {contractorJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => toggleJobSelection(job.id)}
                    className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all ${
                      job.selected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          job.selected
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {job.selected && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900">{job.defectId}</h3>
                            <p className="text-xs text-gray-500">{job.description}</p>
                          </div>
                          <span className="font-bold text-blue-600 text-lg">
                            £{job.repairCost}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {job.location} • {job.section}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(jobsByContractor).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No completed jobs available</p>
            <p className="text-sm text-gray-400 mt-2">
              Jobs must be marked as "Confirmed" before they can be invoiced
            </p>
          </div>
        )}
      </main>

      {/* Bottom Summary */}
      {selectedJobs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">
                {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-2xl font-bold text-gray-900">£{totalAmount}</p>
            </div>
            <button
              onClick={handleCreateInvoice}
              className="bg-[#4b5563] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#374151]"
            >
              Create Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}