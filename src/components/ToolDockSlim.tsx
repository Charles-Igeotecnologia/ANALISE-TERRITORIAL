import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { FlyoutTab } from '../types';
import { 
  Menu, 
  Map as MapIcon, 
  Columns, 
  PieChart, 
  FileCheck2,
  Maximize2,
  RotateCcw
} from 'lucide-react';

export const ToolDockSlim: React.FC = () => {
  const { activeFlyout, toggleFlyout, setSelectedFeature } = useAppStore();

  const dockItems: { id: FlyoutTab; label: string; icon: React.ReactNode }[] = [
    { id: 'layers', label: 'Camadas e Legenda (☰)', icon: <Menu className="w-5 h-5" /> },
    { id: 'basemaps', label: 'Mapa de Fundo (🗺)', icon: <MapIcon className="w-5 h-5" /> },
    { id: 'comparison', label: 'Comparador P15 × P16 (⧉)', icon: <Columns className="w-5 h-5" /> },
    { id: 'analysis', label: 'Análise de Sobreposição (◎)', icon: <PieChart className="w-5 h-5" /> },
    { id: 'evidence', label: 'Evidência Documental (◇)', icon: <FileCheck2 className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-14 bg-[#07131F] border-r border-[#203B4D] flex flex-col items-center py-3 justify-between z-20 select-none h-full shadow-2xl">
      {/* Grupo Principal de Ícones */}
      <div className="flex flex-col space-y-2 w-full px-2">
        {dockItems.map((item) => {
          const isActive = activeFlyout === item.id;
          return (
            <button
              key={item.id}
              onClick={() => toggleFlyout(item.id)}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative group ${
                isActive
                  ? 'bg-[#20A4F3] text-[#07131F] shadow-lg shadow-[#20A4F3]/30 font-bold'
                  : 'text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#0C1D2B]'
              }`}
            >
              {item.icon}

              {/* Indicador Ativo Lateral */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#20A4F3] rounded-r" />
              )}

              {/* Tooltip Hover */}
              <div className="absolute left-14 bg-[#0C1D2B] text-[#F3F7FA] text-xs px-2.5 py-1.5 rounded-md border border-[#203B4D] shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Botões Utilitários Inferiores */}
      <div className="flex flex-col space-y-2 w-full px-2 pt-4 border-t border-[#203B4D]">
        <button
          onClick={() => setSelectedFeature(null)}
          title="Limpar Seleção"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#0C1D2B] transition group relative"
        >
          <RotateCcw className="w-4 h-4" />
          <div className="absolute left-14 bg-[#0C1D2B] text-[#F3F7FA] text-xs px-2.5 py-1.5 rounded-md border border-[#203B4D] shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            Resetar Seleção
          </div>
        </button>

        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
          title="Tela Cheia"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#0C1D2B] transition group relative"
        >
          <Maximize2 className="w-4 h-4" />
          <div className="absolute left-14 bg-[#0C1D2B] text-[#F3F7FA] text-xs px-2.5 py-1.5 rounded-md border border-[#203B4D] shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            Tela Cheia
          </div>
        </button>
      </div>
    </aside>
  );
};
