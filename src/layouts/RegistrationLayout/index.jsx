import logo from "./../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function RegistrationLayout(props) {
  const navigate = useNavigate();
  const onHomeBtnClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="ic-registration-container">
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
