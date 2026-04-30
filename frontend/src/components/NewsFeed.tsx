import { Clock, ExternalLink } from 'lucide-react';

interface News {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export default function NewsFeed() {
  const news: News[] = [
    {
      id: 1,
      title: 'Ibovespa fecha em alta com expectativa de corte de juros nos EUA',
      source: 'InfoMoney',
      time: '5 min',
      sentiment: 'positive',
    },
    {
      id: 2,
      title: 'Petrobras anuncia novo plano de investimentos de R$ 120 bi para 2026-2030',
      source: 'Valor Econômico',
      time: '15 min',
      sentiment: 'positive',
    },
    {
      id: 3,
      title: 'Vale reporta produção de minério acima do esperado no 2º trimestre',
      source: 'Bloomberg',
      time: '32 min',
      sentiment: 'positive',
    },
    {
      id: 4,
      title: 'BC sinaliza possível aceleração no ritmo de corte da Selic',
      source: 'Reuters',
      time: '1h',
      sentiment: 'positive',
    },
    {
      id: 5,
      title: 'Gerdau anuncia programa de recompra de ações após resultado forte',
      source: 'Exame',
      time: '2h',
      sentiment: 'positive',
    },
    {
      id: 6,
      title: 'Americanas tem novo revés na Justiça e ações caem 8%',
      source: 'Valor Econômico',
      time: '2h',
      sentiment: 'negative',
    },
    {
      id: 7,
      title: 'Mercado reduz projeção de inflação pela quinta semana consecutiva',
      source: 'InfoMoney',
      time: '3h',
      sentiment: 'neutral',
    },
    {
      id: 8,
      title: 'WEG anuncia expansão de fábrica nos Estados Unidos',
      source: 'Bloomberg',
      time: '4h',
      sentiment: 'positive',
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '🟢';
      case 'negative':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Notícias
        </h2>
        <span className="text-xs text-gray-500">{news.length} notícias</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {news.map(item => (
          <div
            key={item.id}
            className="p-2 hover:bg-[#1a1a1a] rounded cursor-pointer transition-colors border border-transparent hover:border-gray-800"
          >
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">
                {getSentimentDot(item.sentiment)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 leading-snug line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                  <span className="font-medium text-gray-400">
                    {item.source}
                  </span>
                  <span>•</span>
                  <Clock size={10} />
                  <span>{item.time}</span>
                  <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}