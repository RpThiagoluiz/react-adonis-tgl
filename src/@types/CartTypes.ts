export interface GameToAddCartProps {
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
