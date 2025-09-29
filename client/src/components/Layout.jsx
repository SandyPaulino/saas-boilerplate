import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Layout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
