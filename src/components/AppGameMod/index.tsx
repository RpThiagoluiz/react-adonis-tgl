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
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
    getGames();
  }, []);

  const handlerInputValue = (event: any) => {
    console.log(event.currentTarget.value);
  };

  const testLength = () => {
    const { range } = gameChoice;
    let gameRangeInputs = [];
    for (let index = 1; index <= range; index++) {
      const formatedNumber = inputFormatValue(index);
      gameRangeInputs.push(
        <input
          key={index}
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
                <ButtonGame key={game.type} color={game.color}>
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
                <button>Complete game</button>
                <button>Clear game</button>
              </div>
              <div className="add-cart">
                <button>
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
                <BsTrash />
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
