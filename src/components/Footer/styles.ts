import styled from "styled-components";

export const Container = styled.section`
  height: 4.9375rem; //79px
  width: 100%;

  text-align: center;
  font-size: 0.9375rem;
  color: var(--gray-700);
  border-top: 1px solid var(--shape);
  padding-top: 1.825rem; //29.1px;
  //margin-top: 15rem;

  @media (max-width: 1200px) {
    position: relative;
    margin-top: 2rem;
  }
`;
