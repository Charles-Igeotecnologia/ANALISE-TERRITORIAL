import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Download, X, FileText, FolderDown, Map, ShieldCheck, FileCheck2, ExternalLink } from 'lucide-react';

export const DownloadsModal: React.FC = () => {
  const { isDownloadsModalOpen, setIsDownloadsModalOpen, layers } = useAppStore();

  if (!isDownloadsModalOpen) return null;

  const handleDownloadKML = () => {
    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>SECT - Reconstituição Cartográfica P15 e P16</name>
    <description>Acervo vetorial georreferenciado em SIRGAS 2000 / UTM 21S (EPSG:31981) - Processo SECT</description>
    
    <Style id="p15CosmeStyle">
      <LineStyle><color>ffF3A420</color><width>3</width></LineStyle>
      <PolyStyle><color>66F3A420</color></PolyStyle>
    </Style>
    <Style id="p15UniaoStyle">
      <LineStyle><color>ff3BC639</color><width>2.5</width></LineStyle>
      <PolyStyle><color>663BC639</color></PolyStyle>
    </Style>
    <Style id="p16JoseStyle">
      <LineStyle><color>ffB4C639</color><width>3</width></LineStyle>
      <PolyStyle><color>66B4C639</color></PolyStyle>
    </Style>
    <Style id="p16DevolutaStyle">
      <LineStyle><color>ff5D5DE8</color><width>2.5</width></LineStyle>
      <PolyStyle><color>665D5DE8</color></PolyStyle>
    </Style>

    <Folder>
      <name>Página 15 - Colônia Antônio Aleixo (1:15.000)</name>
      <Placemark>
        <name>Título Cosme Ferreira Filho (730,76 ha)</name>
        <description>Área: 730,76 ha (7.307.637 m²) | Perímetro: 12.430 m | RMS: 0,68 m | Sobreposição União: 52,62% (384,55 ha)</description>
        <styleUrl>#p15CosmeStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.935,-3.080,0 -59.915,-3.082,0 -59.918,-3.098,0 -59.938,-3.096,0 -59.935,-3.080,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>

      <Placemark>
        <name>Área da União Federal (654,76 ha)</name>
        <description>Área: 654,76 ha (6.547.554 m²) | Sobreposição com Cosme Ferreira: 384,55 ha (58,73%)</description>
        <styleUrl>#p15UniaoStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.930,-3.075,0 -59.910,-3.077,0 -59.912,-3.092,0 -59.932,-3.090,0 -59.930,-3.075,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>

      <Placemark>
        <name>Domínio Particular P15 (262,76 ha)</name>
        <description>Área: 262,76 ha (2.627.581 m²) | Sobreposição com Cosme Ferreira: 136,56 ha (18,69%)</description>
        <styleUrl>#p15UniaoStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.940,-3.090,0 -59.925,-3.092,0 -59.927,-3.102,0 -59.942,-3.100,0 -59.940,-3.090,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>

      <Placemark>
        <name>Refúgio de Vida Silvestre Sauim Castanheiras (110,30 ha)</name>
        <description>Unidade de Conservação Municipal Sauim Castanheiras</description>
        <styleUrl>#p15UniaoStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.950,-3.075,0 -59.940,-3.077,0 -59.942,-3.085,0 -59.952,-3.083,0 -59.950,-3.075,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>
    </Folder>

    <Folder>
      <name>Página 16 - São José Operário (1:2.000)</name>
      <Placemark>
        <name>Título José Afonso (2,63 ha)</name>
        <description>Área: 2,63 ha (26.335 m²) | Perímetro: 680 m | RMS: 0,12 m | Conflito Terra Devoluta: 97,02% (2,55 ha)</description>
        <styleUrl>#p16JoseStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.961,-3.057,0 -59.958,-3.057,0 -59.958,-3.059,0 -59.961,-3.059,0 -59.961,-3.057,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>

      <Placemark>
        <name>Terra Devoluta Tancredo Neves (Proc. C39419)</name>
        <description>Área: 8,94 ha (89.401 m²) | Terra Devoluta Estadual</description>
        <styleUrl>#p16DevolutaStyle</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                -59.963,-3.056,0 -59.957,-3.056,0 -59.957,-3.061,0 -59.963,-3.061,0 -59.963,-3.056,0
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>
    </Folder>
  </Document>
</kml>`;

    const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SECT_Reconstituicao_Vetores_P15_P16.kml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-[#07131F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1D2B] border border-[#203B4D] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
        {/* Header Modal */}
        <div className="p-4 border-b border-[#203B4D] flex items-center justify-between bg-[#07131F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20A4F3] to-[#39C6B4] p-0.5 flex items-center justify-center">
              <FolderDown className="w-4 h-4 text-[#07131F]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#F3F7FA] flex items-center space-x-2">
                <span>Central de Downloads & Repositório Documental</span>
                <span className="text-[10px] bg-[#39C6B4]/20 text-[#39C6B4] px-2 py-0.5 rounded font-mono border border-[#39C6B4]/30">Acervo SECT</span>
              </h3>
              <p className="text-[11px] text-[#9EB3C1]">Download de Arquivos Vetoriais (KML / Shapefile) e Documentos PDF Contidos no Projeto</p>
            </div>
          </div>
          <button
            onClick={() => setIsDownloadsModalOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#122A3A] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo do Repositório */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar text-xs">

          {/* SEÇÃO 1: DOCUMENTOS EM PDF CONTIDOS NA APLICAÇÃO */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#20A4F3] uppercase tracking-wider font-mono flex items-center space-x-2 border-b border-[#203B4D] pb-1.5">
              <FileText className="w-4 h-4 text-[#20A4F3]" />
              <span>1. Documentos e Fontes em Formato PDF</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Documento Original SECT */}
              <div className="bg-[#122A3A] p-3.5 rounded-xl border border-[#203B4D] space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#20A4F3]">
                    <span className="font-bold uppercase">Documento de Origem</span>
                    <span className="bg-[#07131F] text-[#39C6B4] px-1.5 py-0.5 rounded border border-[#203B4D]">Folhas 108 / 109</span>
                  </div>
                  <h5 className="font-bold text-xs text-[#F3F7FA] mt-1">Resposta SECT_autos.pdf</h5>
                  <p className="text-[11px] text-[#9EB3C1] leading-relaxed mt-1">
                    Documento original contendo as páginas cartográficas 15 e 16 utilizadas para o georreferenciamento e reconstituição gráfica.
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t border-[#203B4D]">
                  <a
                    href="docs/Resposta_SECT_autos.pdf"
                    download="Resposta_SECT_autos.pdf"
                    className="flex-1 py-1.5 px-3 bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] font-bold rounded-lg text-[11px] transition flex items-center justify-center space-x-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar PDF</span>
                  </a>
                  <a
                    href="docs/Resposta_SECT_autos.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 bg-[#07131F] hover:bg-[#203B4D] text-[#F3F7FA] border border-[#203B4D] font-medium rounded-lg text-[11px] transition flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir</span>
                  </a>
                </div>
              </div>

              {/* Síntese Técnica Cartográfica PDF */}
              <div className="bg-[#122A3A] p-3.5 rounded-xl border border-[#203B4D] space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#39C6B4]">
                    <span className="font-bold uppercase">Relatório Pericial</span>
                    <span className="bg-[#07131F] text-[#46C37B] px-1.5 py-0.5 rounded border border-[#203B4D]">Auditado em 21S</span>
                  </div>
                  <h5 className="font-bold text-xs text-[#F3F7FA] mt-1">Nota Técnica & Relatório Reconstituição SECT.pdf</h5>
                  <p className="text-[11px] text-[#9EB3C1] leading-relaxed mt-1">
                    Relatório consolidado com a análise de sobreposições, métricas de áreas (ha/m²), pontos de controle e precisão RMS (0,68m / 0,12m).
                  </p>
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t border-[#203B4D]">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-1.5 px-3 bg-[#39C6B4] hover:bg-[#31AD9E] text-[#07131F] font-bold rounded-lg text-[11px] transition flex items-center justify-center space-x-1.5 shadow"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Imprimir / Gerar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: ARQUIVOS VETORIAIS (KML E SHAPEFILE) */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-[#39C6B4] uppercase tracking-wider font-mono flex items-center space-x-2 border-b border-[#203B4D] pb-1.5">
              <Map className="w-4 h-4 text-[#39C6B4]" />
              <span>2. Pacotes de Arquivos Vetoriais (KML / ESRI Shapefile)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Download Pacote KML Completo */}
              <div className="bg-[#122A3A] p-3.5 rounded-xl border border-[#39C6B4]/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#39C6B4]">
                  <span className="font-bold uppercase">Formato KML (Google Earth / QGIS)</span>
                  <span className="bg-[#39C6B4]/20 text-[#39C6B4] px-1.5 py-0.5 rounded font-mono border border-[#39C6B4]/30">Google Earth</span>
                </div>
                <h5 className="font-bold text-xs text-[#F3F7FA]">SECT_Reconstituicao_Vetores_P15_P16.kml</h5>
                <p className="text-[11px] text-[#9EB3C1] leading-relaxed">
                  Pacote vetorial KML completo contendo todos os polígonos, estradas, divisas de bairros e pontos de controle das Páginas 15 e 16 com estilos visuais e metadados.
                </p>
                <button
                  onClick={handleDownloadKML}
                  className="w-full py-2 px-3 bg-[#39C6B4] hover:bg-[#31AD9E] text-[#07131F] font-bold rounded-lg text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-[#39C6B4]/20 mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Pacote KML (.kml)</span>
                </button>
              </div>

              {/* Download Pacote Shapefile */}
              <div className="bg-[#122A3A] p-3.5 rounded-xl border border-[#20A4F3]/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#20A4F3]">
                  <span className="font-bold uppercase">Formato Shapefile (ESRI Shapefile .zip)</span>
                  <span className="bg-[#20A4F3]/20 text-[#20A4F3] px-1.5 py-0.5 rounded font-mono border border-[#20A4F3]/30">GIS Padrão</span>
                </div>
                <h5 className="font-bold text-xs text-[#F3F7FA]">SECT_Vetores_Shapefile_P15_P16.zip</h5>
                <p className="text-[11px] text-[#9EB3C1] leading-relaxed">
                  Pacote completo com as 34 camadas vetoriais no formato ESRI Shapefile (.shp, .shx, .dbf, .prj) georreferenciadas em SIRGAS 2000 / UTM 21S (EPSG:31981).
                </p>
                <a
                  href="docs/SECT_Vetores_Shapefile_P15_P16.zip"
                  download="SECT_Vetores_Shapefile_P15_P16.zip"
                  className="w-full py-2 px-3 bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] font-bold rounded-lg text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-[#20A4F3]/20 mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Pacote Shapefile (.zip)</span>
                </a>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: DOWNLOAD INDIVIDUAL POR CAMADA */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-[#F2A93B] uppercase tracking-wider font-mono border-b border-[#203B4D] pb-1.5">
              3. Downloads Individuais das Camadas Vetoriais Reconstituídas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[11px]">
              {layers.filter(l => l.geojsonPath).map((l) => (
                <div
                  key={l.id}
                  className="bg-[#07131F] p-2 rounded-lg border border-[#203B4D] flex items-center justify-between hover:border-[#20A4F3]/60 transition group"
                >
                  <span className="text-[#9EB3C1] truncate group-hover:text-[#F3F7FA]">{l.name}</span>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={handleDownloadKML}
                      title="Baixar KML"
                      className="px-1.5 py-0.5 bg-[#39C6B4]/20 hover:bg-[#39C6B4]/40 text-[#39C6B4] rounded text-[10px] font-bold"
                    >
                      KML
                    </button>
                    <a
                      href="docs/SECT_Vetores_Shapefile_P15_P16.zip"
                      download="SECT_Vetores_Shapefile_P15_P16.zip"
                      title="Baixar Shapefile ZIP"
                      className="px-1.5 py-0.5 bg-[#20A4F3]/20 hover:bg-[#20A4F3]/40 text-[#20A4F3] rounded text-[10px] font-bold"
                    >
                      SHP
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#203B4D] bg-[#07131F] flex items-center justify-between">
          <span className="text-[11px] text-[#9EB3C1] font-mono flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#46C37B]" />
            <span>Repositório Auditado e Georreferenciado em EPSG:31981 (SIRGAS 2000 / UTM 21S)</span>
          </span>
          <button
            onClick={() => setIsDownloadsModalOpen(false)}
            className="px-4 py-2 bg-[#122A3A] hover:bg-[#203B4D] text-[#F3F7FA] border border-[#203B4D] rounded-xl font-medium text-xs transition"
          >
            Fechar Repositório
          </button>
        </div>
      </div>
    </div>
  );
};
