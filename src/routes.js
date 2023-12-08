import {createBrowserRouter,Link} from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import Button from '@material-ui/core/Button';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },{
    path: "/logout",
    element: <Logout />
  },{
    path: "/",
    element: (<>
    <Button variant="contained" color="primary">
  Primary
</Button>
      <nav>
        <ul>
          <li>
            <Link to={`login`}>Login</Link>
          </li>
          <li>
            <Link to={`logout`}>Logout</Link>
          </li>
        </ul>
      </nav></>)
  }
]);

export default router;