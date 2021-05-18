import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CartActions } from "../../store/cartSlice";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import { Container, GridBet, GridCart, Title, Grid, CartItem } from "./styles";
import { formatNumberInArray, currencyValue } from "../../utils";
import { ModalError } from "../ModalError";
import { GameTypesProps } from "../../@types/GameTypes";
import { api } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpiner";
import { GameToAddCartProps } from "../../@types/CartTypes";
import { EmptyCart } from "../EmptyCart";
import { ErrorProps } from "../../@types/Error";
import { useHistory } from "react-router-dom";
import { AppGameInputNumbers } from "../AppGameInputNumbers";
import { AppGamesApiResponse } from "../AppGamesApiResponse";
import { Footer } from "../Footer";

export const AppGameMod = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiReponse, setApiResponse] = useState<GameTypesProps[]>([]);
  const [redirect, setRedirect] = useState(false);
  const [gameChoice, setGameChoice] = useState<GameTypesProps>({
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
  const [messageToUser, setMessageToUser] = useState<ErrorProps>({
    title: "",
    description: "",
    color: "",
    active: false,
  });
  const { push } = useHistory();
  const dispatch = useDispatch();

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
      } catch (error) {
        setMessageToUser({
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

  //Total Game Price
  useEffect(() => {
    const total = cartsGames.reduce((sumTotal, games) => {
      return sumTotal + games.price;
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

  const handlerInputValue = (event: any) => {
    let newValue = event.currentTarget.value;
    const indexSelected = selectedNumbers.indexOf(newValue);
    const numExists = indexSelected === -1;
    const maxNumbersSelected =
      selectedNumbers.length < gameChoice["max-number"];
    try {
      if (numExists && maxNumbersSelected) {
        setSelectedNumbers((prevState) => [...prevState, newValue]);
      } else if (!numExists) {
        setSelectedNumbers((prevState) => prevState.splice(indexSelected, 1));
      } else {
        throw new Error(
          `Quantidade selecionada, excede a quantidade maxima ${gameChoice["max-number"]}`
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handlerClearSelectedNumbers = () => {
    return setSelectedNumbers([]);
  };

  const handlerCompleteGame = () => {
    setSelectedNumbers([]);
    const { range } = gameChoice;
    let selectArray = [...selectedNumbers];

    if (selectedNumbers.length === gameChoice["max-number"]) {
      alert(`numero maximo atingido`);
    } else {
      while (selectArray.length < gameChoice["max-number"]) {
        const randomNumber = String(Math.ceil(Math.random() * range));
        if (selectArray.indexOf(randomNumber) === -1) {
          selectArray.push(randomNumber);
        }
      }
      setSelectedNumbers((prevState) => [...prevState, ...selectArray]);
    }
  };

  const handlerAddCart = () => {
    //antes de adc, verificar a quantidade de numeros,
    //verificar carrinho esta correto.
    //assim que adc, atualizar o valor do total.
    try {
      const { type, price, color } = gameChoice;
      const numbersChoice = [...selectedNumbers].map((el) => Number(el));
      const newCartGame: GameToAddCartProps = {
        id: String(new Date().getTime()),
        type,
        gameNumbers: numbersChoice,
        price,
        betDate: new Date(),
        color,
      };

      if (numbersChoice.length !== gameChoice["max-number"]) {
        throw new Error(
          `Voce nao adicionou a quantidade de numeros do game, ${gameChoice["max-number"]}`
        );
      }

      setCartGames((prevState) => [...prevState, newCartGame]);
      setSelectedNumbers([]);
    } catch (error) {
      setMessageToUser({
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

  const saveGame = () => {
    try {
      if (totalPrice < 30) {
        const minPrice = gameChoice["min-cart-value"];
        throw new Error(
          `Valor minimo para salvar o game nao atingido: ${currencyValue(
            minPrice
          )}`
        );
      }

      cartsGames.forEach((game) => {
        dispatch(CartActions.addItemToCart(game));
      });
      setCartGames([]);
      setMessageToUser({
        title: "Bet Realizada com Sucesso!",
        description: "Veja seu historico de apostas, acessando sua conta.",
        color: "var(--spinner)",
        active: true,
      });
      setRedirect(true);
    } catch (error) {
      //Criar o modal para error, messages
      setMessageToUser({
        title: "Ocorreu um erro !",
        description: error.message,
        color: "var(--red)",
        active: true,
      });
    }
  };

  const toggleModal = () => {
    setMessageToUser({ title: "", description: "", color: "", active: false });
    redirect && push("/");
  };

  const modal = (
    <ModalError
      color={messageToUser.color}
      title={messageToUser.title}
      description={messageToUser.description}
      onClickClose={toggleModal}
    />
  );

  return (
    <Container>
      {messageToUser.active && modal}
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
              apiReponse={apiReponse}
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
    </Container>
  );
};
