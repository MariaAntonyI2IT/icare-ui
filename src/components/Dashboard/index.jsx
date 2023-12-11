import { useSelector } from "react-redux";
import logo from "./../../assets/logo.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import "./index.scss";

export default function Dashboard() {
  const contributorProfile = useSelector(
    (state) => state.user.contributorProfile
  );
  return (
    <div className="ic-dashboard-container">
      <div className="ic-header-container">
        <div className="ic-header-name-wrapper">
          <div className="ic-header-logo">
            <img src={logo} alt={"Icare App logo"} />
          </div>
          <div className="ic-header-name"> ICare </div>
        </div>
        <div className="ic-profile">
          <IconButton className="ic-bck-icon" size="large">
            <AccountCircle />
          </IconButton>
        </div>
      </div>
      <div className="ic-body-container">
        <div>Landing Page</div>
        <div>Email: {contributorProfile.email}</div>
        <div>First Name: {contributorProfile.firstName}</div>
        <div>Last Name: {contributorProfile.lastName}</div>
      </div>
    </div>
  );
}
