'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const ModuleLoading = () => (
  <div className="p-8 flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-temple-gold border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-bold text-temple-gold uppercase tracking-widest">Cargando módulo...</span>
    </div>
  </div>
);

const LoginPage = dynamic(() => import('@/life-system-pages/LoginPage').then(m => m.LoginPage), {
  loading: ModuleLoading,
  ssr: false
});

const HubCentroDeMando = dynamic(() => import('@/life-system-pages/HubCentroDeMando').then(m => m.HubCentroDeMando), {
  loading: ModuleLoading,
  ssr: false
});

const Module18Directory = dynamic(() => import('@/life-system-pages/Module18Directory').then(m => m.Module18Directory), {
  loading: ModuleLoading,
  ssr: false
});

const Module1Profile = dynamic(() => import('@/life-system-pages/Module1Profile').then(m => m.Module1Profile), {
  loading: ModuleLoading,
  ssr: false
});

const HubPipeline = dynamic(() => import('@/life-system-pages/HubPipeline').then(m => m.HubPipeline), {
  loading: ModuleLoading,
  ssr: false
});

const HubArmeria = dynamic(() => import('@/life-system-pages/HubArmeria').then(m => m.HubArmeria), {
  loading: ModuleLoading,
  ssr: false
});

const HubFinances = dynamic(() => import('@/life-system-pages/HubFinances').then(m => m.HubFinances), {
  loading: ModuleLoading,
  ssr: false
});

export default function UsuarioPage() {
  const { isAuthenticated, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      // 1. Hub Centro de Mando
      case 'home': 
        return <HubCentroDeMando onNavigate={setActiveTab} defaultSubTab="home" />;
      case 'daily': 
        return <HubCentroDeMando onNavigate={setActiveTab} defaultSubTab="daily" />;
      case 'sops': 
        return <HubCentroDeMando onNavigate={setActiveTab} defaultSubTab="sops" />;
      case 'content': 
        return <HubCentroDeMando onNavigate={setActiveTab} defaultSubTab="content" />;
      
      // 2. Hub Atletas & Fichas
      case 'directory': 
        return hasRole('instructor') ? <Module18Directory onNavigate={setActiveTab} /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      case 'profile':
      case 'team-ops': 
        return <Module1Profile onNavigate={setActiveTab} />;
      
      // 3. Hub Embudo Comercial
      case 'pipeline':
      case 'leads-pipeline': 
        return hasRole('admin') ? <HubPipeline onNavigate={setActiveTab} defaultSubTab="leads" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      case 'sales-pipeline': 
        return hasRole('admin') ? <HubPipeline onNavigate={setActiveTab} defaultSubTab="phases" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      
      // 4. Hub Armería & Snack Bar
      case 'armeria':
      case 'recipes': 
        return hasRole('admin') ? <HubArmeria defaultSubTab="recipes" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      case 'inventory': 
      case 'showcase': 
        return hasRole('admin') ? <HubArmeria defaultSubTab="inventory" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      
      // 5. Hub Finanzas & Corte 50/50
      case 'finance':
      case 'finance-ledger':
      case 'financial': 
        return hasRole('admin') ? <HubFinances defaultSubTab="ledger" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      case 'corte-ejecutivo': 
        return hasRole('admin') ? <HubFinances defaultSubTab="corte" /> : <HubCentroDeMando onNavigate={setActiveTab} />;
      
      default: 
        return <HubCentroDeMando onNavigate={setActiveTab} />;
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
