import { useEffect, useState } from 'react';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const SYMBOLS = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'WEGE3', 'MGLU3', 'BBAS3', 'POMO4', 'TAEE11', 'CPFE3', 'LEVE3', 'TASA4'];
const BRAPI_TOKEN = import.meta.env.VITE_BRAPI_TOKEN;

export default function TickerTape() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 60000); // A cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  const fetchQuotes = async () => {
    try {
      const promises = SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://brapi.dev/api/quote/${symbol}?token=${BRAPI_TOKEN}`
        );
        if (!response.ok) throw new Error(`Erro em ${symbol}`);
        const data = await response.json();
        const stock = data.results[0];
        return {
          symbol: stock.symbol,
          price: stock.regularMarketPrice,
          change: stock.regularMarketChange,
          changePercent: stock.regularMarketChangePercent,
        };
      });

      const results = await Promise.all(promises);
      setQuotes(results);
      setError(false);
    } catch (err) {
      console.error('Erro ao buscar cotações:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] border-b border-gray-800 h-10 flex items-center px-4">
        <span className="text-gray-400 text-sm">🔄 Carregando cotações...</span>
      </div>
    );
  }

  if (error || quotes.length === 0) {
    return (
      <div className="bg-[#0a0a0a] border-b border-gray-800 h-10 flex items-center px-4">
        <span className="text-yellow-500 text-sm">⚠️ Dados offline - usando fallback</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] border-b border-gray-800 h-10 overflow-hidden">
      <div className="flex whitespace-nowrap animate-scroll">
        {[...quotes, ...quotes].map((quote, index) => (
          <div
            key={`${quote.symbol}-${index}`}
            className="flex items-center px-4 py-2 text-sm border-r border-gray-800 hover:bg-[#1a1a1a] cursor-pointer transition-colors"
          >
            <span className="font-bold mr-3 text-white">{quote.symbol}</span>
            <span className="mr-3 text-gray-300">
              R$ {quote.price.toFixed(2)}
            </span>
            <span className={`font-medium ${quote.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {quote.change >= 0 ? '▲' : '▼'} R$ {Math.abs(quote.change).toFixed(2)}
              {' '}({quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}