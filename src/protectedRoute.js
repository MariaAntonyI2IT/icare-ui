import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const user = useSelector(state => state.user);
  const app = useSelector((store) => store.app);
  const loading = !user.initialized || app.loading;
  console.log(loading, user.isLoggedIn)
  return !loading ? (user.isLoggedIn ? children : <Navigate to="/login" />) : null;
}