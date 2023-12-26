import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./index.scss";
import { Link } from "react-router-dom";
import cover from "./../../../../assets/cover.jpg";
import Order from "./Order";

export default function DialogModel(props) {
  const { onClose, data, open, type, onOrderProduct } = props;
  const [requestData, setRequestData] = useState({ ...data });
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState();

  const onAcknowledgeClick = (product) => {
    window.open(
      `https://www.bigbasket.com/ps/?q=${encodeURIComponent(product.name)}`,
      "_blank"
    );
    setOrderProduct({
      ...product,
      organizationEmail: requestData.organization.email
    });
    setOrderDialogOpen(true);
  };

  const orderDialogClose = () => {
    setOrderDialogOpen(false);
  };

  const onFormSubmit = (product) => {
    setOrderDialogOpen(false);
    onClose();
    onOrderProduct(product);
  };

  useEffect(() => {
    setRequestData({ ...data });
  }, [data]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1342ad",
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
    return (
      <>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            <Link>
              {product.name} (in {product.unit})
            </Link>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {product.quantity}
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {type === "search" ? (
              <Button
                variant="contained"
                onClick={() => onAcknowledgeClick(product)}
              >
                Donate
              </Button>
            ) : (
              product.orderId
            )}
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
  };

  return (
    requestData.name && (
      <>
        <Order
          open={orderDialogOpen}
          onClose={orderDialogClose}
          product={orderProduct}
          onConfirmation={onFormSubmit}
        />
        <Dialog
          onClose={onClose}
          open={open}
          fullWidth={true}
          fullScreen={isMatch}
        >
          <img src={cover} className="ic-cover" />
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
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="ic-org-details">Organization details</div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.email}
                      label="Email"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.name}
                      label="Name"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.ngoId}
                      label="NGO ID"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.registrationNumber}
                      label="Registration Number"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      multiline={true}
                      value={requestData.organization.address}
                      label="Address"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.city}
                      label="City"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                  <div className="ic-form-fields">
                    <TextField
                      value={requestData.organization.state}
                      label="State"
                      variant="outlined"
                      autoComplete="new-password"
                      disabled={true}
                      className={"ic-readOnly"}
                      fullWidth={true}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="ic-form-fields">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
                      <StyledTableCell>
                        {type === "search" ? "Order" : "Order Id"}
                      </StyledTableCell>
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
