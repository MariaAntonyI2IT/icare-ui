import Header from "../../layouts/Header";
import OrganizationDashboard from "./OrganizationDashboard";
import "./index.scss";

export default function Dashboard() {
  return (
    <div className="ic-dashboard-container">
      <Header />
      <div className="ic-body-container">
        <OrganizationDashboard />
      </div>
    </div>
  );
}
