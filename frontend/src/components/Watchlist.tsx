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

export default function Watchlist({ onSelectStock, selectedStock }: Props) {
  // Dados mockados (depois virão do Supabase)
  const stocks: Stock[] = [
    { symbol: 'PETR4', name: 'Petrobras PN', price: 36.74, changePercent: 1.43 },
    { symbol: 'VALE3', name: 'Vale ON', price: 68.92, changePercent: -1.19 },
    { symbol: 'ITUB4', name: 'Itaú Unibanco PN', price: 34.21, changePercent: 0.44 },
    { symbol: 'BBDC4', name: 'Bradesco PN', price: 14.87, changePercent: -1.52 },
    { symbol: 'ABEV3', name: 'Ambev ON', price: 13.45, changePercent: 0.60 },
    { symbol: 'WEGE3', name: 'WEG ON', price: 38.90, changePercent: 1.75 },
    { symbol: 'MGLU3', name: 'Magazine Luiza ON', price: 8.92, changePercent: -4.80 },
    { symbol: 'BBAS3', name: 'Banco do Brasil ON', price: 27.30, changePercent: 0.81 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Watchlist
        </h2>
        <span className="text-xs text-gray-500">{stocks.length} ativos</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5">
        {stocks.map(stock => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className={`
              p-2 cursor-pointer hover:bg-[#1a1a1a] border-l-2 transition-all duration-200
              ${selectedStock === stock.symbol
                ? 'border-blue-500 bg-[#1a1a1a]'
                : 'border-transparent'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">
                  {stock.symbol}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {stock.name}
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="text-white text-sm font-medium">
                  R$ {stock.price.toFixed(2)}
                </div>
                <div
                  className={`text-xs flex items-center gap-1 justify-end font-medium ${
                    stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stock.changePercent >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stock.changePercent >= 0 ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}