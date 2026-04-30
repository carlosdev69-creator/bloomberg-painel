import { useState } from 'react';
import TickerTape from './components/TickerTape';
import Watchlist from './components/Watchlist';
import NewsFeed from './components/NewsFeed';
import { useEffect } from 'react';
import { supabase } from './lib/supabase-client';
function App() {
  const [selectedStock, setSelectedStock] = useState('PETR4');
  useEffect(() => {
  async function testConnection() {
    console.log('🔌 Testando conexão com Supabase...');
    const { data, error } = await supabase.from('stocks').select('*');
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message);
    } else {
      console.log('✅ Conectado! Ativos encontrados:', data.length);
      console.table(data);
    }
  }
  
  testConnection();
}, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-mono">
      {/* Faixa de cotações no topo */}
      <TickerTape />

      {/* Layout Principal em Grid */}
      <div className="grid grid-cols-12 gap-1 p-1" style={{ height: 'calc(100vh - 40px)' }}>
        
        {/* Coluna Esquerda - Watchlist */}
        <div className="col-span-2 bg-[#111] border border-gray-800 rounded p-3">
          <Watchlist
            onSelectStock={setSelectedStock}
            selectedStock={selectedStock}
          />
        </div>

        {/* Coluna Centro - Gráfico e Dados */}
        <div className="col-span-7 flex flex-col gap-1">
          {/* Gráfico Principal */}
          <div className="flex-1 bg-[#111] border border-gray-800 rounded p-3 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">
                R$ 36,74
              </div>
              <div className="text-xl text-green-500 mb-1">+1,43%</div>
              <div className="text-gray-400">{selectedStock}</div>
              <div className="mt-4 text-sm text-gray-500">
                📊 Gráfico será integrado aqui
              </div>
            </div>
          </div>

          {/* Cards de Índices */}
          <div className="h-48 bg-[#111] border border-gray-800 rounded p-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Índices do Mercado
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'IBOV', value: '128.456', change: '+0,45%', positive: true },
                { name: 'IFIX', value: '3.245', change: '-0,12%', positive: false },
                { name: 'IBRX50', value: '19.876', change: '+0,67%', positive: true },
                { name: 'SMLL', value: '2.456', change: '+1,23%', positive: true },
              ].map(indice => (
                <div
                  key={indice.name}
                  className="bg-[#0a0a0a] border border-gray-800 rounded p-3 hover:border-gray-700 transition-colors"
                >
                  <div className="text-xs text-gray-400 mb-1">{indice.name}</div>
                  <div className="text-lg font-bold text-white">{indice.value}</div>
                  <div
                    className={`text-sm font-medium mt-1 ${
                      indice.positive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {indice.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Direita - Notícias */}
        <div className="col-span-3 bg-[#111] border border-gray-800 rounded p-3">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}

export default App;