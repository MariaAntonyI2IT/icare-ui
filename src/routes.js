import {createBrowserRouter,Navigate} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CreateAccount from './components/CreateAccount';
import ProtectedRoute from './protectedRoute';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },{
    path: "/create-account",
    element: <CreateAccount />
  },
  {
    path: "/dash",
    element: <>
      <Dashboard />
    </>
  },{
    path: "/dashboard",
    element: <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  },{
    path: "/profile",
    element: <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  },
  {
    path: '/',
    element: <Navigate replace to="/dashboard" />
  },
  {
    path: '*',
    element: <Navigate replace to="/dashboard" />
  }
]);

export default router;