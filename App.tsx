import React, { useState, useEffect } from 'react';
import { PlayerInput } from './components/PlayerInput';
import { TeamCard } from './components/TeamCard';
import { TeamResult } from './types';
import { Calendar, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<TeamResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper to count non-empty lines
  const getPlayerCount = (text: string) => {
    return text.split('\n').filter(line => line.trim() !== '').length;
  };

  const handleDraw = () => {
    const players = inputText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name !== '');

    if (players.length < 2) return;

    setIsAnimating(true);
    setResult(null);

    // Simulate a brief calculation delay for UX
    setTimeout(() => {
      // Fisher-Yates Shuffle
      const shuffled = [...players];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Split logic
      const mid = Math.ceil(shuffled.length / 2);
      const teamA = shuffled.slice(0, mid);
      const teamB = shuffled.slice(mid);

      // Get current date formatted for PT-BR
      const now = new Date();
      const dateString = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setResult({
        teamA,
        teamB,
        date: dateString
      });
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="min-h-screen pb-12 px-4 md:px-8 pt-8">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="inline-block mb-2">
          <div className="flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
             <span className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Sorteio Aleatório</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">
          Sorteador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Equipes</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Organize seus jogos de forma rápida e justa. Insira os nomes, clique em sortear e deixe a sorte decidir!
        </p>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        
        {/* Input Section */}
        <PlayerInput 
          value={inputText}
          onChange={setInputText}
          onDraw={handleDraw}
          playerCount={getPlayerCount(inputText)}
        />

        {/* Loading State */}
        {isAnimating && (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-xl font-semibold text-indigo-800 animate-pulse">Sorteando equipes...</p>
          </div>
        )}

        {/* Results Section */}
        {!isAnimating && result && (
          <div className="w-full animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-8">
              <TeamCard 
                teamName="Time A" 
                players={result.teamA} 
                colorTheme="blue" 
              />
              <TeamCard 
                teamName="Time B" 
                players={result.teamB} 
                colorTheme="pink" 
              />
            </div>

            {/* Date Footer */}
            <div className="flex justify-center">
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-slate-200 flex items-center gap-2 text-slate-600">
                <Calendar size={18} className="text-indigo-500" />
                <span className="font-medium text-sm md:text-base capitalize">{result.date}</span>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* CSS Animation for fade-in */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
