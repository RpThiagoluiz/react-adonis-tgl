import { useDispatch } from "react-redux";
import { UserActions } from "../../store/userSlice";
import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Header } from "./styles";
import { useState } from "react";

export const AppHeader = () => {
  const [burguerMenu, setBurgerMenu] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const { logOut } = UserActions;

    dispatch(logOut());
  };

  const handleToggleMenuMobile = () => {
    setBurgerMenu(!burguerMenu);
  };
  return (
    <Header>
      <nav>
        <h2>TGL</h2>
        <button className={`btn-mobile `} onClick={handleToggleMenuMobile}>
          Menu
        </button>
        <div className={`header-nav-div-center ${burguerMenu && "active"}`}>
          <NavLink exact to="/newbet">
            Home
          </NavLink>
          <NavLink to="/">Account</NavLink>
        </div>

        <div
          className={`header-nav-div-end ${burguerMenu && "active"}`}
          onClick={logoutHandler}
        >
          <NavLink to="/">
            Log out <HiOutlineArrowRight />
          </NavLink>
        </div>
      </nav>
    </Header>
  );
};
