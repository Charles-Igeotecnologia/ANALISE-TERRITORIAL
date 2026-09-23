import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { X, Layers, Map as MapIcon, Sliders, Eye, EyeOff, Columns, PieChart, FileCheck2 } from 'lucide-react';

export const FlyoutDrawer: React.FC = () => {
  const { 
    activeFlyout, 
    setActiveFlyout, 
    layers, 
    toggleLayerVisibility, 
    setLayerOpacity,
    setSelectedFeature,
    activeBasemap,
    setActiveBasemap,
    comparisonMode,
    setComparisonMode,
    p15Opacity,
    setP15Opacity,
    p16Opacity,
    setP16Opacity
  } = useAppStore();

  const handleSelectLayer = (layer: any) => {
    const areaM2 = layer.id.includes('cosme') ? 7307637 : layer.id.includes('jose') ? 26335 : 125430;
    const areaHa = areaM2 / 10000;
    const perimetroM = Math.round(Math.sqrt(areaM2) * 4);

    setSelectedFeature({
      id: layer.id.toUpperCase(),
      nome: layer.name,
      pagina: layer.pagina || 15,
      tipo: 'Camada Reconstituída SECT',
      areaM2: areaM2,
      areaHa: areaHa,
      perimetroM: perimetroM,
      properties: { nome: layer.name, id: layer.id },
      evidence: {
        documento: 'Resposta SECT_autos.pdf',
        pagina: layer.pagina || 15,
        folhaProcesso: layer.pagina === 16 ? 109 : 108,
        escala: layer.pagina === 16 ? '1:2.000' : '1:15.000',
        metodo: 'Georreferenciamento e Vetorização Afim',
        pontosControle: layer.pagina === 16 ? 8 : 10,
        rmsMetros: layer.pagina === 16 ? 0.12 : 0.68,
      },
    });
  };

  if (activeFlyout === 'none') return null;

  return (
    <div className="absolute left-14 top-0 bottom-0 w-80 bg-[#0C1D2B]/95 backdrop-blur-md border-r border-[#203B4D] z-20 flex flex-col shadow-2xl transition-all duration-300 animate-in slide-in-from-left">
      {/* Header da Gaveta */}
      <div className="h-12 px-4 border-b border-[#203B4D] flex items-center justify-between bg-[#07131F]/50">
        <h2 className="font-semibold text-xs text-[#F3F7FA] uppercase tracking-wider flex items-center space-x-2">
          {activeFlyout === 'layers' && <><Layers className="w-4 h-4 text-[#20A4F3]" /><span>Gerenciador de Camadas</span></>}
          {activeFlyout === 'basemaps' && <><MapIcon className="w-4 h-4 text-[#39C6B4]" /><span>Mapa de Fundo (Basemap)</span></>}
          {activeFlyout === 'comparison' && <><Columns className="w-4 h-4 text-[#F2A93B]" /><span>Comparador P15 × P16</span></>}
          {activeFlyout === 'analysis' && <><PieChart className="w-4 h-4 text-[#E85D5D]" /><span>Análise Espacial</span></>}
          {activeFlyout === 'evidence' && <><FileCheck2 className="w-4 h-4 text-[#46C37B]" /><span>Procedência Documental</span></>}
        </h2>
        <button
          onClick={() => setActiveFlyout('none')}
          className="w-6 h-6 rounded flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#122A3A] transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Conteúdo da Gaveta por Tab */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs custom-scrollbar">

        {/* CAMADAS (LAYERS) */}
        {activeFlyout === 'layers' && (
          <div className="space-y-4">
            {/* Grupo Página 15 */}
            <div>
              <div className="font-bold text-[#F3F7FA] text-[11px] uppercase tracking-wider mb-2 flex items-center justify-between border-b border-[#203B4D] pb-1">
                <span className="text-[#20A4F3]">● Página 15 — Cosme Ferreira</span>
                <span className="text-[#9EB3C1] font-mono font-normal">1:15.000</span>
              </div>
              <div className="space-y-2">
                {layers.filter(l => l.pagina === 15).map(layer => (
                  <div key={layer.id} className="bg-[#122A3A]/60 p-2 rounded-lg border border-[#203B4D]/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="flex items-center space-x-2 text-left hover:text-[#20A4F3] transition flex-1 truncate mr-2"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-[#20A4F3] shrink-0" /> : <EyeOff className="w-3.5 h-3.5 text-[#9EB3C1] shrink-0" />}
                        <span className={`font-medium truncate ${layer.visible ? 'text-[#F3F7FA]' : 'text-[#9EB3C1] line-through'}`}>
                          {layer.name}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => handleSelectLayer(layer)}
                          title="Selecionar e Inspecionar"
                          className="px-1.5 py-0.5 bg-[#20A4F3]/20 hover:bg-[#20A4F3]/40 text-[#20A4F3] rounded text-[10px] font-mono font-bold"
                        >
                          Selecionar
                        </button>
                        <span className="w-3 h-3 rounded" style={{ backgroundColor: layer.color }}></span>
                      </div>
                    </div>
                    {layer.visible && (
                      <div className="flex items-center space-x-2 pl-5 pt-1">
                        <Sliders className="w-3 h-3 text-[#9EB3C1]" />
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1" 
                          step="0.05"
                          value={layer.opacity}
                          onChange={(e) => setLayerOpacity(layer.id, parseFloat(e.target.value))}
                          className="w-full h-1 bg-[#07131F] rounded appearance-none cursor-pointer accent-[#20A4F3]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Grupo Página 16 */}
            <div>
              <div className="font-bold text-[#F3F7FA] text-[11px] uppercase tracking-wider mb-2 flex items-center justify-between border-b border-[#203B4D] pb-1">
                <span className="text-[#39C6B4]">● Página 16 — José Afonso</span>
                <span className="text-[#9EB3C1] font-mono font-normal">1:2.000</span>
              </div>
              <div className="space-y-2">
                {layers.filter(l => l.pagina === 16).map(layer => (
                  <div key={layer.id} className="bg-[#122A3A]/60 p-2 rounded-lg border border-[#203B4D]/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => toggleLayerVisibility(layer.id)}
                        className="flex items-center space-x-2 text-left hover:text-[#39C6B4] transition flex-1 truncate mr-2"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-[#39C6B4] shrink-0" /> : <EyeOff className="w-3.5 h-3.5 text-[#9EB3C1] shrink-0" />}
                        <span className={`font-medium truncate ${layer.visible ? 'text-[#F3F7FA]' : 'text-[#9EB3C1] line-through'}`}>
                          {layer.name}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => handleSelectLayer(layer)}
                          title="Selecionar e Inspecionar"
                          className="px-1.5 py-0.5 bg-[#39C6B4]/20 hover:bg-[#39C6B4]/40 text-[#39C6B4] rounded text-[10px] font-mono font-bold"
                        >
                          Selecionar
                        </button>
                        <span className="w-3 h-3 rounded" style={{ backgroundColor: layer.color }}></span>
                      </div>
                    </div>
                    {layer.visible && (
                      <div className="flex items-center space-x-2 pl-5 pt-1">
                        <Sliders className="w-3 h-3 text-[#9EB3C1]" />
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1" 
                          step="0.05"
                          value={layer.opacity}
                          onChange={(e) => setLayerOpacity(layer.id, parseFloat(e.target.value))}
                          className="w-full h-1 bg-[#07131F] rounded appearance-none cursor-pointer accent-[#39C6B4]"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAPA DE FUNDO (BASEMAPS) */}
        {activeFlyout === 'basemaps' && (
          <div className="space-y-3">
            {[
              { id: 'google-hybrid', name: '🗺️ Satélite Híbrido HD (Padrão)', desc: 'Satélite de alta resolução com vias, logradouros e bairros' },
              { id: 'google-satellite', name: '🛰️ Satélite HD Puro (Google)', desc: 'Imagens orbitais limpas de alta definição' },
              { id: 'esri-satellite', name: '🌎 Esri World Imagery (ArcGIS)', desc: 'Imagens orbitais ArcGIS de alta resolução' },
              { id: 'osm', name: '🧭 OpenStreetMap Standard', desc: 'Mapa urbano de ruas e vetorização municipal' },
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setActiveBasemap(b.id as any)}
                className={`w-full p-3 rounded-lg border text-left transition ${
                  activeBasemap === b.id
                    ? 'bg-[#122A3A] border-[#20A4F3] text-[#F3F7FA] font-bold shadow'
                    : 'bg-[#07131F]/50 border-[#203B4D] text-[#9EB3C1] hover:bg-[#122A3A]/40'
                }`}
              >
                <div className="font-semibold text-xs text-[#F3F7FA]">{b.name}</div>
                <div className="text-[11px] text-[#9EB3C1] mt-0.5">{b.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* COMPARADOR P15 x P16 */}
        {activeFlyout === 'comparison' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-semibold text-[#F3F7FA]">Modo de Comparação Cartográfica</label>
              {[
                { id: 'none', label: 'Modo Padrão (Ambas Ativas)' },
                { id: 'swipe', label: 'Swipe Visual (Cortina Cortada)' },
                { id: 'sideBySide', label: 'Lado a Lado (Sincronizado)' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setComparisonMode(m.id as any)}
                  className={`w-full p-2.5 rounded-md border text-left text-xs transition ${
                    comparisonMode === m.id
                      ? 'bg-[#122A3A] border-[#20A4F3] text-[#20A4F3] font-semibold'
                      : 'bg-[#07131F] border-[#203B4D] text-[#9EB3C1]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#203B4D] space-y-3">
              <div>
                <label className="flex items-center justify-between text-[#9EB3C1] mb-1">
                  <span>Opacidade Página 15</span>
                  <span className="font-mono text-[#20A4F3]">{Math.round(p15Opacity * 100)}%</span>
                </label>
                <input 
                  type="range" min="0.1" max="1" step="0.05" value={p15Opacity}
                  onChange={(e) => setP15Opacity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#07131F] rounded appearance-none cursor-pointer accent-[#20A4F3]"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-[#9EB3C1] mb-1">
                  <span>Opacidade Página 16</span>
                  <span className="font-mono text-[#39C6B4]">{Math.round(p16Opacity * 100)}%</span>
                </label>
                <input 
                  type="range" min="0.1" max="1" step="0.05" value={p16Opacity}
                  onChange={(e) => setP16Opacity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#07131F] rounded appearance-none cursor-pointer accent-[#39C6B4]"
                />
              </div>
            </div>
          </div>
        )}

        {/* EVIDÊNCIA DOCUMENTAL */}
        {activeFlyout === 'evidence' && (
          <div className="space-y-3">
            <div className="bg-[#122A3A] p-3 rounded-lg border border-[#203B4D] space-y-2">
              <h3 className="font-bold text-[#F3F7FA]">Auditabilidade do Georreferenciamento</h3>
              <p className="text-[#9EB3C1] text-[11px] leading-relaxed">
                Todas as geometrias vetoriais possuem vínculo direto com os pontos de controle da grade UTM lidos nos cartuchos originais.
              </p>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="bg-[#07131F] p-2.5 rounded border border-[#203B4D] flex justify-between">
                <span className="text-[#9EB3C1]">Página 15 RMS:</span>
                <span className="text-[#39C6B4] font-bold">0,68 m (10 Pontos)</span>
              </div>
              <div className="bg-[#07131F] p-2.5 rounded border border-[#203B4D] flex justify-between">
                <span className="text-[#9EB3C1]">Página 16 RMS:</span>
                <span className="text-[#39C6B4] font-bold">0,12 m (8 Pontos)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
