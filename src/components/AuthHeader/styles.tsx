import styled from "styled-components";

export const Container = styled.section`
  grid-area: AN;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: -8rem;
  h1,
  h2 {
    color: var(--gray-700);
  }

  > section {
    width: 13.5625rem; //217px
    text-align: center;
    > h2 {
      font-size: 4.375rem; //70px;
      font-style: italic;
    }
  }

  > div {
    margin: 1.875rem 0 1.25rem; //30px 0 20px;
    background: var(--green);
    padding: 0.4375rem 3.5625rem; //7px 57px;
    border-radius: 6.25rem; //100px;
    > p {
      color: var(--white);
    }
  }

  > h1 {
    font-size: 5.3125rem; //85px
  }
`;
