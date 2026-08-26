'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginPage } from '@/life-system-pages/LoginPage';
import { HubCentroDeMando } from '@/life-system-pages/HubCentroDeMando';
import { Module18Directory } from '@/life-system-pages/Module18Directory';
import { Module1Profile } from '@/life-system-pages/Module1Profile';
import { HubPipeline } from '@/life-system-pages/HubPipeline';
import { HubArmeria } from '@/life-system-pages/HubArmeria';
import { HubFinances } from '@/life-system-pages/HubFinances';

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
