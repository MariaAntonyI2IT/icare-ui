import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const user = useSelector(state => state.user);
  const login = useSelector((store) => store.login);
  const loading = !user.initialized || login.loading;
  return !loading ? (user.isLoggedIn ? children : <Navigate to="/" />) : null;
}