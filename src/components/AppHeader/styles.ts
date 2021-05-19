import styled from "styled-components";

export const Header = styled.header`
  height: 5rem;
  position: relative;
  border-bottom: 1px solid var(--shape);
  padding: 0 14rem 0 8em;
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
        font-size: 1.4rem;
      }
    }
    > .btn-mobile {
      display: none;
    }
    > .header-nav-div-center {
      width: 14rem;
      display: flex;
      flex: 1;
      justify-content: space-between;
    }
    > .header-nav-div-end {
      /* display: flex;
      align-items: center; */
      color: var(--gray-700);
      margin-left: 3.625rem;
      > a {
        > svg {
          width: 20px;
          height: 18px;
          margin-left: 0.25rem;
        }
      }
    }
  }
  /* @media (max-width: 920px) {
    > nav {
      > .btn-mobile {
        position: absolute;
        right: 5rem;
        display: block;
      }

      > .header-nav-div-center,
      > .header-nav-div-end {
        display: block;
        position: absolute;
        width: 100%;
        top: 15rem;
        right: 0;
        height: 100vh;
        display: flex;
        background: var(--gray-100);

        &.active {
          display: flex;
        }
      }
    }
  } */
`;
