import {createBrowserRouter,Navigate} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CreateAccount from './components/CreateAccount';
import ProtectedRoute from './protectedRoute';
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },{
    path: "/create-account",
    element: <CreateAccount />
  },
  {
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
    path: '*',
    element: <Navigate replace to="/dashboard" />
  }
]);

export default router;