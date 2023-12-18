import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DialogModel from "./../Dialog";
import VolunteerActivism from "@mui/icons-material/VolunteerActivism";
import Search from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { fetchContributorCurrentRequest } from "../../../../store/organization/action";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShowAlert from "../../../../widgets/Alert";
import { chips } from "../../../../utils/icare";
import "./index.scss";

export default function Progress({ onDataChange }) {
  const contributorProfile = useSelector(
    (state) => state.user.contributorProfile
  );
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const [opendialog, setOpendialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const dispatch = useDispatch();
  const [formObj, setFormObj] = useState({
    name: { value: "", error: "", dirty: false, isMandatory: true },
  });

  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(
      fetchContributorCurrentRequest(contributorProfile.id,
        (data) => {
          onDataChange(data);
          setRequestData(data);
        },
        (errorMsg) => {
          setTimeout(() => {
            setAlertObj({ open: true, message: errorMsg, isSuccess: false });
          }, 100);
        }
      )
    );
  };

  const handleAlertClose = () => {
    setAlertObj({ open: false, message: "", isSuccess: false });
  };

  const debounced = useCallback(debounce(fetchData, 1000), []);

  const onValueChange = (e, field) => {
    const value = e.currentTarget.value;
    const form = { ...formObj };
    form[field].value = value;
    setFormObj(form);
    debounced();
  };

  const onDialoglose = () => {
    fetchData();
    setOpendialog(false);
  };

  const onCardClick = (data) => {
    setSelectedRequest(data);
    setOpendialog(true);
  };

  return (
    <div className="ic-cont-progress-container">
      {alertObj.open ? (
        <ShowAlert
          alertOpen={true}
          message={alertObj.message}
          isScuccess={alertObj.isSuccess}
          handleAlertClose={() => handleAlertClose()}
        />
      ) : null}

      <div className="ic-cont-body-header">In Progress ...</div>
      <div className="ic-search">
        <div className="ic-form-fields">
          <TextField
            value={formObj.name.value}
            onChange={(e) => onValueChange(e, "name")}
            label="Search by name, description"
            variant="outlined"
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            fullWidth={true}
          />
        </div>
      </div>
      <div className="ic-card-container">
        {!requestData ? null : requestData.length ? (
          requestData.map((data, index) => {
            return (
              <div
                className="ic-card"
                onClick={() => onCardClick(data)}
                key={index}
              >
                <div className="ic-card-content">
                  <IconButton className="ic-icon" disableRipple={true}>
                    <VolunteerActivism />
                  </IconButton>
                  <div className="ic-tag-wrapper">
                    <Chip
                      className="ic-chip"
                      label={data.tag}
                      variant={"filled"}
                      color={chips[data.tag].color || "info"}
                      onClick={() => null}
                    />
                    <Chip
                      className="ic-chip"
                      label={data.type}
                      variant={"filled"}
                      color={"success"}
                      onClick={() => null}
                    />
                    <Chip
                      className="ic-chip"
                      label={data.organization.city}
                      variant={"filled"}
                      color={"info"}
                      icon={<LocationOnIcon />}
                      onClick={() => null}
                    />
                  </div>
                  <div className="ic-content-wrapper">
                    <div className="ic-name" title={data.name}>
                      {data.name}
                    </div>
                    <div className="ic-description" title={data.description}>
                      {data.description}
                    </div>
                    <div className="ic-org">
                      <div className="ic-org-createdby">Posted by</div>
                      <div className="ic-org-name">
                        {data.organization.name}
                      </div>
                    </div>
                  </div>
                  <div className="ic-footer-wrapper">
                    <div className="ic-status-wrapper">
                      <div className="ic-badge">{data.products.length}</div>
                      <div className="ic-badge-content">Product(s)</div>
                    </div>
                    <div className="ic-date">
                      {new Date(data.raisedDate).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="ic-no-data">No Data Found</div>
        )}
      </div>
      <DialogModel
        type="progress"
        open={opendialog}
        data={selectedRequest}
        onClose={onDialoglose}
      />
    </div>
  );
}
