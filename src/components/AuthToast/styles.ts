import styled from "styled-components";

interface ColorProps {
  color: string;
}

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.459);
`;
export const CardWrapper = styled.div<ColorProps>`
  position: fixed;
  top: 30vh;
  left: 10%;
  z-index: 100;
  //overflow: hidden;

  background-color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  > header {
    > h2 {
      margin: 1rem;
      color: var(--gray-900);
    }

    > svg {
      position: absolute;
      color: ${(props) => props.color};

      margin-top: -2.5rem;
    }
  }
  > div {
    padding: 1rem;
    > p {
      color: ${(props) => props.color};
    }
  }
  > footer {
    padding: 1rem;
    display: flex;

    justify-content: flex-end;

    > button {
      width: 8rem;

      padding: 1rem 2rem;
      border-radius: 100px;
      background: transparent;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      border: 2px solid ${(props) => props.color};
      font-size: 1.2rem;
      color: ${(props) => props.color};
      cursor: pointer;
      position: relative;

      transition: filter ease-in 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;
