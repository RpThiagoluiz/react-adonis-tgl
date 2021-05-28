import styled, { keyframes } from "styled-components";

const rotation = keyframes`
from {
  transform: rotate(0deg);
}


to {
  transform: rotate(360deg);
}



`;

export const Spinner = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid var(--spinner);
  border-radius: 50%;
  border-top: none;
  border-right: none;

  margin: 16px auto;

  //animation: ${rotation} 1s alternate infinite ;
  animation: ${rotation} 1s linear infinite;
`;
