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
import {
  fetchContributorSearchRequest,
  donateContributorRequest,
} from "../../../../store/organization/action";
import ShowAlert from "../../../../widgets/Alert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { chips } from "../../../../utils/icare";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./index.scss";
import { getFilteredRequestData } from "../../../../utils";

export default function SearchComponent({ onDataChange }) {
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
    name: { value: "", error: "", dirty: false, isMandatory: false },
    type: { value: "", error: "", dirty: false, isMandatory: false },
    priority: { value: "", error: "", dirty: false, isMandatory: false },
    category: { value: "", error: "", dirty: false, isMandatory: false },
  });

  const [requestData, setRequestData] = useState(null);

  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (dataList = null) => {
    const payload = {
      searchText: formObj.name.value,
      filter: {
        type: formObj.type.value,
        priority: formObj.priority.value,
        category: formObj.category.value,
      },
    };
    if (dataList) {
      setRequestData(getFilteredRequestData(dataList, payload));
    } else {
      dispatch(
        fetchContributorSearchRequest(
          {},
          (data) => {
            onDataChange(data);
            setRequestData(data);
            const filteredData = getFilteredRequestData(data, payload);
            setRequestData(filteredData);
            setFullData(data);
          },
          (errorMsg) => {
            setTimeout(() => {
              setAlertObj({ open: true, message: errorMsg, isSuccess: false });
            }, 100);
          }
        )
      );
    }
  };

  const orderProduct = (product) => {
    const data = {
      productId: product.id,
      contributorId: contributorProfile.id,
      orderId: product.orderId,
    };
    dispatch(
      donateContributorRequest(
        data,
        () => {
          setAlertObj({
            open: true,
            message: "Product Donated Successfully",
            isSuccess: true,
          });
          fetchData();
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

  const debounced = useCallback(debounce(fetchData, 300), []);

  const onSortChange = (e, item, type) => {
    const value = item.props.value;
    const form = { ...formObj };
    form[type].value = value;
    setFormObj(form);
    fetchData(fullData);
  };

  const onValueChange = (e, field) => {
    const value = e.currentTarget.value;
    const form = { ...formObj };
    form[field].value = value;
    setFormObj(form);
    debounced(fullData);
  };

  const onDialoglose = () => {
    fetchData(fullData);
    setOpendialog(false);
  };

  const onCardClick = (data) => {
    setSelectedRequest(data);
    setOpendialog(true);
  };

  return (
    <div className="ic-cont-search-container">
      {alertObj.open ? (
        <ShowAlert
          alertOpen={true}
          message={alertObj.message}
          isScuccess={alertObj.isSuccess}
          handleAlertClose={() => handleAlertClose()}
        />
      ) : null}

      <div className="ic-cont-body-header">Search Request</div>
      <div className="ic-search">
        <div className="ic-form-fields">
          <TextField
            value={formObj.name.value}
            onChange={(e) => onValueChange(e, "name")}
            label="Request Name"
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
      <div className="ic-sort">
        <div className="ic-form-fields">
          <FormControl fullWidth={true}>
            <InputLabel id="demo-select-small-label">Priority</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={formObj.priority.value}
              onChange={(e, item) => onSortChange(e, item, "priority")}
              label="Priority"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="ic-form-fields">
          <FormControl fullWidth={true}>
            <InputLabel id="demo-select-small-label">Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={formObj.type.value}
              onChange={(e, item) => onSortChange(e, item, "type")}
              label="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Children Home"}>Children Home</MenuItem>
              <MenuItem value={"Oldage Home"}>Oldage Home</MenuItem>
              <MenuItem value={"Specially Abled"}>Specially Abled</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="ic-form-fields">
          <FormControl fullWidth={true}>
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={formObj.category.value}
              onChange={(e, item) => onSortChange(e, item, "category")}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Grocery"}>Grocery</MenuItem>
              <MenuItem value={"Stationery"}>Stationery</MenuItem>
            </Select>
          </FormControl>
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
                </div>
              </div>
            );
          })
        ) : (
          <div className="ic-no-data">No Data Found</div>
        )}
      </div>
      <DialogModel
        type="search"
        onOrderProduct={orderProduct}
        open={opendialog}
        data={selectedRequest}
        onClose={onDialoglose}
      />
    </div>
  );
}
