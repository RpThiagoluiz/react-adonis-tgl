import styled from "styled-components";

export const Container = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;

  display: flex;
  justify-content: center;
  gap: 5rem;

  margin-top: 5rem;
  border-right: 1px solid var(--shape);

  color: var(--gray-700);
`;

export const UserData = styled.section`
  position: relative;
  padding-right: 5rem;

  ::before {
    content: "";
    width: 0.25rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 100%;

    border-right: 3px solid var(--shape);
  }
`;

export const UpdateUserData = styled.section`
  padding: 2rem;
`;

export const UserContentData = styled.div`
  height: 100%;
  padding: 8rem;
  font-size: 1.5rem;

  > p {
    margin: 5rem 0;
  }
`;

export const Form = styled.form`
  position: relative;
  box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.078);
  border: 1px solid #dddddd;
  border-radius: 14px;

  margin-top: 2rem;

  background: var(--white);

  height: auto;
  > p {
    position: absolute;
    bottom: 9.875rem; //158px
    right: 1.6875rem;

    font-size: 1.1rem;
    font-style: italic;
    color: var(--gray-100);
  }
`;
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;

  > label {
    margin: 34px 0 26px 30px;
    color: var(--gray-800);
  }
  > input {
    border-bottom: 1px solid var(--shape);
    font-size: 1.2rem;
    color: black;
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
    font-size: 2.2rem;

    padding: 2rem;

    > svg {
      margin-left: 5px;
    }
  }

  @media (max-width: 360px) {
    width: 18rem;
  }
`;
