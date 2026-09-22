import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Compass, Sparkles, MapPin, Layers, FileText, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePageFocus, 
    setActivePageFocus, 
    setIsAskTerritoryOpen,
    setIsReportModalOpen,
    setActiveModule
  } = useAppStore();

  return (
    <header className="h-14 bg-[#07131F] border-b border-[#203B4D] flex items-center justify-between px-4 z-30 select-none">
      {/* Título e Identidade */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20A4F3] to-[#39C6B4] p-0.5 flex items-center justify-center shadow-lg shadow-[#20A4F3]/20">
          <div className="w-full h-full bg-[#07131F] rounded-[7px] flex items-center justify-center">
            <Compass className="w-4 h-4 text-[#20A4F3]" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-sm tracking-wide text-[#F3F7FA] uppercase font-mono">
              Território Digital
            </h1>
            <span className="text-[10px] bg-[#122A3A] text-[#20A4F3] px-2 py-0.5 rounded border border-[#203B4D] font-mono font-semibold">
              SECT · P15 / P16
            </span>
          </div>
          <p className="text-[11px] text-[#9EB3C1] flex items-center space-x-1 font-sans">
            <span>Reconstituição Cartográfica e Inteligência Territorial</span>
          </p>
        </div>
      </div>

      {/* Navegação por Módulos / Abas */}
      <div className="hidden md:flex items-center space-x-1 bg-[#0C1D2B] p-1 rounded-lg border border-[#203B4D] text-xs font-medium">
        <button
          onClick={() => { setActivePageFocus('all'); setActiveModule('cartografia'); }}
          className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
            activePageFocus === 'all' 
              ? 'bg-[#122A3A] text-[#20A4F3] font-semibold border border-[#203B4D] shadow' 
              : 'text-[#9EB3C1] hover:text-[#F3F7FA]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Visão Geral</span>
        </button>

        <button
          onClick={() => { setActivePageFocus(15); setActiveModule('cartografia'); }}
          className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
            activePageFocus === 15 
              ? 'bg-[#122A3A] text-[#20A4F3] font-semibold border border-[#203B4D] shadow' 
              : 'text-[#9EB3C1] hover:text-[#F3F7FA]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#20A4F3]" />
          <span>Página 15 (Cosme Ferreira)</span>
        </button>

        <button
          onClick={() => { setActivePageFocus(16); setActiveModule('cartografia'); }}
          className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
            activePageFocus === 16 
              ? 'bg-[#122A3A] text-[#39C6B4] font-semibold border border-[#203B4D] shadow' 
              : 'text-[#9EB3C1] hover:text-[#F3F7FA]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[#39C6B4]" />
          <span>Página 16 (José Afonso)</span>
        </button>
      </div>

      {/* Ações Direitas & Status CRS */}
      <div className="flex items-center space-x-3">
        {/* Status CRS Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-[#0C1D2B] px-3 py-1 rounded-md border border-[#203B4D] text-xs font-mono">
          <span className="text-[#9EB3C1]">CRS:</span>
          <span className="text-[#39C6B4] font-semibold">EPSG:31981</span>
          <span className="flex items-center space-x-1 text-[#46C37B] text-[10px] ml-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>OK</span>
          </span>
        </div>

        {/* Botão Pergunte ao Território */}
        <button
          onClick={() => setIsAskTerritoryOpen(true)}
          className="px-3 py-1.5 bg-gradient-to-r from-[#20A4F3]/20 to-[#39C6B4]/20 hover:from-[#20A4F3]/30 hover:to-[#39C6B4]/30 text-[#20A4F3] border border-[#20A4F3]/40 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#39C6B4]" />
          <span>✦ Pergunte ao Território</span>
        </button>

        {/* Botão Gerar Síntese PDF */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-3 py-1.5 bg-[#122A3A] hover:bg-[#203B4D] text-[#F3F7FA] border border-[#203B4D] rounded-lg text-xs font-medium transition flex items-center space-x-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-[#20A4F3]" />
          <span className="hidden sm:inline">Relatório</span>
        </button>
      </div>
    </header>
  );
};
