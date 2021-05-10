import axios from "axios";

import { HiOutlineArrowRight } from "react-icons/hi";

import { BsTrash } from "react-icons/bs";

import { Container, GridBet, GridCart, Title, Grid } from "./styles";

export const AppGameMod = () => {
  const handlerInputValue = () => {
    console.log(`click`);
  };

  //useEffect,
  async function getGameTypes() {
    try {
      await axios.get("http://localhost:3333/types").then((response) => {
        const { data } = response;
        console.log(data);
      });
    } catch (error) {}
  }
  getGameTypes();

  //testLength

  const testLength = () => {
    let test = [];
    for (let index = 1; index <= 60; index++) {
      test.push(
        <input
          type="text"
          name=""
          //id="range-input-${index}"
          //value="${format}"
          value={index}
          className="grid-bet-container-range-input"
          onClick={handlerInputValue}
          readOnly
        />
      );
    }
    return test;
  };

  return (
    <Container>
      <Grid>
        <GridBet>
          <Title>
            <strong>NEW BET</strong> <span>FOR MEGA-SENA</span>
          </Title>
          <span>Choose a game</span>
          <div className="grid-bet-container-buttons">
            <button>Lotofacil</button>
            <button>Mega-sena</button>
            <button>Lotomania</button>
          </div>

          <div className="grid-bet-container-description">
            <h3>Fill your bet</h3>
            <p>
              Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5
              ou 4 acertos. São realizados dois sorteios semanais para você
              apostar e torcer para ficar milionário."
            </p>
          </div>

          {/* <input
            type="text"
            name=""
            //id="range-input-${index}"
            //value="${format}"
            value="10"
            className="grid-bet-container-range-input"
            onClick={handlerInputValue}
            readOnly
          /> */}

          <div className="grid-bet-container-gamerange">{testLength()}</div>
        </GridBet>
        <GridCart>
          <h3>CART</h3>

          <div>
            <section className="grid-cart-container-section">
              <BsTrash />
              <div className="grid-cart-item-description">
                <p>1,2,3,1,5,48,4,1251,51,0</p>
                <span>
                  <strong>NomeDoGame</strong>
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
    </Container>
  );
};
