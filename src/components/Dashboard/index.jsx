import { useSelector } from "react-redux";
import Header from "../../layouts/Header";
import OrganizationDashboard from "./OrganizationDashboard";
import ContributorDashboard from "./ContributorDashboard";
import { appConfig } from "../../utils/constants";
import "./index.scss";

export default function Dashboard() {
  const userProfile = useSelector((state) => state.user.userProfile);
  return (
    <div className="ic-dashboard-container">
      <Header />
      <div className="ic-body-container">
        {userProfile === appConfig.profile.organizer ? (
          <ContributorDashboard />
        ) : (
          <OrganizationDashboard />
        )}
      </div>
    </div>
  );
}
