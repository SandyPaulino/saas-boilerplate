import { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    features: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse] = await Promise.all([
          api.get('/users')
        ]);
        
        const users = usersResponse.data;
        setStats({
          totalUsers: users.length,
          verifiedUsers: users.filter(user => user.verified).length,
          features: 0 // This would come from a features endpoint
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700">Verified Users</h3>
          <p className="text-3xl font-bold text-green-600">{stats.verifiedUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700">Features</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.features}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome to your SaaS Dashboard</h2>
        <p className="text-gray-600">
          This is your main dashboard where you can manage users, settings, and monitor your application.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
