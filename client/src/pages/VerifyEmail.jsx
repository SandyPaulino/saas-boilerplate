import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function VerifyEmail() {
  const [message, setMessage] = useState('Verifying your email...');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      api.get(`/auth/verify/${token}`)
        .then(response => {
          setMessage(response.data.message);
          setLoading(false);
          setTimeout(() => navigate('/login'), 3000);
        })
        .catch(err => {
          setMessage(err.response?.data?.message || 'Verification failed');
          setLoading(false);
        });
    } else {
      setMessage('Please check your email for the verification link.');
      setLoading(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Email Verification</h2>
        <div className="text-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Verifying...</span>
            </div>
          ) : (
            <p className="text-gray-700">{message}</p>
          )}
        </div>
        {!loading && message.includes('successfully') && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Redirecting to login page...
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
