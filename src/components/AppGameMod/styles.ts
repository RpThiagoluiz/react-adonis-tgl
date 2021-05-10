import styled from "styled-components";

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

  > .grid-bet-container-buttons {
    margin: 2rem auto;
    button {
      width: 120px;

      background: transparent;
      margin-right: 5rem;
      padding: 0.5rem;
      border-radius: 100px;

      //Props
      border: 2px solid purple;
      color: purple;
    }
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
    > input {
      width: 3rem;
      height: 3rem;

      margin: 0 1.375rem 1.5rem 0;

      text-align: center;
      font-size: 1.25rem;
      font-weight: bold;

      color: #fff;
      background-color: var(--cyan-gray);

      border: none;
      border-radius: 50%;

      cursor: pointer;
    }
  }
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
        padding: 0.5rem;

        > p {
          width: 15rem;
          word-wrap: break-word;
          margin-bottom: 0.5rem;
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
