export interface TeamResult {
  teamA: string[];
  teamB: string[];
  date: string;
}

export interface PlayerInputProps {
  value: string;
  onChange: (value: string) => void;
  onDraw: () => void;
  playerCount: number;
}

export interface TeamCardProps {
  teamName: string;
  players: string[];
  colorTheme: 'blue' | 'pink';
  icon?: React.ReactNode;
}
