import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import "./index.scss";

export default function ContributorProfile() {
  const contributorProfile = useSelector(
    (state) => state.user.contributorProfile
  );

  return (
    <div className="ic-profile-wrapper">
      <div className="ic-profile-avatar-wrapper">
        {contributorProfile.avatar ? (
          <img
            className="ic-profile-avatar"
            src={contributorProfile.avatar}
            alt={"Contributor"}
          />
        ) : (
          <div className="ic-profile-avatar">
            {contributorProfile.firstName.substring(2, 0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="ic-profile-content-wrapper">
        <div className="ic-form-fields">
          <TextField
            value={contributorProfile.email}
            label="Email"
            variant="outlined"
            autoComplete="new-password"
            disabled={true}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={contributorProfile.firstName}
            label="First Name"
            variant="outlined"
            autoComplete="new-password"
            disabled={true}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={contributorProfile.lastName}
            label="Last Name"
            variant="outlined"
            autoComplete="new-password"
            disabled={true}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={contributorProfile.phoneNumber}
            label="Phone Name"
            variant="outlined"
            autoComplete="new-password"
            disabled={true}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
