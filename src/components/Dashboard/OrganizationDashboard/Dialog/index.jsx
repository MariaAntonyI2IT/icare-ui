import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Acknowledge from "./Acknowledge";
import { useTheme } from "@mui/material/styles";
import "./index.scss";

export default function DialogModel(props) {
  const { onClose, data, open, type } = props;
  const [requestData, setRequestData] = useState({ ...data });
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [AckDialogOpen, setAckDialogOpen] = useState(false);
  const [ackProduct, setAckProduct] = useState();

  const onAcknowledgeClick = (product) => {
    setAckProduct(product);
    setAckDialogOpen(true);
  };

  const AckDialogClose = () => {
    setAckDialogOpen(false);
  };

  const onFormSubmit = (product) => {
    setAckDialogOpen(false);
    onClose();
  };

  useEffect(() => {
    setRequestData({ ...data });
  }, [data]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#30a0b1",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const Row = ({ product }) => {
    const [tableOpen, setTableOpen] = useState(false);
    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {product.name} ({product.qty} {product.unit})
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {product.orderId || ""}
          </StyledTableCell>
          {type === "progress" && (
            <StyledTableCell component="th" scope="row">
              <Button
                variant="contained"
                onClick={() => onAcknowledgeClick(product)}
                disabled={!!product.isAcknowledged || !product.orderId}
              >
                {!!product.isAcknowledged ? "Acknowledged" : "Acknowledge"}
              </Button>
            </StyledTableCell>
          )}
          <StyledTableCell>
            <IconButton
              disabled={!product.orderId}
              aria-label="expand row"
              size="small"
              onClick={() => setTableOpen(!tableOpen)}
            >
              {tableOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={tableOpen} timeout="auto" unmountOnExit>
              {product.orderedBy && (
                <div className="ic-order-details">
                  <div className="ic-form-fields">
                    <TextField
                      value={product.orderId}
                      label="Order Id"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={`${product.orderedBy.firstName}${
                        product.orderedBy.lastName
                          ? " " + product.orderedBy.lastName
                          : ""
                      }`}
                      label="Name"
                      variant="outlined"
                      disabled={true}
                      className={"ic-readOnly"}
                      autoComplete="new-password"
                      fullWidth={true}
                    />
                  </div>
                  {product.orderedBy.phoneNumber && (
                    <div className="ic-form-fields">
                      <TextField
                        value={product.orderedBy.phoneNumber}
                        label="Phone Number"
                        variant="outlined"
                        autoComplete="new-password"
                        disabled={true}
                        className={"ic-readOnly"}
                        fullWidth={true}
                      />
                    </div>
                  )}
                  <div className="ic-form-fields">
                    <TextField
                      value={product.orderedBy.mail}
                      label="Mail"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={new Date(product.orderDate).toDateString()}
                      label="Ordered date"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                </div>
              )}
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
  };

  return (
    requestData.name && (
      <>
        <Acknowledge
          open={AckDialogOpen}
          onClose={AckDialogClose}
          product={ackProduct}
          onConfirmation={onFormSubmit}
        />
        <Dialog
          onClose={onClose}
          open={open}
          fullWidth={true}
          fullScreen={isMatch}
        >
          <div className="ic-org-progress-dialog-container">
            <div className="ic-org-body-header-container">
              <div className="ic-org-body-header">Request detail</div>
              <IconButton className="ic-icon" onClick={onClose}>
                <Close />
              </IconButton>
            </div>
            <div className="ic-form-fields">
              <TextField
                value={requestData.name}
                label="Request Name"
                variant="outlined"
                autoComplete="new-password"
                disabled={true}
                className={"ic-readOnly"}
                fullWidth={true}
              />
            </div>
            <div className="ic-form-fields">
              <TextField
                value={requestData.description}
                label="Description"
                variant="outlined"
                autoComplete="new-password"
                disabled={true}
                className={"ic-readOnly"}
                multiline={true}
                fullWidth={true}
              />
            </div>
            <div className="ic-form-fields">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product</StyledTableCell>
                      <StyledTableCell>Order ID</StyledTableCell>
                      {type === "progress" && (
                        <StyledTableCell>Acknowledgement</StyledTableCell>
                      )}
                      <StyledTableCell>Order</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestData.products.map((product, index) => {
                      return <Row product={product} key={index} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Dialog>
      </>
    )
  );
}
