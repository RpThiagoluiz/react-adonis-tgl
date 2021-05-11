import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Header } from "./styles";

export const AppHeader = () => (
  <Header>
    <nav>
      <h2>TGL</h2>

      <div className="header-nav-div-center">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/recentgames">Account</NavLink>
      </div>

      <div className="header-nav-div-end">
        <NavLink to="/">Log out</NavLink>
        <HiOutlineArrowRight />
      </div>
    </nav>
  </Header>
);
