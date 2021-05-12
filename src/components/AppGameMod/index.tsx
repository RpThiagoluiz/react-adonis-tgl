import { useCallback, useEffect, useState } from "react";
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
} from "./styles";
import { inputFormatValue } from "../../utils";
import { GameTypesProps } from "../../@types/GameTypes";
import { api } from "../../services/api";
import { LoadingSpinner } from "../LoadingSpiner";

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

  const existsNumber = (value: string) => {
    return selectedNumbers.indexOf(value) !== -1 ? true : false;
  };

  const handlerInputValue = (event: any) => {
    //If i`m need transforme in number.
    let newValue = event.currentTarget.value;
    const indexSelected = selectedNumbers.indexOf(newValue);
    const numExists = indexSelected === -1;
    const maxNumbersSelected =
      selectedNumbers.length < gameChoice["max-number"];
    try {
      if (numExists && maxNumbersSelected) {
        setSelectedNumbers([...selectedNumbers, newValue]);
      } else if (!numExists) {
        selectedNumbers.splice(indexSelected, 1);
      } else {
        throw new Error(
          `Quantidade selecionada, excede a quantidade maxima ${gameChoice["max-number"]}`
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Const verificar se aquele numero exist dentro do array.

  const testLength = () => {
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
          //id="range-input-${index}"
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

  // função que gera números aleatorios.
  const randomNumber = (numberMax: number) => {
    return String(Math.ceil(Math.random() * numberMax));
  };

  // função que completa os números
  const handlerCompleteGame = useCallback(() => {
    const { range } = gameChoice!;
    let qntNumbersForComplete =
      gameChoice!["max-number"] - selectedNumbers.length;
    let allNumbers: string[] = [];
    while (allNumbers.length < qntNumbersForComplete) {
      let number = randomNumber(range);
      if (
        allNumbers.indexOf(number) === -1 &&
        selectedNumbers.indexOf(number) === -1
      ) {
        allNumbers.push(number);
      }
    }
    console.log(allNumbers);
    console.log(selectedNumbers);
    return setSelectedNumbers([...selectedNumbers, ...allNumbers]);
  }, [randomNumber, gameChoice, selectedNumbers]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          <GridBet>
            <Title>
              <strong>NEW BET</strong> <span>FOR MEGA-SENA</span>
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

            <div className="grid-bet-container-gamerange">{testLength()}</div>

            <section className="grid-bet-container-buttons">
              <div className="generic-btn">
                <button onClick={handlerCompleteGame}>Complete game</button>
                <button onClick={handlerClearSelectedNumbers}>
                  Clear game
                </button>
              </div>
              <div className="add-cart">
                <button onClick={() => console.log(`Add to cart`)}>
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
                <BsTrash onClick={() => console.log(`trash!`)} />
                <div className="grid-cart-item-description">
                  <p>1,2,3,1,5,48,4,1251,51,0,4,1251,51,0</p>
                  <span>
                    <strong>NomeDoGame</strong>
                    <span>R$ 2.50</span>
                  </span>
                </div>
              </section>
              <section className="grid-cart-total">
                <span>
                  <strong>CART </strong>
                  TOTAL:
                  <span>R$ 20,00</span>
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
