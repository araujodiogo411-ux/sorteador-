import React from 'react';
import { Users, Shuffle } from 'lucide-react';
import { PlayerInputProps } from '../types';

export const PlayerInput: React.FC<PlayerInputProps> = ({ value, onChange, onDraw, playerCount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl border border-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <Users size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Lista de Participantes</h2>
          <p className="text-sm text-slate-500">Digite um nome por linha</p>
        </div>
        <div className="ml-auto bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-600">
          {playerCount} nomes
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Exemplo:&#10;Daniele&#10;Davi&#10;Thais&#10;Kayke..."
          className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all resize-none text-slate-700 text-lg leading-relaxed shadow-inner outline-none"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onDraw}
          disabled={playerCount < 2}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0
            ${playerCount < 2 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'}
          `}
        >
          <Shuffle size={24} />
          SORTEAR TIMES
        </button>
      </div>
    </div>
  );
};
