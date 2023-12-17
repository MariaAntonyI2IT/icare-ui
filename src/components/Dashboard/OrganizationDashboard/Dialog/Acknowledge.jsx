import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Acknowledge(props) {
  const { onClose, open, product, onConfirmation } = props;
  const [productData, setProductData] = useState({ ...product });

  const onConfirm = () => {
    onConfirmation(productData);
  };

  useEffect(() => {
    setProductData({ ...product });
  }, [product]);

  return (
    <>
      {productData.orderId && (
        <Dialog
          open={open}
          onClose={onClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to acknowledge the order (#
              {productData.orderId}) ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>No</Button>
            <Button onClick={onConfirm}>yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
