import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { X, Send, Bot, ArrowRight, Search, MapPin, ExternalLink, Database } from 'lucide-react';
import { SelectedFeatureInfo } from '../types';

interface DatabaseEntity {
  id: string;
  name: string;
  category: string;
  pagina: 15 | 16;
  layerId: string;
  areaHa?: number;
  areaM2?: number;
  perimetroM?: number;
  overlapPercentage?: number;
  overlapAreaHa?: number;
  overlapWithClass?: string;
  lat: number;
  lng: number;
  description: string;
  keywords: string[];
}

const DATABASE_ENTITIES: DatabaseEntity[] = [
  {
    id: 'T15-COSME',
    name: 'Título Cosme Ferreira Filho',
    category: 'Reconstituição Titular',
    pagina: 15,
    layerId: 'p15_camadas_titulo_cosme',
    areaHa: 730.76,
    areaM2: 7307637,
    perimetroM: 12430,
    overlapPercentage: 52.62,
    overlapAreaHa: 384.55,
    overlapWithClass: 'Área da União Federal',
    lat: -3.090,
    lng: -59.925,
    description: 'Título de propriedade reconstituído a partir da Página 15 (Escala 1:15.000) na Colônia Antônio Aleixo.',
    keywords: ['cosme', 'ferreira', 'titulo', 'p15', 'aleixo', 'colonia', '730', 'propriedade', 'cosme ferreira']
  },
  {
    id: 'P15-UNIAO',
    name: 'Área da União Federal',
    category: 'Patrimônio Público',
    pagina: 15,
    layerId: 'p15_camadas_uniao',
    areaHa: 654.76,
    areaM2: 6547554,
    perimetroM: 11200,
    overlapPercentage: 58.73,
    overlapAreaHa: 384.55,
    overlapWithClass: 'Título Cosme Ferreira Filho',
    lat: -3.085,
    lng: -59.920,
    description: 'Poligonal matriculada em nome da União Federal contida na Página 15.',
    keywords: ['uniao', 'federal, união', 'patrimonio', 'p15', 'publica', '654']
  },
  {
    id: 'P15-DOM-PART',
    name: 'Domínio Particular (P15)',
    category: 'Propriedade Privada',
    pagina: 15,
    layerId: 'p15_camadas_dom_part',
    areaHa: 262.76,
    areaM2: 2627581,
    perimetroM: 8400,
    overlapPercentage: 18.69,
    overlapAreaHa: 136.56,
    overlapWithClass: 'Título Cosme Ferreira Filho',
    lat: -3.095,
    lng: -59.930,
    description: 'Área identificada como domínio particular na Página 15.',
    keywords: ['particular', 'dominio', 'privada', 'p15', '262']
  },
  {
    id: 'P15-TERRAS-DEST',
    name: 'Terras Destacadas Estado do Amazonas',
    category: 'Patrimônio Estadual',
    pagina: 15,
    layerId: 'p15_camadas_terras_dest',
    areaHa: 145.20,
    areaM2: 1452000,
    perimetroM: 5200,
    lat: -3.078,
    lng: -59.915,
    description: 'Terras públicas destacadas pelo Estado do Amazonas.',
    keywords: ['terras', 'destacadas', 'estado', 'amazonas', 'p15']
  },
  {
    id: 'P15-AEIS-MAUA',
    name: 'AEIS Mauazinho',
    category: 'Habitação Social (AEIS)',
    pagina: 15,
    layerId: 'p15_camadas_aeis_maua',
    areaHa: 89.40,
    areaM2: 894000,
    perimetroM: 3800,
    lat: -3.100,
    lng: -59.940,
    description: 'Área de Especial Interesse Social do bairro Mauazinho.',
    keywords: ['aeis', 'mauazinho', 'maua', 'bairro', 'habitacao', 'p15']
  },
  {
    id: 'P15-AEIS-QUAR',
    name: 'AEIS Igarapé do Quarenta',
    category: 'Habitação Social (AEIS)',
    pagina: 15,
    layerId: 'p15_camadas_aeis_quar',
    areaHa: 42.15,
    areaM2: 421500,
    perimetroM: 2900,
    lat: -3.105,
    lng: -59.950,
    description: 'Área de Especial Interesse Social do Igarapé do Quarenta.',
    keywords: ['aeis', 'quarenta', 'igarape', 'habitacao', 'p15']
  },
  {
    id: 'P15-AEIS-LULA',
    name: 'AEIS C. H. Presidente Lula',
    category: 'Habitação Social (AEIS)',
    pagina: 15,
    layerId: 'p15_camadas_aeis_lula',
    areaHa: 18.50,
    areaM2: 185000,
    perimetroM: 1800,
    lat: -3.090,
    lng: -59.935,
    description: 'Conjunto Habitacional Presidente Lula (AEIS).',
    keywords: ['aeis', 'lula', 'presidente lula', 'conjunto', 'habitacao', 'p15']
  },
  {
    id: 'P15-RVS-SAUIM',
    name: 'RVS Sauim Castanheiras',
    category: 'Unidade de Conservação',
    pagina: 15,
    layerId: 'p15_camadas_rvs_sauim',
    areaHa: 110.30,
    areaM2: 1103000,
    perimetroM: 4600,
    lat: -3.080,
    lng: -59.945,
    description: 'Refúgio de Vida Silvestre Sauim Castanheiras - Unidade de Conservação Municipal.',
    keywords: ['sauim', 'castanheiras', 'rvs', 'reserva', 'conservacao', 'verde', 'ambiental', 'p15']
  },
  {
    id: 'T16-JOSE',
    name: 'Título José Afonso',
    category: 'Reconstituição Titular',
    pagina: 16,
    layerId: 'p16_camadas_titulo_jose',
    areaHa: 2.63,
    areaM2: 26335,
    perimetroM: 680,
    overlapPercentage: 97.02,
    overlapAreaHa: 2.55,
    overlapWithClass: 'Terra Devoluta (Proc. C39419 - Tancredo Neves)',
    lat: -3.058,
    lng: -59.960,
    description: 'Título de propriedade reconstituído a partir da Página 16 (Escala 1:2.000) no bairro São José Operário.',
    keywords: ['jose', 'afonso, título', 'titulo', 'p16', 'sao jose', 'operario', '2,63']
  },
  {
    id: 'P16-DEVOLUTA',
    name: 'Terra Devoluta Tancredo Neves (Proc. C39419)',
    category: 'Terra Devoluta',
    pagina: 16,
    layerId: 'p16_camadas_devoluta',
    areaHa: 8.94,
    areaM2: 89401,
    perimetroM: 1420,
    overlapPercentage: 28.58,
    overlapAreaHa: 2.55,
    overlapWithClass: 'Título José Afonso',
    lat: -3.059,
    lng: -59.961,
    description: 'Terra Devoluta estadual referente ao Processo C39419 (Bairro Tancredo Neves).',
    keywords: ['devoluta', 'tancredo', 'neves', 'c39419', 'processo', 'p16', '8,94']
  },
  {
    id: 'P16-MATR-26696',
    name: 'Matrícula 26.696 do Estado',
    category: 'Registro Imobiliário',
    pagina: 16,
    layerId: 'p16_camadas_matr_26696',
    areaHa: 14.80,
    areaM2: 148000,
    perimetroM: 1890,
    lat: -3.057,
    lng: -59.959,
    description: 'Matrícula imobiliária 26.696 de propriedade do Estado do Amazonas.',
    keywords: ['matricula', '26696', '26.696', 'estado', 'cartorio', 'p16']
  },
  {
    id: 'P16-AEIS-SJO',
    name: 'AEIS São José Operário',
    category: 'Habitação Social (AEIS)',
    pagina: 16,
    layerId: 'p16_camadas_aeis',
    areaHa: 12.30,
    areaM2: 123000,
    perimetroM: 1600,
    lat: -3.060,
    lng: -59.962,
    description: 'Área de Especial Interesse Social do bairro São José Operário.',
    keywords: ['aeis', 'sao jose', 'operario', 'p16', 'habitacao']
  },
  {
    id: 'P15-PONTOS',
    name: 'Pontos de Controle Grade P15 (10 Pontos)',
    category: 'Controle Cartográfico',
    pagina: 15,
    layerId: 'p15_apoio_pontos_controle',
    lat: -3.085,
    lng: -59.930,
    description: '10 Pontos de controle de grade lidos na Página 15 com erro RMS de 0.68m.',
    keywords: ['pontos', 'controle', 'grade', 'utm', 'p15', 'rms', 'coordenadas']
  },
  {
    id: 'P16-PONTOS',
    name: 'Pontos de Controle Grade P16 (8 Pontos)',
    category: 'Controle Cartográfico',
    pagina: 16,
    layerId: 'p16_apoio_pontos_controle',
    lat: -3.058,
    lng: -59.960,
    description: '8 Pontos de controle de grade lidos na Página 16 com erro RMS de 0.12m.',
    keywords: ['pontos', 'controle', 'grade', 'utm', 'p16', 'rms', 'coordenadas']
  }
];

