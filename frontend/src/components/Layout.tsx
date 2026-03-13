import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { AuthProvider } from '@/contexts/AuthProvider';
import { MedicationProvider } from '@/contexts/MedicamentationProvider';

export function Layout() {
  return (
    <AuthProvider>
      <MedicationProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="w-full">
            <Outlet />
          </main>
        </div>
      </MedicationProvider>
    </AuthProvider>
  );
}