import {createBrowserRouter} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateAccount from './components/CreateAccount';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },{
    path: "/create-account",
    element: <CreateAccount />
  },{
    path: "/dashboard",
    element: <Dashboard />
  },{
    path: "/",
    element: <Login />
  }
]);

export default router;