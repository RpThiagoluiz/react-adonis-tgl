import { api } from "../services/api";
import { GameTypesProps } from "../@types/GameTypes";
import { useEffect, useState } from "react";

export const ApiCallResponse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiReponse, setApiResponse] = useState<GameTypesProps[]>([]);
  const [gameChoice, setGameChoice] = useState<GameTypesProps>({
    type: "",
    description: "",
    range: 0,
    price: 0,
    "max-number": 0,
    color: "",
    "min-cart-value": 0,
  });

  useEffect(() => {
    async function getGames() {
      setIsLoading(true);
      try {
        await api.get<GameTypesProps[]>("/types").then((response) => {
          const { data } = response;
          const findLotofacil = data.filter(
            (game) => game.type === "Lotofácil"
          );

          const initalGame = [...findLotofacil];
          setIsLoading(false);
          setApiResponse(data);
          setGameChoice(initalGame[0]);
        });
      } catch (error) {}
    }
    setIsLoading(false);
    getGames();
  }, []);

  return { isLoading, gameChoice, apiReponse };
};
