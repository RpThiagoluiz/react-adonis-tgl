import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import {
  Container,
  GridBet,
  GridCart,
  Title,
  Grid,
  ButtonGame,
  InputGame,
  CartItem,
} from "./styles";
import {
  formatNumberInArray,
  currencyValue,
  inputFormatValue,
} from "../../utils";
import { GameTypesProps } from "../../@types/GameTypes";
import { api } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpiner";
import { GameToAddCartProps } from "../../@types/CartTypes";
import { EmptyCart } from "../EmptyCart";

export const AppGameMod = () => {
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
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [cartsGames, setCartGames] = useState<GameToAddCartProps[]>([]);

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

  const existsNumber = (value: string) => {
    return selectedNumbers.indexOf(value) !== -1 ? true : false;
  };

  const gameBetNumbers = () => {
    const { range } = gameChoice;
    let gameRangeInputs = [];
    for (let index = 1; index <= range; index++) {
      const formatedNumber = inputFormatValue(index);
      gameRangeInputs.push(
        <InputGame
          key={index}
          isActive={existsNumber(formatedNumber)}
          type="text"
          name=""
          value={formatedNumber}
          className="grid-bet-container-range-input"
          onClick={handlerInputValue}
          readOnly
        />
      );
    }

    return gameRangeInputs;
  };

  //Buttons Functions - Clear - Complete - AddCart - Save

  const handlerClearSelectedNumbers = () => {
    return setSelectedNumbers([]);
  };

  //BugHere
  const handlerCompleteGame = () => {
    setSelectedNumbers([]);
    const { range } = gameChoice;
    let selectArray = [...selectedNumbers];

    if (selectedNumbers.length === gameChoice["max-number"]) {
      alert(`numero maximo atingido`);
    } else {
      while (selectArray.length < gameChoice["max-number"]) {
        const randomNumber = String(Math.ceil(Math.random() * range));

        selectArray.push(randomNumber);
        console.log(randomNumber);
      }
      setSelectedNumbers((prevState) => [...prevState, ...selectArray]);
    }

    //console.log(range, randomNumber, completeGame);
  };

  const handlerAddCart = () => {
    //antes de adc, verificar a quantidade de numeros,
    //verificar carrinho esta correto.
    //assim que adc, atualizar o valor do total.
    const { type, price, color } = gameChoice;
    const numbersChoice = [...selectedNumbers].map((el) => Number(el));
    const newCartGame: GameToAddCartProps = {
      id: String(new Date().getTime()),
      type,
      gameNumbers: numbersChoice,
      price,
      color,
    };
    //
    setCartGames((prevState) => [...prevState, newCartGame]);

    console.log(newCartGame.gameNumbers);
  };

  const removeItemToCart = (id: string) => {
    setCartGames((prevState) => prevState.filter((game) => game.id !== id));
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
            <div className="grid-bet-container-gamer-mode">
              {apiReponse.map((game) => (
                <ButtonGame
                  key={game.type}
                  color={game.color}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    handleButtonGameMode(game.type);
                  }}
                  isActive={game.type === gameChoice.type}
                >
                  {game.type}
                </ButtonGame>
              ))}
            </div>

            <div className="grid-bet-container-description">
              <h3>Fill your bet</h3>
              <p>{gameChoice.description}</p>
            </div>

            <div className="grid-bet-container-gamerange">
              {gameBetNumbers()}
            </div>

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
                  <EmptyCart />
                )}
              </section>
              <section className="grid-cart-total">
                <span>
                  <strong>CART </strong>
                  TOTAL:
                  <span> {currencyValue(25)}</span>
                </span>
              </section>
            </div>

            <button className="grid-cart-button-save">
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
