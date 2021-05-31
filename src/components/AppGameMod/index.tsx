import { useCallback, useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import { Container, GridBet, GridCart, Title, Grid, CartItem } from "./styles";
import { formatNumberInArray, currencyValue } from "../../utils";
import { GameTypesProps } from "../../@types/GameTypes";
import { api } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpiner";
import { GameToAddCartProps } from "../../@types/CartTypes";
import { EmptyCart } from "../EmptyCart";
import { AppGameInputNumbers } from "../AppGameInputNumbers";
import { AppGamesApiResponse } from "../AppGamesApiResponse";
import { Footer } from "../Footer";
import { useModalApp } from "../../hooks/ModalContext";

export const AppGameMod = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiReponse, setApiResponse] = useState<GameTypesProps[]>([]);
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
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [cartsGames, setCartGames] = useState<GameToAddCartProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { uxToUser } = useModalApp();

  useEffect(() => {
    async function getGames() {
      setIsLoading(true);
      try {
        await api.get<GameTypesProps[]>("/game").then((response) => {
          const { data } = response;

          const findLotofacil = data.filter(
            (game) => game.type === "Lotofácil"
          );

          const initalGame = [...findLotofacil];
          setIsLoading(false);
          setApiResponse(data);
          setGameChoice(initalGame[0]);
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
  }, [uxToUser]);

  //Total Game Price
  useEffect(() => {
    const total = cartsGames.reduce((sumTotal, games) => {
      return sumTotal + Number(games.price);
    }, 0);

    setTotalPrice(total);
  }, [cartsGames]);

  const handleButtonGameMode = (gameType: string) => {
    setIsLoading(true);
    setSelectedNumbers([]);
    const result = apiReponse.filter((game) => game.type === gameType);
    const gameChoice = [...result];

    setGameChoice(gameChoice[0]);
    setIsLoading(false);
  };

  const handlerInputValue = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const newValue = event.currentTarget.value;
      try {
        const indexSelected = selectedNumbers.indexOf(newValue);
        const numExists = indexSelected === -1;

        if (numExists && selectedNumbers.length < gameChoice["max-number"]) {
          return setSelectedNumbers((prevState) => [...prevState, newValue]);
        } else if (!numExists) {
          const filterNumbers = selectedNumbers.filter(
            (num) => num !== newValue
          );
          return setSelectedNumbers(filterNumbers);
        } else {
          throw new Error(
            `Quantidade selecionada, excede a quantidade maxima ${gameChoice["max-number"]}`
          );
        }
      } catch (error) {
        uxToUser({
          title: "☹ Numeros Selecionados",
          description: error.message,
          color: "var(--red)",
          active: true,
          redirect: false,
        });
      }
    },

    [selectedNumbers, gameChoice, uxToUser]
  );

  const handlerClearSelectedNumbers = () => {
    return setSelectedNumbers([]);
  };

  const handlerCompleteGame = () => {
    setSelectedNumbers([]);
    const { range } = gameChoice;
    let selectArray = [...selectedNumbers];

    try {
      if (selectedNumbers.length === gameChoice["max-number"]) {
        throw new Error(`Numeros maximo atingido`);
      } else {
        while (selectArray.length < gameChoice["max-number"]) {
          const randomNumber = String(Math.ceil(Math.random() * range));
          if (selectArray.indexOf(randomNumber) === -1) {
            selectArray.push(randomNumber);
          }
        }
        setSelectedNumbers((prevState) => [...prevState, ...selectArray]);
      }
    } catch (error) {
      uxToUser({
        title: error.message,
        description: `Para o game ${gameChoice.type}, a quantidade maxima é ${gameChoice["max-number"]}`,
        color: "var(--red)",
        active: true,
        redirect: false,
      });
    }
  };

  const handlerAddCart = () => {
    try {
      const { type, price, color, id } = gameChoice;
      const numbersChoice = [...selectedNumbers].map((el) => Number(el));
      const newCartGame: GameToAddCartProps = {
        game_id: id,
        id: String(new Date().getTime()),
        type,
        gameNumbers: numbersChoice,
        price,
        betDate: new Date(),
        color,
      };

      if (numbersChoice.length !== gameChoice["max-number"]) {
        throw new Error(
          `Voce nao adicionou a quantidade de numeros do game , ${gameChoice.type} , ${gameChoice["max-number"]}`
        );
      }
      console.log(newCartGame.gameNumbers);
      setCartGames((prevState) => [...prevState, newCartGame]);
      setSelectedNumbers([]);
    } catch (error) {
      uxToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
      });
    }
  };

  const removeItemToCart = (id: string) => {
    setCartGames((prevState) => prevState.filter((game) => game.id !== id));
  };

  const saveGame = async () => {
    setIsLoading(true);
    try {
      if (totalPrice < 30) {
        const minPrice = gameChoice["min-cart-value"];
        setIsLoading(false);
        throw new Error(
          `Valor minimo para salvar o game nao atingido: ${currencyValue(
            minPrice
          )}`
        );
      }

      const cart: any = [];

      cartsGames.forEach((game) => {
        cart.push({
          game_id: game.game_id,
          numbers: game.gameNumbers.toString(),
          price: Number(game.price),
        });
      });

      const response = await api.post("/bets", {
        cart,
        totalPrice,
      });

      if (response.status !== 200) {
        throw new Error(`Error ao enviar o game, tente novamente mais tarde.`);
      }

      setCartGames([]);
      uxToUser({
        title: "Bet Realizada com Sucesso!",
        description: "Veja seu historico de apostas, acessando sua conta.",
        color: "var(--spinner)",
        active: true,
        redirect: true,
      });
    } catch (error) {
      uxToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
        redirect: false,
      });
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          <GridBet>
            <Title>
              <strong>NEW BET</strong> <span>FOR {gameChoice.type}</span>
            </Title>
            <span>Choose a game</span>
            <AppGamesApiResponse
              apiResponse={apiReponse}
              gameChoice={gameChoice}
              handleButtonGameMode={handleButtonGameMode}
            />

            <div className="grid-bet-container-description">
              <h3>Fill your bet</h3>
              <p>{gameChoice.description}</p>
            </div>

            <AppGameInputNumbers
              gameChoice={gameChoice}
              handlerInputValue={handlerInputValue}
              selectedNumbers={selectedNumbers}
            />

            <section className="grid-bet-container-buttons">
              <div className="generic-btn">
                <button onClick={handlerCompleteGame}>Complete game</button>
                <button onClick={handlerClearSelectedNumbers}>
                  Clear game
                </button>
              </div>
              <div className="add-cart">
                <button onClick={handlerAddCart}>
                  <IoCartOutline style={{ height: "25", width: "25" }} />
                  Add to Cart
                </button>
              </div>
            </section>
          </GridBet>
          <GridCart>
            <h3>CART</h3>

            <div>
              <section className="grid-cart-container-section">
                {!!cartsGames.length ? (
                  cartsGames.map((game) => (
                    <div key={game.id}>
                      <BsTrash onClick={() => removeItemToCart(game.id)} />
                      <CartItem color={game.color}>
                        <p>{formatNumberInArray(game.gameNumbers)}</p>
                        <span>
                          <strong>{game.type}</strong>
                          <span>{currencyValue(game.price)}</span>
                        </span>
                      </CartItem>
                    </div>
                  ))
                ) : (
                  <EmptyCart color="var(--grey-800)" />
                )}
              </section>
              <section className="grid-cart-total">
                <span>
                  <strong>CART </strong>
                  TOTAL:
                  <span> {currencyValue(totalPrice)}</span>
                </span>
              </section>
            </div>

            <button className="grid-cart-button-save" onClick={saveGame}>
              <span>
                Save <HiOutlineArrowRight />
              </span>
            </button>
          </GridCart>
        </Grid>
      )}
      <Footer />
    </Container>
  );
};
