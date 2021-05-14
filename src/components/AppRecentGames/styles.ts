import styled from "styled-components";

interface ButtonColorProps {
  color: string;
  isActive: boolean;
}

interface ColorProps {
  color: string;
}

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
    }
  }

  > .new-bet {
    display: flex;
    align-items: center;

    margin-top: 72px;
    margin-right: 24rem;

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

export const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ButtonGame = styled.button<ButtonColorProps>`
  width: 120px;

  background: transparent;
  margin-right: 1.56rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;

  //Props
  border: 2px solid ${(props) => (props.isActive ? "none" : props.color)};
  color: ${(props) => (props.isActive ? "var(--white)" : props.color)};
  background: ${(props) => (props.isActive ? props.color : "transparent")};

  &:last-child {
    margin-right: 0;
  }

  //Active change border, background, color.
`;

export const CartItem = styled.button<ColorProps>`
  display: flex;
  flex-direction: column;
  background: transparent;
  max-width: 50.5rem;

  word-wrap: break-word;
  color: var(--gray-800);

  border-left: 6px solid ${(props) => props.color};
  border-radius: 4px;
  padding: 0.5rem;

  margin-bottom: 2.5rem;

  > p {
    font-size: 1.4rem;
    font-style: italic;
    font-weight: bold;
    line-height: 1.75rem;

    margin-bottom: 15px;
  }

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    > p {
      font-size: 1.2rem;
    }
  }

  > strong {
    font-size: 1.4rem;
    font-style: italic;
    color: ${(props) => props.color};
  }
`;
