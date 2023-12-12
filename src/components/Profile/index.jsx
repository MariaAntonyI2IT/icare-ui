import { useSelector } from "react-redux";
import Header from "../../layouts/Header";
import { appConfig } from "../../utils/constants";
import ContributorProfile from "./ContributorProfile";
import OrganizerProfile from "./OrganizerProfile";
import "./index.scss";

export default function Profile() {
  const userProfile = useSelector((state) => state.user.userProfile);
  return (
    <div className="ic-profile-layout">
      <Header />
      <div className="ic-profile-body-container">
        <div className="ic-profile-container">
          {userProfile === appConfig.profile.contributor ? (
            <ContributorProfile />
          ) : (
            <OrganizerProfile />
          )}
        </div>
      </div>
    </div>
  );
}
