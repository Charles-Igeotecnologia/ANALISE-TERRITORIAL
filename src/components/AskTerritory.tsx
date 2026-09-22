import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { X, Send, Bot, ArrowRight } from 'lucide-react';

export const AskTerritory: React.FC = () => {
  const { isAskTerritoryOpen, setIsAskTerritoryOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    {
      sender: 'agent',
      text: 'Olá! Sou o assistente de Inteligência Territorial do módulo SECT. Como posso ajudar na análise das Páginas 15 e 16?'
    }
  ]);

  if (!isAskTerritoryOpen) return null;

  const sampleQuestions = [
    'Mostre a sobreposição do Título Cosme Ferreira (P15) com a União.',
    'Compare as escalas e áreas das Páginas 15 e 16.',
    'Qual feição possui maior índice de conflito na Página 16?',
    'Mostre os pontos de controle de grade lidos na Página 15.'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = q;
    setQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      let reply = 'Entendido. Processando consulta espacial e procedência documental...';
      if (userMsg.includes('Cosme') || userMsg.includes('União') || userMsg.includes('P15')) {
        reply = 'O Título Cosme Ferreira Filho (Página 15) possui 730,76 ha. Sua maior sobreposição é com a área da União Federal (384,55 ha · 52,62%).';
      } else if (userMsg.includes('Páginas 15 e 16') || userMsg.includes('Compare')) {
        reply = 'A Página 15 situa-se na Colônia Antônio Aleixo (1:15.000), enquanto a Página 16 fica no São José Operário (1:2.000). Elas distam ~1,7 km entre si sem sobreposição de molduras.';
      } else if (userMsg.includes('José') || userMsg.includes('P16')) {
        reply = 'O Título José Afonso (Página 16) possui 2,63 ha e está 97,02% sobreposto à Terra Devoluta do Processo C39419 (Tancredo Neves).';
      }
      setMessages((prev) => [...prev, { sender: 'agent', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-[#07131F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1D2B] border border-[#203B4D] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Header Modal */}
        <div className="p-4 border-b border-[#203B4D] flex items-center justify-between bg-[#07131F]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#20A4F3] to-[#39C6B4] p-0.5 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#07131F]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#F3F7FA] flex items-center space-x-2">
                <span>✦ Pergunte ao Território</span>
                <span className="text-[10px] bg-[#20A4F3]/20 text-[#20A4F3] px-2 py-0.5 rounded font-mono border border-[#20A4F3]/30">IA Agêntica</span>
              </h3>
              <p className="text-[11px] text-[#9EB3C1]">Assistente de Consulta Cartográfica e Análise Pericial</p>
            </div>
          </div>
          <button
            onClick={() => setIsAskTerritoryOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9EB3C1] hover:text-[#F3F7FA] hover:bg-[#122A3A] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo de Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#20A4F3] text-[#07131F] font-medium rounded-br-none'
                    : 'bg-[#122A3A] border border-[#203B4D] text-[#F3F7FA] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Sugestões de Perguntas */}
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

        {/* Input Footer */}
        <div className="p-3 border-t border-[#203B4D] bg-[#07131F] flex items-center space-x-2">
          <input
            type="text"
            placeholder="Digite sua pergunta ao território..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#122A3A] border border-[#203B4D] rounded-xl px-3.5 py-2 text-xs text-[#F3F7FA] focus:outline-none focus:border-[#20A4F3] placeholder-[#9EB3C1]"
          />
          <button
            onClick={() => handleSend()}
            className="w-9 h-9 rounded-xl bg-[#20A4F3] hover:bg-[#1B8CD0] text-[#07131F] flex items-center justify-center font-bold transition shadow-lg shadow-[#20A4F3]/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
