import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Header } from "./styles";

export const AppHeader = () => (
  <Header>
    <nav>
      <h2>TGL</h2>

      <div className="header-nav-div-center">
        <NavLink exact to="/home">
          Home
        </NavLink>
        <NavLink to="/account">Account</NavLink>
      </div>

      <div className="header-nav-div-end">
        <NavLink to="/">Log out</NavLink>
        <HiOutlineArrowRight />
      </div>
    </nav>
  </Header>
);

{
  /* <header class="header-nav">
      <nav>
        <div>
          <a href="" class="header-nav-logo">TGL</a>
        </div>
        <div class="header-nav-div-center">
          <a href="">Home</a>
          <a href="">Account</a>
        </div>
        <div class="header-nav-div-end">
          <a href="">Log out </a>
          <img
            class="header-nav-div-end-image-logout"
            src="./assets/right.svg"
            alt=""
          />
        </div>
      </nav>
    </header> */
}

/*=====HEADER=====*/
// .header-nav {
//   height: 3.2rem;
//   border-bottom: 1px solid var(--shape);
//   position: relative;
// }
// nav {
//   display: flex;
//   align-items: center;
//   margin: 1.625rem 8.75rem 1rem 8.75rem;
// }

// nav a {
//   text-decoration: none;
//   font-weight: bold;
//   color: var(--gray-700);
// }

// .header-nav-logo {
//   font-size: 2.75rem;
//   margin-right: 3.625rem;
// }

// .header-nav-logo::before {
//   /*Active Bar?!*/
//   content: "";

//   width: 5.25rem;
//   height: 0.25rem;

//   position: absolute;
//   bottom: -2px;

//   border-radius: 7px;

//   background-color: var(--yellow-green);
// }

// .header-nav-div-center {
//   width: 70%;
//   display: flex;
//   justify-content: space-between;
// }

// .header-nav-div-end {
//   margin-left: 3.625rem;
// }

// .header-nav-div-end-image-logout {
//   width: 1.3rem;
//   height: 0.6rem;
// }
