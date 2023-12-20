import { useState } from "react";
import logo from "./../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { setSession } from "./../../utils/session";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./index.scss";

export default function RegistrationLayout(props) {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);

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
    navigate("/login");
  };

  return (
    <div className="ic-registration-container">
      <IconButton
        className="ic-theme-icon"
        size="large"
        onClick={() => onDarkMode()}
      >
        <DarkModeIcon />
      </IconButton>
      <div className="ic-header-container" onClick={() => onHomeBtnClick()}>
        <div className="ic-header-logo">
          <img src={logo} alt={"Icare App logo"} />
        </div>
        <div className="ic-header-name">ICare</div>
      </div>
      <div className="ic-body-container">{props.children}</div>
    </div>
  );
}
