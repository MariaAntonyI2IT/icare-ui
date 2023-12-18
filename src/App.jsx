import {useSelector} from 'react-redux';
import { RouterProvider } from "react-router-dom";
import Spinner from "./widgets/Spinner";
import router from "./routes";

export default function App() {
  const user = useSelector(state => state.user);
  const login = useSelector((store) => store.login);
  const app = useSelector((store) => store.app);
  const loading = !user.initialized || login.loading;
  return (
    <>
      <Spinner loading={app.loading || loading} bg={'white'} />
      <RouterProvider router={router} />
    </>
  );
}
