import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  > .bet {
    color: red;
    margin-left: 9rem;
    margin-top: 72px;

    > section {
      display: flex;
      align-items: center;
      margin-bottom: 2.5rem;

      > h2 {
        font-size: 24px;
        color: var(--gray-700);
        margin-right: 45px;
      }

      > span {
        font-size: 17px;
        font-style: italic;
        color: var(--gray-800);
        margin-right: 1rem;
      }

      > .bet-container-filters {
        button {
          width: 120px;

          background: transparent;

          padding: 0.5rem;
          border-radius: 100px;

          //Props
          border: 2px solid purple;
          color: purple;

          margin-right: 2rem;
        }
      }
    }

    > .bet-item-description {
      position: relative;
      max-width: 40.5rem;
      word-wrap: break-word;
      color: var(--gray-800);

      border-left: 0.3rem solid pink;
      border-radius: 4px;
      padding: 0.5rem;

      margin-bottom: 1.5rem;

      /* &::before {
        content: "";

        width: 0.25rem;
        height: 6rem;

        position: absolute;
        left: -2px;

        border-radius: 7px;
        background: purple;
      } */

      > p {
        font-size: 1.06rem;
        font-style: italic;
        font-weight: bold;
        line-height: 1.5rem;

        margin-bottom: 15px;
      }

      > div {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      > strong {
        font-size: 20px;
        font-style: italic;
        color: pink;
      }
    }
  }

  > .new-bet {
    display: flex;
    align-items: center;

    margin-top: 72px;
    margin-right: 19rem;

    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    color: var(--green-900);

    > a {
      text-decoration: none;
      color: var(--green-900);
      margin-right: 11px;
    }
  }
`;
