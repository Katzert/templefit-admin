'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/life-system-pages/LoginPage';
import { HomePage } from '@/life-system-pages/HomePage';
import { Module1Profile } from '@/life-system-pages/Module1Profile';
import { Module2DailyLog } from '@/life-system-pages/Module2DailyLog';
import { Module3HabitTracker } from '@/life-system-pages/Module3HabitTracker';
import { Module4TechnicalSheet } from '@/life-system-pages/Module4TechnicalSheet';
import { Module5Audit } from '@/life-system-pages/Module5Audit';
import { Module6TrainingLog } from '@/life-system-pages/Module6TrainingLog';
import { Module7SocialMedia } from '@/life-system-pages/Module7SocialMedia';
import { Module8TeamOperations } from '@/life-system-pages/Module8TeamOperations';

import { FinancialDashboard } from '@/life-system-pages/FinancialDashboard';
import { AuditLogPage } from '@/life-system-pages/AuditLogPage';
import { SettingsPage } from '@/life-system-pages/SettingsPage';
import { HelpPage } from '@/life-system-pages/HelpPage';

import { useRouter } from 'next/navigation';

export default function UsuarioPage() {
  const { isAuthenticated, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />;
      case 'profile': return <Module1Profile />;
      case 'daily': return <Module2DailyLog />;
      case 'habits': return <Module3HabitTracker />;
      case 'technical': return <Module4TechnicalSheet />;
      case 'audit': return <Module5Audit />;

      case 'training-log': return <Module6TrainingLog />;
      case 'social-media': return hasRole('admin') ? <Module7SocialMedia /> : <AccessDenied />;
      case 'team-ops': return hasRole('instructor') ? <Module8TeamOperations /> : <AccessDenied />;
      case 'financial': return hasRole('admin') ? <FinancialDashboard /> : <AccessDenied />;

      case 'changelog': return hasRole('instructor') ? <AuditLogPage /> : <AccessDenied />;
      case 'settings': return hasRole('admin') ? <SettingsPage /> : <AccessDenied />;
      case 'help': return <HelpPage />;
      default: return <HomePage />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onBackToWeb={() => router.push('/')}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-black text-white uppercase mb-2">Acceso Restringido</h2>
      <p className="text-sm text-gray-400 max-w-md">
        No tienes los permisos necesarios para ver esta sección. Contacta a tu administrador.
      </p>
    </div>
  );
}
