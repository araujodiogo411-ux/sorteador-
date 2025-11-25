import React from 'react';
import { TeamCardProps } from '../types';
import { User, Shield } from 'lucide-react';

export const TeamCard: React.FC<TeamCardProps> = ({ teamName, players, colorTheme }) => {
  const isBlue = colorTheme === 'blue';
  
  // Styles based on theme
  const headerBg = isBlue ? 'bg-indigo-50' : 'bg-rose-50';
  const headerText = isBlue ? 'text-indigo-700' : 'text-rose-700';
  const iconBg = isBlue ? 'bg-indigo-600' : 'bg-rose-500';
  const borderColor = isBlue ? 'border-indigo-100' : 'border-rose-100';
  const bulletColor = isBlue ? 'bg-indigo-400' : 'bg-rose-400';

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl shadow-lg border-2 ${borderColor} overflow-hidden transition-all hover:shadow-xl`}>
      {/* Header */}
      <div className={`${headerBg} p-4 flex items-center justify-between border-b ${borderColor}`}>
        <div className="flex items-center gap-3">
          <div className={`${iconBg} text-white p-2 rounded-lg shadow-sm`}>
            <Shield size={20} />
          </div>
          <div>
            <h3 className={`font-bold text-xl ${headerText}`}>{teamName}</h3>
            <p className="text-sm font-medium text-slate-500">{players.length} Jogadores</p>
          </div>
        </div>
      </div>

      {/* List */}
      <ul className="p-4 space-y-2 flex-grow">
        {players.map((player, index) => (
          <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className={`w-2 h-2 rounded-full ${bulletColor} flex-shrink-0`} />
            <span className="text-slate-700 font-medium truncate">{player}</span>
          </li>
        ))}
        {players.length === 0 && (
          <li className="text-center text-slate-400 italic py-8">Nenhum jogador sorteado</li>
        )}
      </ul>
    </div>
  );
};
