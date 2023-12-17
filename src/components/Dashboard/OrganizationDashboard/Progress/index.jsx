import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DialogModel from "./../Dialog";
import VolunteerActivism from "@mui/icons-material/VolunteerActivism";
import Search from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { fetchOrganizationCurrentRequest } from "../../../../store/organization/action";
import "./index.scss";
import { chips } from "../../../../utils/icare";

export default function Progress({ onDataChange }) {
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
      fetchOrganizationCurrentRequest({}, (data) => {
        onDataChange(data);
        setRequestData(data);
      }),
      () => {}
    );
  };

  const debounced = useCallback(debounce(fetchData, 1000), []);

  const onValueChange = (e, field) => {
    const value = e.currentTarget.value;
    const form = { ...formObj };
    form[field].value = value.trim();
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
    <div className="ic-org-progress-container">
      <div className="ic-org-body-header">Current Request</div>
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
                      label={data.tag}
                      variant={"filled"}
                      color={chips[data.tag].color || "info"}
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
                  </div>
                  <div className="ic-footer-wrapper">
                    <div className="ic-status-wrapper">
                      <div className="ic-badge">
                        {data.products.filter((p) => !!p.isAcknowledged).length}
                        /{data.products.length}
                      </div>
                      <div className="ic-badge-content">Completed</div>
                    </div>
                    <div className="ic-date">
                      {new Date(data.createdDate).toDateString()}
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
        type={"progress"}
        open={opendialog}
        data={selectedRequest}
        onClose={onDialoglose}
      />
    </div>
  );
}
