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
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Paper from "@mui/material/Paper";
import "./index.scss";

export default function DialogModel(props) {
  const { onClose, data, open, isReadOnly } = props;
  const [requestData, setRequestData] = useState({ ...data });

  const onChange = (e, index) => {
    const isChecked = e.currentTarget.checked;
    const reqData = { ...requestData };
    if (reqData.products[index].oldValue === undefined) {
      reqData.products[index].oldValue = reqData.products[index].isAcknowledged;
    }
    reqData.products[index].isAcknowledged = isChecked;
    reqData.products[index].canChange = true;

    setRequestData(reqData);
  };

  const onFormSubmit = () => {
    console.log(requestData);
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

  const Row = ({ product, index, onChange }) => {
    const [tableOpen, setTableOpen] = useState(false);
    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {product.name} ({product.qty})
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            <Checkbox
              onChange={(e) => onChange(e, index)}
              checked={!!product.isAcknowledged}
              disabled={
                !product.orderId ||
                (product.isAcknowledged && !product.canChange)
              }
            />
          </StyledTableCell>
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
                      className={'ic-readOnly'}
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
      <Dialog onClose={onClose} open={open} fullWidth={true}>
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
                    <StyledTableCell>Order received</StyledTableCell>
                    <StyledTableCell>Order</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestData.products.map((product, index) => {
                    return (
                      <Row
                        product={product}
                        index={index}
                        onChange={onChange}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {!isReadOnly && (
            <div className="ic-btn">
              <Button
                variant="contained"
                fullWidth={true}
                onClick={onFormSubmit}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    )
  );
}
