export interface SavedGame {
  type: string;
  price: number;
  color: string;
  data: string;
  numbers: number[];
}

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  recentGames?: SavedGame[];
}

export interface UserData {
  email: string;
  password: string;
}

export interface UserApiReturn {
  created_at: Date;
  email: string;
  id: number;
  password: string;
  token: string;
  token_created_at: Date;
  updated_at: Date;
  username: string;
}
