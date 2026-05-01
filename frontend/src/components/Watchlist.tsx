import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

interface Props {
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
}

const WATCHLIST_SYMBOLS = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'WEGE3', 'MGLU3', 'BBAS3', 'POMO4', 'TAEE11', 'CPFE3', 'LEVE3', 'TASA4'];
const BRAPI_TOKEN = import.meta.env.VITE_BRAPI_TOKEN;

export default function Watchlist({ onSelectStock, selectedStock }: Props) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchStocks = async () => {
    try {
      const promises = WATCHLIST_SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://brapi.dev/api/quote/${symbol}?token=${BRAPI_TOKEN}`
        );
        if (!response.ok) throw new Error(`Erro em ${symbol}`);
        const data = await response.json();
        const stock = data.results[0];
        return {
          symbol: stock.symbol,
          name: stock.longName || stock.shortName || stock.symbol,
          price: stock.regularMarketPrice,
          changePercent: stock.regularMarketChangePercent,
        };
      });

      const results = await Promise.all(promises);
      setStocks(results);
    } catch (err) {
      console.error('Erro ao buscar watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Watchlist</h2>
        <div className="text-gray-500 text-sm">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Watchlist</h2>
        <span className="text-xs text-green-500">● Live</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-0.5">
        {stocks.map(stock => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className={`p-2 cursor-pointer hover:bg-[#1a1a1a] border-l-2 transition-all duration-200
              ${selectedStock === stock.symbol ? 'border-blue-500 bg-[#1a1a1a]' : 'border-transparent'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">{stock.symbol}</div>
                <div className="text-gray-500 text-xs truncate">{stock.name}</div>
              </div>
              <div className="text-right ml-2">
                <div className="text-white text-sm font-medium">R$ {stock.price.toFixed(2)}</div>
                <div className={`text-xs flex items-center gap-1 justify-end font-medium ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}