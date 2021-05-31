export interface GameToAddCartProps {
  game_id?: number;
  id: string;
  type: string;
  price: number;
  gameNumbers: any[];
  color: string;
  betDate: Date;
}

export interface CartProps {
  games: GameToAddCartProps[];
  totalPrice?: number;
}

export interface BetApiResponse {
  id: number;
  user_id: number;
  game_id: number;
  numbers: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  game: {
    id: number;
    type: string;
    description: string;
    range: number;
    price: number;
    ["max-number"]: number;
    color: string;
    ["min-cart-value"]: number;
    created_at: Date;
    updated_at: Date;
  };
}
