import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { FileText, Download, X, ShieldCheck, Printer } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen } = useAppStore();

  if (!isReportModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#07131F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1D2B] border border-[#203B4D] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header Modal */}
        <div className="p-4 border-b border-[#203B4D] flex items-center justify-between bg-[#07131F]">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-[#20A4F3]" />
            <div>
              <h3 className="font-bold text-sm text-[#F3F7FA]">Relatório e Síntese Técnica Cartográfica</h3>
              <p className="text-[11px] text-[#9EB3C1]">SIRGAS 2000 / UTM Fuso 21S (EPSG:31981) • Processo SECT</p>
            </div>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#122A3A] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo do Relatório */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar text-xs font-sans text-[#F3F7FA]">
          {/* Ficha Técnica */}
          <div className="bg-[#122A3A] p-4 rounded-xl border border-[#203B4D] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#20A4F3] uppercase">Relatório Pericial #2026-SECT-21S</span>
              <span className="flex items-center space-x-1 text-[#46C37B] text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Validado em 21S</span>
              </span>
            </div>
            <p className="text-[#9EB3C1] leading-relaxed">
              Síntese da reconstituição vetorial gráfica realizada sobre as Páginas 15 e 16 do documento <strong className="text-[#F3F7FA]">Resposta SECT_autos.pdf</strong> (folhas físicas 108 e 109).
            </p>
          </div>

          {/* Quadro Resumo Página 15 */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-[#20A4F3] uppercase font-mono tracking-wider flex items-center justify-between">
              <span>Página 15 — Colônia Antônio Aleixo (1:15.000)</span>
              <span className="text-[#9EB3C1]">RMS: 0,68 m</span>
            </h4>
            <div className="overflow-x-auto border border-[#203B4D] rounded-xl bg-[#07131F]">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#122A3A] text-[#9EB3C1] uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Classe / Polígono</th>
                    <th className="p-2.5 text-right">Área (ha)</th>
                    <th className="p-2.5 text-right">Sobreposição (ha)</th>
                    <th className="p-2.5 text-right">% Conflito</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#203B4D] text-[#F3F7FA] font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-[#20A4F3]">Título Cosme Ferreira Filho</td>
                    <td className="p-2.5 text-right font-bold">730,76</td>
                    <td className="p-2.5 text-right text-[#9EB3C1]">—</td>
                    <td className="p-2.5 text-right text-[#9EB3C1]">—</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans">União Federal (Matrícula)</td>
                    <td className="p-2.5 text-right">654,76</td>
                    <td className="p-2.5 text-right text-[#E85D5D]">384,55</td>
                    <td className="p-2.5 text-right font-bold text-[#E85D5D]">52,62%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans">Domínio Particular</td>
                    <td className="p-2.5 text-right">262,76</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">136,56</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">18,69%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans">AEIS Mauazinho</td>
                    <td className="p-2.5 text-right">254,36</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">128,93</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">17,64%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quadro Resumo Página 16 */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-[#39C6B4] uppercase font-mono tracking-wider flex items-center justify-between">
              <span>Página 16 — São José Operário (1:2.000)</span>
              <span className="text-[#9EB3C1]">RMS: 0,12 m</span>
            </h4>
            <div className="overflow-x-auto border border-[#203B4D] rounded-xl bg-[#07131F]">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#122A3A] text-[#9EB3C1] uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Classe / Polígono</th>
                    <th className="p-2.5 text-right">Área (ha)</th>
                    <th className="p-2.5 text-right">Sobreposição (ha)</th>
                    <th className="p-2.5 text-right">% Conflito</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#203B4D] text-[#F3F7FA] font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-[#39C6B4]">Título José Afonso</td>
                    <td className="p-2.5 text-right font-bold">2,63</td>
                    <td className="p-2.5 text-right text-[#9EB3C1]">—</td>
                    <td className="p-2.5 text-right text-[#9EB3C1]">—</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans">Terra Devoluta (Proc. C39419)</td>
                    <td className="p-2.5 text-right">8,94</td>
                    <td className="p-2.5 text-right text-[#E85D5D]">2,55</td>
                    <td className="p-2.5 text-right font-bold text-[#E85D5D]">97,02%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans">Matrícula 26.696 Estado</td>
                    <td className="p-2.5 text-right">14,84</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">0,08</td>
                    <td className="p-2.5 text-right text-[#F2A93B]">2,95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer com Ações */}
        <div className="p-4 border-t border-[#203B4D] bg-[#07131F] flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-[#122A3A] hover:bg-[#203B4D] text-[#F3F7FA] border border-[#203B4D] rounded-xl font-medium text-xs transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4 text-[#20A4F3]" />
            <span>Imprimir Síntese</span>
          </button>

          <button
            onClick={() => alert('Baixando pacote GeoJSON definitivo em 21S...')}
            className="px-4 py-2 bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] font-bold rounded-xl text-xs transition flex items-center space-x-1.5 shadow-lg shadow-[#20A4F3]/20"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Dados Vetoriais (.geojson)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
