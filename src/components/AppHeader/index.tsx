import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Header, BurguerMenu } from "./styles";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export const AppHeader = () => {
  const [burguerMenu, setBurgerMenu] = useState(false);
  const { signOut } = useAuth();

  const handleToggleMenuMobile = () => {
    setBurgerMenu(!burguerMenu);
  };
  return (
    <Header>
      <nav>
        <h2>TGL</h2>
        <BurguerMenu className={`${burguerMenu && "active"}`}>
          <button className={`btn-mobile`} onClick={handleToggleMenuMobile}>
            Menu
          </button>
          <div className={`header-nav-div-center`}>
            <NavLink exact to="/newbet">
              Home
            </NavLink>
            <NavLink to="/">Account</NavLink>
          </div>

          <div className={`header-nav-div-end `} onClick={signOut}>
            <NavLink to="/">
              Log out <HiOutlineArrowRight />
            </NavLink>
          </div>
        </BurguerMenu>
      </nav>
    </Header>
  );
};
