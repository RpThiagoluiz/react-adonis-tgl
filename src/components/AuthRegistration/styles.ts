import styled from "styled-components";

export const Container = styled.section`
  grid-area: FM;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    color: var(--gray-700);
    text-align: center;
    font-size: 2.1875rem; //35px
    font-style: italic;
    margin-bottom: 26px;
  }

  > .back {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 80px;
    font-size: 35px;
    font-weight: bold;
    font-style: italic;

    color: var(--gray-700);
    background: transparent;
  }
`;

export const Form = styled.form`
  position: relative;
  box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.078);
  border: 1px solid #dddddd;
  border-radius: 14px;

  background: var(--white);

  height: auto;
  > p {
    position: absolute;
    bottom: 9.875rem; //158px
    right: 27px;

    font-size: 17px;
    font-style: italic;
    color: var(--gray-100);
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: auto;
  > label {
    margin: 34px 0 26px 30px;
    color: var(--gray-300);
  }
  > input {
    border-bottom: 1px solid var(--shape);
  }

  > .registration {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    color: var(--green);
    font-weight: bold;
    font-style: italic;
    font-size: 35px;

    padding: 32px;
  }
`;