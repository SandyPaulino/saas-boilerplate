import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/register', { email, password, tenant_id: parseInt(tenantId) });
      navigate('/verify-email');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tenant ID</label>
            <input
              type="number"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Use tenant ID 1 for demo</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
