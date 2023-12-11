import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import Spinner from "./widgets/Spinner";

export default function App() {
  const app = useSelector((store) => store.app);
  return (
    <>
      <Spinner loading={app.loading} />
      <RouterProvider router={router} />
    </>
  );
}
