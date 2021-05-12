import styled from "styled-components";

interface InputProps {
  isActive: boolean;
}
interface ButtonColorProps {
  color: string;
  isActive: boolean;
}

export const Container = styled.section`
  margin: 2.625rem 8.75rem 1rem 8.75rem;
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 40rem;
  grid-template-rows: 1fr;

  grid-gap: 2.4rem; //41px
`;

export const GridBet = styled.section`
  > span {
    font-weight: bold;
    color: var(--gray-800);
  }

  > .grid-bet-container-gamer-mode {
    margin: 2rem auto;
  }

  > .grid-bet-container-description {
    max-width: 40.5rem;
    word-wrap: break-word;
    color: var(--gray-800);

    > h3 {
      font-size: 1.2rem;
    }
    > p {
      font-size: 1.06rem;
      font-style: italic;

      line-height: 1.5rem;
    }
  }

  > .grid-bet-container-gamerange {
    margin-top: 2rem;
  }

  > .grid-bet-container-buttons {
    //width: 100%;
    display: flex;
    align-items: center;

    > .generic-btn {
      > button {
        width: 12rem;
        height: 3.25rem;

        border-radius: 10px;
        border: 1px solid var(--green-900);

        padding: 1.06rem 1.375rem 1rem 1.562rem;

        font-size: 1rem;
        color: var(--green-900);

        transition: 0.5s ease-in filter;

        &:hover {
          filter: brightness(0.9);
        }

        &:first-child {
          margin-right: 25px;
        }
      }
    }
    > .add-cart {
      margin-left: 14rem;
      > button {
        width: 16rem;
        height: 3.25rem;

        display: flex;
        align-items: center;
        justify-content: space-around;

        font-size: 19px;

        border: none;
        border-radius: 10px;
        padding: 1.06rem 1.375rem 1rem 1.562rem;
        color: var(--white);
        background-color: var(--green-900);
      }
    }
  }
`;

export const InputGame = styled.input<InputProps>`
  width: 3rem;
  height: 3rem;

  margin: 0 1.375rem 1.5rem 0;

  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;

  color: #fff;
  background-color: ${({ isActive }) =>
    isActive ? "var(--green-900)" : "var(--cyan-gray)"};

  border: none;
  border-radius: 50%;

  cursor: pointer;
`;

export const Title = styled.section`
  text-transform: uppercase;
  font-size: 1.5rem; //24px
  font-style: italic;
  margin-bottom: 33px;

  color: var(--gray-700);
`;

export const GridCart = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 380px;

  max-height: 500px;

  background: var(--white);
  border-radius: 10px;
  border: 1px solid var(--gray-200);

  > h3 {
    padding-top: 3rem;
    padding-left: 1rem;

    font-size: 24px;
    font-style: italic;
    color: var(--gray-700);
    margin-bottom: 46px;
  }

  > div {
    > .grid-cart-container-section {
      display: flex;
      align-items: center;

      position: relative;

      font-size: 0.937rem;
      color: var(--gray-800);

      margin-left: 1rem;

      > svg {
        width: 1.5rem;
        height: 1.75rem;

        opacity: 0.5;

        margin-right: 1.25rem;
        cursor: pointer;
      }

      > .grid-cart-item-description {
        border-left: 0.25rem solid pink;
        border-radius: 5px;
        padding: 0.5rem;

        > p {
          width: 15rem;
          word-wrap: break-word;
          margin-bottom: 0.5rem;
        }

        > span {
          > strong {
            font-size: 1rem;
            font-style: italic;
            margin-right: 19px;
          }
          > span {
            color: var(--grey-800);
          }
        }
      }
    }
    > .grid-cart-total {
      position: absolute;

      margin-bottom: 47px;
      margin-left: 16px;
      bottom: 96px;

      color: var(--gray-700);
      font-size: 28px;
      > span {
        > strong {
          font-style: italic;
        }
      }
    }
  }

  > .grid-cart-button-save {
    height: 96px;
    width: 100%;

    position: absolute;
    bottom: 0;
    > span {
      color: var(--green-900);
      font-size: 32px;
      > svg {
        width: 24px;
        height: 20px;
      }
    }
  }
`;

export const ButtonGame = styled.button<ButtonColorProps>`
  width: 120px;

  background: transparent;
  margin-right: 1.56rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;

  //Props
  border: 1px solid ${(props) => (props.isActive ? "none" : props.color)};
  color: ${(props) => (props.isActive ? "var(--white)" : props.color)};
  background: ${(props) => (props.isActive ? props.color : "transparent")};

  &:last-child {
    margin-right: 0;
  }

  //Active change border, background, color.
`;
