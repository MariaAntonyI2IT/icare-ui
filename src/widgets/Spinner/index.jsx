import { ThreeDots } from "react-loader-spinner";
import "./index.scss";

export default function Spinner({ loading, fullViewPort = true }) {
  return loading ? (
    <div className={`spinner-backdrop ${fullViewPort ? 'fullscreen' : ''}`}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#30a0b1"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  ) : null;
}
