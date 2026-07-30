'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/life-system-pages/LoginPage';
import { HomePage } from '@/life-system-pages/HomePage';
import { Module1Profile } from '@/life-system-pages/Module1Profile';
import { Module2DailyLog } from '@/life-system-pages/Module2DailyLog';
import { Module12LeadsPipeline } from '@/life-system-pages/Module12LeadsPipeline';
import { Module13FinanceLedger } from '@/life-system-pages/Module13FinanceLedger';
import { Module18Directory } from '@/life-system-pages/Module18Directory';
import { Module19SOPs } from '@/life-system-pages/Module19SOPs';
import { Module14Showcase } from '@/life-system-pages/Module14Showcase';
import { Module14Inventory } from '@/life-system-pages/Module14Inventory';
import { Module20Recipes } from '@/life-system-pages/Module20Recipes';
import { Module30SalesPipeline } from '@/life-system-pages/Module30SalesPipeline';
import { Module40CorteEjecutivo } from '@/life-system-pages/Module40CorteEjecutivo';

export default function UsuarioPage() {
  const { isAuthenticated, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      // Centro de Mando
      case 'home': return <HomePage onNavigate={setActiveTab} />;
      case 'daily': return <Module2DailyLog />;
      case 'sops': return hasRole('admin') ? <Module19SOPs /> : <HomePage onNavigate={setActiveTab} />;
      case 'corte-ejecutivo': return hasRole('admin') ? <Module40CorteEjecutivo /> : <HomePage onNavigate={setActiveTab} />;
      
      // Atletas
      case 'directory': return hasRole('instructor') ? <Module18Directory onNavigate={setActiveTab} /> : <HomePage onNavigate={setActiveTab} />;
      case 'profile': return <Module1Profile />;
      
      // Negocio / Finanzas
      case 'sales-pipeline': return hasRole('admin') ? <Module30SalesPipeline /> : <HomePage onNavigate={setActiveTab} />;
      case 'leads-pipeline': return hasRole('admin') ? <Module12LeadsPipeline /> : <HomePage onNavigate={setActiveTab} />;
      case 'finance-ledger': return hasRole('admin') ? <Module13FinanceLedger /> : <HomePage onNavigate={setActiveTab} />;
      case 'showcase': return hasRole('admin') ? <Module14Showcase /> : <HomePage onNavigate={setActiveTab} />;
      case 'inventory': return hasRole('admin') ? <Module14Inventory /> : <HomePage onNavigate={setActiveTab} />;
      case 'recipes': return hasRole('admin') ? <Module20Recipes /> : <HomePage onNavigate={setActiveTab} />;
      
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
