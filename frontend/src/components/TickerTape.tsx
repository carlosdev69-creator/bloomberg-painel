import { useEffect, useState } from 'react';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
}

export default function TickerTape() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  
  useEffect(() => {
    // Dados iniciais mockados (depois vamos substituir pela API real)
    const initialData: StockQuote[] = [
      { symbol: 'PETR4', price: 36.74, change: 0.52 },
      { symbol: 'VALE3', price: 68.92, change: -0.83 },
      { symbol: 'ITUB4', price: 34.21, change: 0.15 },
      { symbol: 'BBDC4', price: 14.87, change: -0.23 },
      { symbol: 'ABEV3', price: 13.45, change: 0.08 },
      { symbol: 'WEGE3', price: 38.90, change: 0.67 },
      { symbol: 'MGLU3', price: 8.92, change: -0.45 },
      { symbol: 'BBAS3', price: 27.30, change: 0.22 },
      { symbol: 'PETR3', price: 39.15, change: 0.71 },
      { symbol: 'B3SA3', price: 12.08, change: -0.15 },
    ];

    setQuotes(initialData);

    // Simular atualização a cada 2 segundos
    const interval = setInterval(() => {
      setQuotes(prev =>
        prev.map(quote => ({
          ...quote,
          price: quote.price + (Math.random() - 0.5) * 0.5,
          change: quote.change + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] border-b border-gray-800 h-10 overflow-hidden">
      <div className="flex whitespace-nowrap animate-scroll">
        {/* Duplicamos para criar efeito de loop infinito */}
        {[...quotes, ...quotes].map((quote, index) => (
          <div
            key={`${quote.symbol}-${index}`}
            className="flex items-center px-4 py-2 text-sm border-r border-gray-800 hover:bg-[#1a1a1a] cursor-pointer transition-colors"
          >
            <span className="font-bold mr-3 text-white">{quote.symbol}</span>
            <span className="mr-3 text-gray-300">
              R$ {quote.price.toFixed(2)}
            </span>
            <span
              className={`font-medium ${
                quote.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {quote.change >= 0 ? '▲' : '▼'} {Math.abs(quote.change).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

