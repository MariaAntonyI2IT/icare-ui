import userReducer from './user/reducer';
import appReducer from './app/reducer';
import loginReducer from './login/reducer';

const reducers = {
  user: userReducer,
  app: appReducer,
  login: loginReducer
};

export default reducers;