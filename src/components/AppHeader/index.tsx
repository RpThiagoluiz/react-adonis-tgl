import { useDispatch } from "react-redux";
import { UserActions } from "../../store/userSlice";
import { HiOutlineArrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Header } from "./styles";

export const AppHeader = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const { logOut } = UserActions;

    dispatch(logOut());
  };
  return (
    <Header>
      <nav>
        <h2>TGL</h2>

        <div className="header-nav-div-center">
          <NavLink exact to="/newbet">
            Home
          </NavLink>
          <NavLink to="/">Account</NavLink>
        </div>

        <div className="header-nav-div-end" onClick={logoutHandler}>
          <NavLink to="/">Log out</NavLink>
          <HiOutlineArrowRight />
        </div>
      </nav>
    </Header>
  );
};
