export interface GameToAddCartProps {
  id: string;
  type: string;
  price: number;
  gameNumbers: string[];
  color: string;
}

export interface CartProps {
  games: GameToAddCartProps[];
  totalPrice?: number;
}
