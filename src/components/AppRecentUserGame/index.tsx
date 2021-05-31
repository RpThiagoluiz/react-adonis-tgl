import {
  currencyValue,
  dateFormatValue,
  formatNumberApiResponse,
  formatNumberInArray,
} from "../../utils";
import { EmptyCart } from "../EmptyCart";
import { BetApiResponse } from "../../@types/CartTypes";
import { CartItem, EmptyContainer } from "./styles";
import { GameTypesProps } from "../../@types/GameTypes";
import { useEffect, useState } from "react";

interface AppRecentUserGameProps {
  games: BetApiResponse[];
  filter: GameTypesProps;
}

export const AppRecentUserGame = ({
  games,
  filter,
}: AppRecentUserGameProps) => {
  const [filterGame, setFilterGame] = useState("");
  //Check, Se nao existir filtro, vc da o render em todos os jogos.
  //Caso exista vc tras somente os que tem o msm tipo

  useEffect(() => {
    setFilterGame(filter.type);
  }, [filter]);

  const filteredGames = () => {
    if (filterGame === "" || games.length === 0) {
      return !!games.length ? (
        games.map((game: any) => (
          <CartItem key={game.id} color={game.game.color}>
            <p>{formatNumberApiResponse(game.numbers)}</p>
            <div>
              <p>
                {dateFormatValue(new Date(game.updated_at))} - (
                {currencyValue(game.price)})
              </p>
            </div>
            <strong>{game.game.type}</strong>
          </CartItem>
        ))
      ) : (
        <EmptyContainer>
          <EmptyCart color="var(--red)" />
        </EmptyContainer>
      );
    } else if (games && filter) {
      const filterGame = games.filter((game) => game.game.type === filter.type);
      return filterGame.map((game: any) => (
        <CartItem key={game.id} color={game.game.color}>
          <p>{game.numbers}</p>
          <div>
            <p>
              {dateFormatValue(new Date(game.updated_at))} - (
              {currencyValue(game.price)})
            </p>
          </div>
          <strong>{game.type}</strong>
        </CartItem>
      ));
    }
  };

  return <>{filteredGames()}</>;
};
