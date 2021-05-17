export interface SavedGame {
  type: string;
  price: number;
  color: string;
  data: string;
  numbers: number[];
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  recentGames: SavedGame[];
}
