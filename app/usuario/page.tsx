'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/life-system-pages/LoginPage';
import { HomePage } from '@/life-system-pages/HomePage';
import { Module1Profile } from '@/life-system-pages/Module1Profile';
import { Module2DailyLog } from '@/life-system-pages/Module2DailyLog';
import { Module7SocialMedia } from '@/life-system-pages/Module7SocialMedia';
import { Module8TeamOperations } from '@/life-system-pages/Module8TeamOperations';
import { FinancialDashboard } from '@/life-system-pages/FinancialDashboard';
import { CalendarWidget } from '@/components/CalendarWidget';
import { useRouter } from 'next/navigation';

export default function UsuarioPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage onNavigate={setActiveTab} />;
      case 'social-media': return <Module7SocialMedia />;
      case 'team-ops': return <Module8TeamOperations />;
      case 'daily': return <Module2DailyLog />;
      case 'calendar': return <CalendarWidget />;
      case 'financial': return <FinancialDashboard />;
      case 'profile': return <Module1Profile />;
      default: return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onBackToWeb={() => { window.location.href = 'https://katzert.github.io/templefit/'; }}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
