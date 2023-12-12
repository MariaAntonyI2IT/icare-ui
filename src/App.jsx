import {useSelector} from 'react-redux';
import { RouterProvider } from "react-router-dom";
import Spinner from "./widgets/Spinner";
import router from "./routes";

export default function App() {
  const user = useSelector(state => state.user);
  const app = useSelector((store) => store.app);
  const loading = !user.initialized || app.loading;
  return (
    <>
      <Spinner loading={loading} bg={'white'} />
      <RouterProvider router={router} />
    </>
  );
}
