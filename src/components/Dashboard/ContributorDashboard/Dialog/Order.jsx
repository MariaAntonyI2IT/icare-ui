import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Order(props) {
  const { onClose, open, product, onConfirmation } = props;
  const [productData, setProductData] = useState({ ...product });

  const [formObj, setFormObj] = useState({
    orderId: { value: "", error: "", dirty: false, isMandatory: true },
  });

  const onValueChange = (e, field) => {
    const value = e.currentTarget.value;
    const form = { ...formObj };
    form[field].value = value.trim();
    checkError(field, form);
    setFormObj(form);
  };

  const onBlur = (field) => {
    const form = { ...formObj };
    form[field].dirty = true;
    setFormObj(form);
  };

  const updateDirtyCheck = () => {
    const keys = Object.keys(formObj);
    const form = { ...formObj };
    for (const field of keys) {
      form[field].dirty = true;
    }
    setFormObj(form);
  };

  const checkError = (field, form) => {
    if (form[field].isMandatory) {
      const value = form[field].value;
      form[field].error = "";
      switch (field) {
        case "orderId":
          if (!value) {
            form[field].error = "Please enter Order Id";
          }
          break;
        default:
          break;
      }
    }
  };

  const isValidForm = () => {
    const keys = Object.keys(formObj);
    let isValid = true;
    const form = { ...formObj };
    for (const field of keys) {
      checkError(field, form);
      if (form[field].error && isValid) {
        isValid = false;
      }
    }
    setFormObj(form);
    return isValid;
  };

  const onConfirm = () => {
    if (isValidForm()) {
      const data = {
        ...productData,
        orderId: formObj.orderId.value,
      };
      onConfirmation(data);
      const form = { ...formObj };
      form.orderId.value = "";
      form.orderId.error = "";
      form.orderId.dirty = false;
      setFormObj(form);
    } else {
      updateDirtyCheck();
    }
  };

  const onNonConfirmation = () => {
    const form = { ...formObj };
    form.orderId.value = "";
    form.orderId.error = "";
    form.orderId.dirty = false;
    setFormObj(form);
    onClose();
  };

  useEffect(() => {
    setProductData({ ...product });
  }, [product]);

  return (
    <>
      {productData.name && (
        <Dialog
          className="ic-order-dialog"
          open={open}
          onClose={onClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Order Confirmation"}</DialogTitle>
          <DialogContent>
            <div className="ic-form-fields">
              <TextField
                error={formObj.orderId.dirty && !!formObj.orderId.error}
                value={formObj.orderId.value}
                onChange={(e) => onValueChange(e, "orderId")}
                onBlur={() => onBlur("orderId")}
                label="Order Id"
                variant="outlined"
                autoComplete="new-password"
                fullWidth={true}
              />
              <div className="ic-form-error-msg">
                {formObj.orderId.dirty && formObj.orderId.error}
              </div>
            </div>
            <DialogContentText id="alert-dialog-slide-description">
              Please double-check the order ID. Are you sure that the order ID
              entered is correct?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onNonConfirmation}>No</Button>
            <Button onClick={onConfirm}>yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
