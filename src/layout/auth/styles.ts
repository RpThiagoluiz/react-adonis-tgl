import styled from "styled-components";

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3rem 1fr;
  grid-gap: 2rem;

  /*
AT - Authentication
AN - APP NAME
FM - Form Authentication
SU - Sing Up



*/

  grid-template-areas:
    "AT AT"
    "AN FM"
    "FT FT";

  //Resposive here
`;
