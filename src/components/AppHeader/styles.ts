import styled from "styled-components";

export const Header = styled.header`
  height: 5rem;
  position: relative;

  border-bottom: 1px solid var(--shape);

  padding: 0 8rem;

  > nav {
    display: flex;
    align-items: center;
    padding: 1rem;

    > h2 {
      color: var(--gray-700);
      font-size: 2.75rem;
      margin-right: 3.625rem;

      ::before {
        content: "";

        width: 5.5rem;
        height: 0.25rem;

        position: absolute;
        bottom: -2px;

        border-radius: 7px;

        background-color: var(--green);
      }
    }

    > div {
      > a {
        color: var(--gray-700);
        font-weight: bold;
        text-decoration: none;

        font-size: 22px;
      }
    }

    .header-nav-div-center {
      width: 70%;
      display: flex;
      justify-content: space-between;
    }
    .header-nav-div-end {
      /* display: flex;
      align-items: center; */
      color: var(--gray-700);
      margin-left: 3.625rem;
      svg {
        width: 20px;
        height: 18px;
        margin-left: 1rem;
        // margin-bottom: -0.2rem;
      }
    }
  }
`;
