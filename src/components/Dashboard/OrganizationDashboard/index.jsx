import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PendingIcon from "@mui/icons-material/Pending";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Create from "./Create";
import Progress from "./Progress";
import Completed from "./Completed";
import { organizationFacts } from "./../../../utils/icare";
import "./index.scss";

export default function OrganizationDashboard() {
  const [dashObj, setDashObj] = useState({
    create: {
      name: "Create Request",
      selected: false,
      icon: <AddCircleIcon />,
      component: <Create />,
    },
    progress: {
      name: "Current Request",
      badge: "10",
      selected: false,
      icon: <PendingIcon />,
      component: <Progress />,
    },
    completed: {
      name: "Completed Request",
      badge: "2",
      selected: false,
      icon: <CheckCircleIcon />,
      component: <Completed />,
    },
  });
  const [dashboard, selectedDashboard] = useState("");
  const onDashClick = (type) => {
    const obj = { ...dashObj };
    selectDash(obj, type);
    setDashObj(obj);
    selectedDashboard(type);
  };
  const selectDash = (obj, type) => {
    const keys = Object.keys(obj);
    for (const field of keys) {
      obj[field].selected = false;
    }
    obj[type].selected = true;
  };

  return (
    <div className="ic-org-dashboard-container">
      <div className="ic-org-header-container">
        <div className="ic-card-wrapper">
          {["create", "progress", "completed"].map((key) => {
            const dashboard = dashObj[key];
            return (
              <div
                className={`ic-card ${dashboard.selected ? "ic-selected" : ""}`}
                onClick={() => onDashClick(key)}
              >
                <div className="ic-card-content">
                  <Tooltip title={dashboard.name}>
                    <IconButton
                      className="ic-add-icon"
                      size="large"
                      disableRipple={true}
                    >
                      {dashboard.icon}
                    </IconButton>
                  </Tooltip>
                  <div className="ic-card-name">{dashboard.name}</div>
                  {dashboard.badge && (
                    <div className="ic-card-badge">{dashboard.badge}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ic-org-body-container">
        {dashboard ? (
          dashObj[dashboard].component
        ) : (
          <div className="ic-org-feed-container">
            <div className="ic-org-body-header">Did you know?</div>
            <div className="ic-org-feed-content">
              {organizationFacts.map((fact) => {
                return (
                  <div className="ic-card">
                    <div className="ic-card-content">
                      <IconButton className="ic-card-icon" size="large">
                        <InfoIcon />
                      </IconButton>
                      <div className="ic-card-info">{fact}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
