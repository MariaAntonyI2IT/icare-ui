import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../../store/user/action";
import "./index.scss";

const Login = (props) => {
  const dispatch = useDispatch();
  const val = useSelector((state) => state.user.value);
  const onBtnClick = () => {
    dispatch(fetchUser());
  };

  return (
    <div>
      <h2 onClick={() => onBtnClick()}>Login Page</h2>
      <h3>{val}</h3>
    </div>
  );
};

export default Login;
