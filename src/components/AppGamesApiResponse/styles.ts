import styled from "styled-components";

interface ButtonColorProps {
  color: string;
  isActive: boolean;
}

export const Container = styled.section`
  margin: 2rem auto;
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
