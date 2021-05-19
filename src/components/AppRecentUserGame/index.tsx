import {
  currencyValue,
  dateFormatValue,
  formatNumberInArray,
} from "../../utils";
import { EmptyCart } from "../EmptyCart";
import { GameToAddCartProps } from "../../@types/CartTypes";
import { CartItem, EmptyContainer } from "./styles";
import { GameTypesProps } from "../../@types/GameTypes";
import { useEffect, useState } from "react";

interface AppRecentUserGameProps {
  games: GameToAddCartProps[];
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

  // const userGames = () =>
  //   !!games.length ? (
  //     games.map((game: any) => (
  //       <CartItem key={game.id} color={game.color}>
  //         <p>{formatNumberInArray(game.gameNumbers)}</p>
  //         <div>
  //           <p>
  //             {dateFormatValue(new Date(game.betDate))} - (
  //             {currencyValue(game.price)})
  //           </p>
  //         </div>
  //         <strong>{game.type}</strong>
  //       </CartItem>
  //     ))
  //   ) : (
  //     <EmptyContainer>
  //       <EmptyCart color="var(--red)" />
  //     </EmptyContainer>
  //   );

  const filteredGames = () => {
    if (filterGame === "") {
      return !!games.length ? (
        games.map((game: any) => (
          <CartItem key={game.id} color={game.color}>
            <p>{formatNumberInArray(game.gameNumbers)}</p>
            <div>
              <p>
                {dateFormatValue(new Date(game.betDate))} - (
                {currencyValue(game.price)})
              </p>
            </div>
            <strong>{game.type}</strong>
          </CartItem>
        ))
      ) : (
        <EmptyContainer>
          <EmptyCart color="var(--red)" />
        </EmptyContainer>
      );
    } else if (games && filter) {
      const filterGame = games.filter((game) => game.type === filter.type);
      return filterGame.map((game: any) => (
        <CartItem key={game.id} color={game.color}>
          <p>{formatNumberInArray(game.gameNumbers)}</p>
          <div>
            <p>
              {dateFormatValue(new Date(game.betDate))} - (
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
