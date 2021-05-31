import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container, NewBetContainer, BetContainer } from "./styles";
import { useSelector } from "react-redux";
import { ModalError } from "../ModalError";
import { useEffect, useState } from "react";
import { GameTypesProps } from "../../@types/GameTypes";
import { ErrorProps } from "../../@types/Error";
import { api } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpiner";
import { AppGamesApiResponse } from "../AppGamesApiResponse";
import { AppRecentUserGame } from "../AppRecentUserGame";
import { Footer } from "../Footer";
import { useModalApp } from "../../hooks/ModalContext";

export const AppRecentGames = () => {
  const [apiReponse, setApiResponse] = useState<GameTypesProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameChoice, setGameChoice] = useState<GameTypesProps>({
    id: 0,
    type: "",
    description: "",
    range: 0,
    price: 0,
    "max-number": 0,
    color: "",
    "min-cart-value": 0,
  });

  const [games, setGames] = useState<any[]>([]);

  const { uxToUser } = useModalApp();

  useEffect(() => {
    async function getGames() {
      setIsLoading(true);
      try {
        await api.get<GameTypesProps[]>("/game").then((response) => {
          const { data } = response;

          setIsLoading(false);
          setApiResponse(data);
        });
      } catch (error) {
        uxToUser({
          title: "Request Error",
          description: "500 - Internal Server Error",
          color: "var(--red)",
          active: true,
        });
      }
    }
    setIsLoading(false);
    getGames();
  }, []);

  useEffect(() => {
    async function getBets() {
      setIsLoading(true);
      try {
        await api.get("/bets").then((response) => {
          const { data } = response;

          setGames(data);
        });
      } catch (error) {
        uxToUser({
          title: "Request Error",
          description: "Error ao buscar seus dados.",
          color: "var(--red)",
          active: true,
        });
      }
    }
    setIsLoading(false);
    getBets();
  }, []);

  const handleButtonGameMode = (gameType: string) => {
    setIsLoading(true);
    const result = apiReponse.filter((game) => game.type === gameType);
    const gameChoice = [...result];

    setGameChoice(gameChoice[0]);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <BetContainer>
            <section>
              <h2>RECENT GAMES</h2>
              <span>Filters</span>
              <div>
                <AppGamesApiResponse
                  apiResponse={apiReponse}
                  gameChoice={gameChoice}
                  handleButtonGameMode={handleButtonGameMode}
                />
              </div>
            </section>

            <AppRecentUserGame games={games} filter={gameChoice} />
          </BetContainer>
          <NewBetContainer>
            <Link to="/newbet"> New Bet</Link> <HiOutlineArrowRight />
          </NewBetContainer>
        </Container>
      )}
      <Footer />
    </>
  );
};
