import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./../../assets/logo.svg";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { clearProfile } from "./../../store/user/action";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { clearSession, setSession } from "./../../utils/session";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./index.scss";

export default function Header({ isHome = false }) {
  const avatar = useSelector((state) => state.user.contributorProfile.avatar);
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOutClick = () => {
    clearSession();
    dispatch(clearProfile());
    navigate("/");
  };

  const onDarkMode = () => {
    const isDarkMode = !darkTheme;
    setDarkTheme(isDarkMode);
    if (isDarkMode) {
      setSession("theme", "dark");
      if (!document.getElementById("root").classList.contains("ic-dark")) {
        document.getElementById("root").classList.add("ic-dark");
      }
    } else {
      setSession("theme", "light");
      if (document.getElementById("root").classList.contains("ic-dark")) {
        document.getElementById("root").classList.remove("ic-dark");
      }
    }
  };

  const onHomeBtnClick = () => {
    if (window.location.pathname.indexOf("profile") !== -1) {
      navigate("/dashboard");
    } else {
      navigate(0);
    }
  };

  const onProfileBtnClick = () => {
    navigate("/profile");
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="ic-header-main-container">
      <div className="ic-header-name-wrapper" onClick={() => onHomeBtnClick()}>
        <div className="ic-header-logo">
          <img src={logo} alt={"Icare App logo"} />
        </div>
        <div className="ic-header-name"> ICare </div>
      </div>
      {isHome ? (
        <div className="ic-profile">
          <IconButton
            className="ic-dark-icon"
            size="large"
            onClick={() => onDarkMode()}
          >
            <DarkModeIcon />
          </IconButton>
          <Button
            className="ic-signin"
            variant="contained"
            onClick={() => onLoginClick()}
          >
            Sign in
          </Button>
        </div>
      ) : (
        <div className="ic-profile">
          <IconButton
            className="ic-bck-icon"
            size="large"
            onClick={() => onDarkMode()}
          >
            <DarkModeIcon />
          </IconButton>
          {avatar ? (
            <img
              src={avatar}
              alt={"Avatar"}
              onClick={() => onProfileBtnClick()}
            />
          ) : (
            <IconButton
              className="ic-bck-icon"
              size="large"
              onClick={() => onProfileBtnClick()}
            >
              <AccountCircle />
            </IconButton>
          )}
          <IconButton
            className="ic-bck-icon"
            size="large"
            onClick={() => onLogOutClick()}
          >
            <Logout />
          </IconButton>
        </div>
      )}
    </div>
  );
}
