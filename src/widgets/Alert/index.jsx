import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function ShowAlert({ alertOpen, isScuccess, message, handleAlertClose }) {
  const severity = isScuccess ? "success" : "error";
  const [open, setOpen] = useState(alertOpen);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    handleAlertClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
