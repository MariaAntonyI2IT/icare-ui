import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import "./index.scss";

export default function OrganizerProfile() {
  const organizerProfile = useSelector(
    (state) => state.user.organizationProfile
  );

  return (
    <div className="ic-profile-wrapper">
      <div className="ic-profile-avatar-wrapper">
        {organizerProfile.avatar ? (
          <img
            className="ic-profile-avatar"
            src={organizerProfile.avatar}
            alt={"Organizer"}
          />
        ) : (
          <div className="ic-profile-avatar">
            {organizerProfile.name.substring(2, 0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="ic-profile-content-wrapper">
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.email}
            label="Email"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.name}
            label="Name"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.ngoId}
            label="NGO ID"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.regNo}
            label="Registration Number"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.state}
            label="State"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            value={organizerProfile.city}
            label="City"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
        <div className="ic-form-fields">
          <TextField
            multiline={true}
            value={organizerProfile.address}
            label="Address"
            variant="outlined"
            autoComplete="new-password"
            inputprops={{
              readOnly: true,
            }}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
