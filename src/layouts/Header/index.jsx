import { useDispatch, useSelector } from "react-redux";
import logo from "./../../assets/logo.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { clearProfile } from "./../../store/user/action";
import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from "@mui/material/IconButton";
import { clearSession } from "./../../utils/session";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function Header() {
  const avatar = useSelector((state) => state.user.contributorProfile.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOutClick = () => {
    clearSession();
    dispatch(clearProfile());
    navigate("/");
  };

  const onHomeBtnClick = () => {
    navigate("/");
  };

  const onProfileBtnClick = () => {
    navigate("/profile");
  };

  return (
    <div className="ic-header-container">
      <div className="ic-header-name-wrapper" onClick={() => onHomeBtnClick()}>
        <div className="ic-header-logo">
          <img src={logo} alt={"Icare App logo"} />
        </div>
        <div className="ic-header-name"> ICare </div>
      </div>
      <div className="ic-profile">
        {avatar ? (
          <img src={avatar} alt={"Avatar"} />
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
        <IconButton
          className="ic-bck-icon"
          size="large"
        >
          <NotificationsIcon />
        </IconButton>
      </div>
    </div>
  );
}
