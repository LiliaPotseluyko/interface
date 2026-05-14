import { useRouteError, useNavigate } from 'react-router';
import { Home, AlertCircle } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          {error?.statusText || error?.message || 'Something went wrong'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#374151] transition-colors"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>
      </div>
    </div>
  );
}
