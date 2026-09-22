import React from 'react';
import { Header } from './components/Header';
import { ToolDockSlim } from './components/ToolDockSlim';
import { FlyoutDrawer } from './components/FlyoutDrawer';
import { MapWorkspace } from './map/MapWorkspace';
import { FeatureInspector } from './components/FeatureInspector';
import { StatusBar } from './components/StatusBar';
import { AskTerritory } from './components/AskTerritory';
import { ReportModal } from './components/ReportModal';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#07131F] text-[#F3F7FA] font-sans">
      {/* 1. Barra Superior (Header) */}
      <Header />

      {/* 2. Área Central de Mapa e Painéis Contextuais */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Dock Lateral Minimalista de Ícones (Left Icon Rail) */}
        <ToolDockSlim />

        {/* Gaveta Flutuante de Ferramentas (Flyout Drawer) */}
        <FlyoutDrawer />

        {/* Workspace Cartográfico Principal (O Território é o Protagonista: 75% - 85%) */}
        <main className="flex-1 h-full relative overflow-hidden">
          <MapWorkspace />
        </main>

        {/* Painel Contextual Direito (Revelação Progressiva) */}
        <FeatureInspector />
      </div>

      {/* 3. Barra de Status Inferior (UTM 21S / Escala / CRS) */}
      <StatusBar />

      {/* 4. Modais Interativos */}
      <AskTerritory />
      <ReportModal />
    </div>
  );
};

export default App;