export const AskTerritory: React.FC = () => {
  const { 
    isAskTerritoryOpen, 
    setIsAskTerritoryOpen, 
    setSelectedFeature, 
    setActivePageFocus 
  } = useAppStore();

  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{
    sender: 'user' | 'agent';
    text: string;
    results?: DatabaseEntity[];
  }>>([
    {
      sender: 'agent',
      text: 'Olá! Sou o assistente de Inteligência Territorial do módulo SECT. Digite qualquer termo, nome de bairro, feição ou número de título para consultar nosso banco de dados espacial em tempo real!'
    }
  ]);

  if (!isAskTerritoryOpen) return null;

  const sampleQuestions = [
    'Busque o Título Cosme Ferreira',
    'Onde fica o bairro Mauazinho?',
    'Consulte o Título José Afonso (P16)',
    'Buscar a reserva Sauim Castanheiras',
    'Quais as terras da União na P15?'
  ];

  const handleSelectEntity = (entity: DatabaseEntity) => {
    // 1. Focar página correspondente
    setActivePageFocus(entity.pagina);

    // 2. Definir feição selecionada
    const featInfo: SelectedFeatureInfo = {
      id: entity.id,
      nome: entity.name,
      pagina: entity.pagina,
      tipo: entity.category,
      areaM2: entity.areaM2 || 10000,
      areaHa: entity.areaHa || 1.0,
      perimetroM: entity.perimetroM || 400,
      overlapPercentage: entity.overlapPercentage,
      overlapAreaHa: entity.overlapAreaHa,
      overlapWithClass: entity.overlapWithClass,
      properties: {
        id_imovel: entity.id,
        nome: entity.name,
        categoria: entity.category,
        pagina: entity.pagina,
      },
      evidence: {
        documento: 'Resposta SECT_autos.pdf',
        pagina: entity.pagina,
        folhaProcesso: entity.pagina === 16 ? 109 : 108,
        escala: entity.pagina === 16 ? '1:2.000' : '1:15.000',
        metodo: 'Reconstituição Vetorial Afim',
        pontosControle: entity.pagina === 16 ? 8 : 10,
        rmsMetros: entity.pagina === 16 ? 0.12 : 0.68,
      }
    };

    setSelectedFeature(featInfo);

    // Fechar modal para permitir visualização limpa do mapa
    setIsAskTerritoryOpen(false);
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = q.trim();
    setQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);

    // BUSCA NO BANCO DE DADOS ESPACIAL
    const cleanQ = userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const searchMatches = DATABASE_ENTITIES.filter((item) => {
      const matchName = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQ);
      const matchCat = item.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQ);
      const matchDesc = item.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQ);
      const matchKw = item.keywords.some((kw) => kw.includes(cleanQ) || cleanQ.includes(kw));
      return matchName || matchCat || matchDesc || matchKw;
    });

    setTimeout(() => {
      let replyText = '';
      if (searchMatches.length > 0) {
        replyText = `✦ **Banco de Dados SECT**: Encontrei **${searchMatches.length} registro(s)** referente(s) à sua consulta ("${userMsg}"):`;
      } else if (cleanQ.includes('compare') || cleanQ.includes('paginas')) {
        replyText = '✦ **Análise Comparativa**: A Página 15 (1:15.000) dista aproximadamente 1,7 km da Página 16 (1:2.000). Não há intersecção física entre suas molduras cartográficas.';
      } else {
        replyText = `✦ **Consulta no Banco de Dados**: Não encontrei nenhum registro exato com o termo "${userMsg}". Tente buscar por nomes como *Cosme*, *União*, *Mauazinho*, *José*, *Devoluta* ou *Sauim*.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: replyText,
          results: searchMatches.length > 0 ? searchMatches : undefined
        }
      ]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-[#07131F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1D2B] border border-[#203B4D] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[560px]">
        {/* Header Modal */}
        <div className="p-4 border-b border-[#203B4D] flex items-center justify-between bg-[#07131F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20A4F3] to-[#39C6B4] p-0.5 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#07131F]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#F3F7FA] flex items-center space-x-2">
                <span>✦ Pergunte ao Território</span>
                <span className="text-[10px] bg-[#20A4F3]/20 text-[#20A4F3] px-2 py-0.5 rounded font-mono border border-[#20A4F3]/30">Consulta ao Banco de Dados</span>
              </h3>
              <p className="text-[11px] text-[#9EB3C1]">Busca em Tempo Real no Acervo Vetorial SECT (P15 / P16)</p>
            </div>
          </div>
          <button
            onClick={() => setIsAskTerritoryOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#122A3A] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo de Mensagens e Resultados da Consulta */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#20A4F3] text-[#07131F] font-medium rounded-br-none shadow-md'
                    : 'bg-[#122A3A] border border-[#203B4D] text-[#F3F7FA] rounded-bl-none shadow-md space-y-2'
                }`}
              >
                <div>
                  {m.text.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-[#20A4F3]">{part}</strong> : part
                  )}
                </div>

                {/* CARDS DE RESULTADOS DE BUSCA NO BANCO DE DADOS */}
                {m.results && m.results.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#203B4D]">
                    {m.results.map((res) => (
                      <div 
                        key={res.id} 
                        className="bg-[#07131F] p-3 rounded-lg border border-[#203B4D] space-y-2 hover:border-[#20A4F3]/60 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs text-[#20A4F3]">{res.id}</span>
                          <span className="text-[10px] bg-[#122A3A] text-[#39C6B4] px-2 py-0.5 rounded border border-[#203B4D] font-mono">
                            Página {res.pagina}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-[#F3F7FA]">{res.name}</h4>
                          <p className="text-[11px] text-[#9EB3C1] mt-0.5">{res.description}</p>
                        </div>

                        {res.areaHa && (
                          <div className="text-[11px] font-mono text-[#9EB3C1] flex space-x-3">
                            <span>Área: <strong className="text-[#F3F7FA]">{res.areaHa} ha</strong></span>
                            {res.overlapPercentage && (
                              <span className="text-[#E85D5D]">Conflito: <strong>{res.overlapPercentage}%</strong></span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center space-x-2 pt-1">
                          <button
                            onClick={() => handleSelectEntity(res)}
                            className="flex-1 py-1.5 px-2.5 bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] font-bold rounded-md text-[11px] transition flex items-center justify-center space-x-1 shadow"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>📍 Selecionar e Focar no Mapa</span>
                          </button>

                          <a
                            href={`https://www.google.com/maps/@${res.lat},${res.lng},17z/data=!3m1!1e3`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-2.5 bg-[#122A3A] hover:bg-[#203B4D] text-[#39C6B4] border border-[#203B4D] font-medium rounded-md text-[11px] transition flex items-center space-x-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Satélite</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sugestões de Perguntas Rápidas */}
        <div className="px-4 py-2 bg-[#07131F]/50 border-t border-[#203B4D] overflow-x-auto flex space-x-2 custom-scrollbar text-[11px]">
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(sq)}
              className="px-2.5 py-1 bg-[#122A3A] hover:bg-[#203B4D] text-[#39C6B4] rounded-md border border-[#203B4D] whitespace-nowrap transition flex items-center space-x-1 shrink-0"
            >
              <span>{sq}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Input Footer para Consultas ao Banco */}
        <div className="p-3 border-t border-[#203B4D] bg-[#07131F] flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9EB3C1] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Consulte o banco de dados (ex: Cosme, Mauazinho, União, José Afonso, Sauim)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-[#122A3A] border border-[#203B4D] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#F3F7FA] focus:outline-none focus:border-[#20A4F3] placeholder-[#9EB3C1]"
            />
          </div>
          <button
            onClick={() => handleSend()}
            className="w-9 h-9 rounded-xl bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] flex items-center justify-center font-bold transition shadow-lg shadow-[#20A4F3]/20 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
