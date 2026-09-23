import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { 
  FileText, 
  MapPin, 
  FileCheck2, 
  Columns, 
  PieChart, 
  ExternalLink,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

export const FeatureInspector: React.FC = () => {
  const { 
    selectedFeature, 
    setSelectedFeature, 
    setIsEvidenceModalOpen,
    setIsReportModalOpen,
    setActiveFlyout,
    setComparisonMode
  } = useAppStore();

  return (
    <aside className="w-80 lg:w-96 bg-[#07131F] border-l border-[#203B4D] flex flex-col z-20 shadow-2xl select-none h-full overflow-hidden">
      {/* Header do Painel Contextual */}
      <div className="h-12 px-4 border-b border-[#203B4D] flex items-center justify-between bg-[#0C1D2B]">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#20A4F3]" />
          <h2 className="font-bold text-xs text-[#F3F7FA] uppercase tracking-wider font-mono">
            Contexto Territorial
          </h2>
        </div>

        {selectedFeature && (
          <button
            onClick={() => setSelectedFeature(null)}
            className="text-[#9EB3C1] hover:text-[#F3F7FA] p-1 rounded hover:bg-[#122A3A] transition"
            title="Fechar Inspeção"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* CORPO DO PAINEL POR REVELAÇÃO PROGRESSIVA */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-5 text-xs">

        {/* ESTADO NEUTRO (SEM SELEÇÃO) */}
        {!selectedFeature ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-4 space-y-4 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#0C1D2B] border border-[#203B4D] flex items-center justify-center shadow-inner">
              <MapPin className="w-6 h-6 text-[#20A4F3] animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#F3F7FA]">Explore o Território</h3>
              <p className="text-[#9EB3C1] text-xs leading-relaxed max-w-xs">
                Selecione qualquer imóvel ou poligonal vetorial no mapa para consultar sua origem, geometria, métricas e cadeia de evidência documental.
              </p>
            </div>

            {/* Quadro de Resumo Rápido */}
            <div className="w-full bg-[#0C1D2B] p-3 rounded-lg border border-[#203B4D] text-left space-y-2 mt-4">
              <div className="text-[10px] font-bold text-[#9EB3C1] uppercase tracking-wider">Síntese Cartográfica</div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9EB3C1]">Página 15 (Cosme):</span>
                <span className="font-mono text-[#20A4F3] font-semibold">730,76 ha</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9EB3C1]">Página 16 (José):</span>
                <span className="font-mono text-[#39C6B4] font-semibold">2,63 ha</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9EB3C1]">Conflito União (P15):</span>
                <span className="font-mono text-[#E85D5D] font-bold">52,62%</span>
              </div>
            </div>
          </div>
        ) : (
          /* ESTADO SELECIONADO (FEIÇÃO CLICADA) */
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Bloco de Identificação */}
            <div className="bg-[#0C1D2B] p-3.5 rounded-lg border border-[#203B4D] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-[#20A4F3]">
                  {selectedFeature.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold font-mono bg-[#122A3A] text-[#39C6B4] border border-[#203B4D]">
                  Página {selectedFeature.pagina}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#F3F7FA] leading-tight">
                {selectedFeature.nome}
              </h3>
              <p className="text-[11px] text-[#9EB3C1]">
                {selectedFeature.tipo}
              </p>
            </div>

            {/* Métricas de Área e Perímetro */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div className="bg-[#0C1D2B] p-3 rounded-lg border border-[#203B4D]">
                <div className="text-[10px] text-[#9EB3C1] uppercase font-sans">Área Reconstituída</div>
                <div className="text-sm font-bold text-[#F3F7FA] mt-0.5">
                  {selectedFeature.areaHa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ha
                </div>
                <div className="text-[10px] text-[#9EB3C1] mt-0.5">
                  {selectedFeature.areaM2.toLocaleString('pt-BR')} m²
                </div>
              </div>

              <div className="bg-[#0C1D2B] p-3 rounded-lg border border-[#203B4D]">
                <div className="text-[10px] text-[#9EB3C1] uppercase font-sans">Perímetro</div>
                <div className="text-sm font-bold text-[#39C6B4] mt-0.5">
                  {selectedFeature.perimetroM.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} m
                </div>
                <div className="text-[10px] text-[#9EB3C1] mt-0.5">EPSG: 31981</div>
              </div>
            </div>

            {/* Bloco de Sobreposição / Conflito */}
            {selectedFeature.overlapPercentage !== undefined && (
              <div className="bg-[#122A3A] p-3.5 rounded-lg border border-[#203B4D] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#F3F7FA] flex items-center space-x-1.5">
                    <PieChart className="w-3.5 h-3.5 text-[#E85D5D]" />
                    <span>Sobreposição Territorial</span>
                  </span>
                  <span className="font-mono font-bold text-xs bg-[#E85D5D]/20 text-[#E85D5D] px-2 py-0.5 rounded border border-[#E85D5D]/40">
                    {selectedFeature.overlapPercentage}%
                  </span>
                </div>
                <div className="w-full bg-[#07131F] h-2 rounded-full overflow-hidden border border-[#203B4D]">
                  <div 
                    className="bg-gradient-to-r from-[#F2A93B] to-[#E85D5D] h-full transition-all duration-500" 
                    style={{ width: `${selectedFeature.overlapPercentage}%` }} 
                  />
                </div>
                <p className="text-[11px] text-[#9EB3C1] leading-relaxed">
                  Interseção de <strong className="text-[#F3F7FA] font-mono">{selectedFeature.overlapAreaHa?.toFixed(2)} ha</strong> sobreposta à classe <strong className="text-[#20A4F3]">{selectedFeature.overlapWithClass}</strong>.
                </p>
              </div>
            )}

            {/* CADEIA DE EVIDÊNCIA DOCUMENTAL */}
            <div className="bg-[#0C1D2B] p-3.5 rounded-lg border border-[#203B4D] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#203B4D] pb-1.5">
                <span className="font-bold text-[11px] text-[#F3F7FA] uppercase tracking-wider flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#39C6B4]" />
                  <span>Cadeia de Evidência Documental</span>
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center space-x-2 text-[#9EB3C1]">
                  <span className="text-[#20A4F3]">1. Documento:</span>
                  <span className="text-[#F3F7FA]">{selectedFeature.evidence.documento}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#9EB3C1]">
                  <span className="text-[#20A4F3]">2. Página / Folha:</span>
                  <span className="text-[#F3F7FA]">Pag {selectedFeature.evidence.pagina} (Folha {selectedFeature.evidence.folhaProcesso || '108'})</span>
                </div>
                <div className="flex items-center space-x-2 text-[#9EB3C1]">
                  <span className="text-[#20A4F3]">3. Método:</span>
                  <span className="text-[#F3F7FA]">{selectedFeature.evidence.metodo}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#9EB3C1]">
                  <span className="text-[#20A4F3]">4. Controles Grade:</span>
                  <span className="text-[#39C6B4] font-bold">{selectedFeature.evidence.pontosControle || 10} Pontos (RMS {selectedFeature.evidence.rmsMetros || 0.68}m)</span>
                </div>
              </div>
            </div>

            {/* BOTÕES DE AÇÃO RÁPIDA */}
            <div className="space-y-2 pt-1">
              <a
                href={selectedFeature.pagina === 16 ? "https://www.google.com/maps/@-3.058,-59.960,17z/data=!3m1!1e3" : "https://www.google.com/maps/@-3.090,-59.925,17z/data=!3m1!1e3"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-[#122A3A] hover:bg-[#203B4D] text-[#39C6B4] border border-[#203B4D] rounded-md font-medium text-xs transition flex items-center justify-between group"
              >
                <span className="flex items-center space-x-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#39C6B4]" />
                  <span>[ Abrir no Google Maps Satélite ]</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </a>

              <button
                onClick={() => setIsEvidenceModalOpen(true)}
                className="w-full py-2 px-3 bg-[#122A3A] hover:bg-[#203B4D] text-[#20A4F3] border border-[#203B4D] rounded-md font-medium text-xs transition flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>[ Ver Documento e Fonte ]</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setComparisonMode('swipe');
                  setActiveFlyout('comparison');
                }}
                className="w-full py-2 px-3 bg-[#122A3A] hover:bg-[#203B4D] text-[#39C6B4] border border-[#203B4D] rounded-md font-medium text-xs transition flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <Columns className="w-3.5 h-3.5" />
                  <span>[ Comparar P15 / P16 ]</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveFlyout('layers')}
                className="w-full py-2 px-3 bg-[#122A3A] hover:bg-[#203B4D] text-[#F2A93B] border border-[#203B4D] rounded-md font-medium text-xs transition flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <PieChart className="w-3.5 h-3.5" />
                  <span>[ Ver Interseções e Camadas ]</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2 px-3 bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] font-bold rounded-md text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-[#20A4F3]/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>[ Gerar Síntese Técnica ]</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
