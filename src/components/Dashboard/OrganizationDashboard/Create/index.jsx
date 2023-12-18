import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import { createOrganizationRequest } from "../../../../store/organization/action";
import Select from "@mui/material/Select";
import ShowAlert from "../../../../widgets/Alert";
import { products, categories, chips } from "../../../../utils/icare";
import "./index.scss";

export default function Create() {
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const navigate = useNavigate();
  const organizationProfile = useSelector(
    (state) => state.user.organizationProfile
  );
  const ngoTypes = [
    { value: "Children Home" },
    { value: "Oldage Home" },
    { value: "Specially Abled" },
  ];

  const newItem = {
    product: { value: products[0], error: "", isMandatory: true },
    quantity: {
      value: products[0].min,
      error: "",
      isMandatory: true,
      label: products[0].unit,
      min: products[0].min,
      max: products[0].max,
    },
  };
  const [itemList, setItemList] = useState([newItem]);
  const dispatch = useDispatch();
  const [formObj, setFormObj] = useState({
    name: { value: "", error: "", dirty: false, isMandatory: true },
    description: { value: "", error: "", dirty: false, isMandatory: true },
    type: {
      value: ngoTypes[0].value,
      error: "",
      dirty: false,
      isMandatory: true,
    },
    tag: {
      value: "Low",
      options: [
        {
          label: "Low",
          isSelected: true,
          color: chips.Low.color,
        },
        { label: "Medium", isSelected: false, color: chips.Medium.color },
        { label: "High", isSelected: false, color: chips.High.color },
      ],
      error: "",
      dirty: false,
      isMandatory: true,
    },
  });

  const getDDnOptions = () => {
    const options = [];
    Object.keys(categories).map((key) => {
      const category = categories[key];
      options.push({ type: "header", value: category });
      products
        .filter((product) => product.category === category)
        .map((product) => {
          options.push({ type: "content", value: product });
        });
    });
    return options;
  };

  const handleAlertClose = () => {
    setAlertObj({ open: false, message: "", isSuccess: false });
  };

  const onChipClick = (value) => {
    const form = { ...formObj };
    form["tag"].value = value;
    for (const option of form["tag"].options) {
      option.isSelected = option.label === value;
    }
    setFormObj(form);
  };

  const onItemDdnChange = (e, data, index) => {
    const item = data.props.value;
    const items = [...itemList];
    items[index]["product"].value = item;
    items[index]["quantity"].label = item.unit;
    items[index]["quantity"].min = item.min;
    items[index]["quantity"].max = item.max;
    setItemList(items);
  };

  const onTypeDdnChange = (e, data) => {
    const item = data.props.value;
    const form = { ...formObj };
    form.type.value = item;
    setFormObj(form);
  };

  const isValidProductForm = () => {
    const items = [...itemList];
    let isValid = true;
    for (const item of items) {
      const keys = Object.keys(item);
      for (const field of keys) {
        checkError(field, item);
        if (item[field].error && isValid) {
          isValid = false;
        }
      }
    }
    setItemList(items);
    return isValid;
  };

  const onItemValueChange = (e, field, index) => {
    const value = e.currentTarget.value;
    const items = [...itemList];
    items[index][field].value = value;
    setItemList(items);
  };

  const onAddBtnClick = () => {
    if (isValidProductForm()) {
      const items = [...itemList];
      items.push(newItem);
      setItemList(items);
    }
  };

  const onDeleteBtnClick = (index) => {
    const items = [...itemList];
    items.splice(index, 1);
    setItemList(items);
  };

  const onValueChange = (e, field) => {
    const value = e.currentTarget.value;
    const form = { ...formObj };
    form[field].value = value;
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
        case "name":
          if (!value) {
            form[field].error = "Please enter Name";
          }
          break;
        case "description":
          if (!value) {
            form[field].error = "Please enter Description";
          }
          break;
        case "product":
          if (!value) {
            form[field].error = "Product should not be empty";
          }
          break;
        case "quantity":
          if (!value) {
            form[field].error = "Product Quanitity should not be empty";
          }
          if (!(value >= form[field].min && value <= form[field].max)) {
            form[field].error = "Product Quanitity should be in limit";
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

  const onFormSubmit = () => {
    const validForm = isValidForm();
    const validProductForm = isValidProductForm();
    if (validForm && validProductForm) {
      const data = {
        name: formObj.name.value,
        description: formObj.description.value,
        tag: formObj.tag.value,
        orgId: organizationProfile.id,
        type: formObj.type.value,
        products: itemList.map((item) => {
          return {
            name: item.product.value.name,
            quantity: item.quantity.value,
            link: item.product.value.link,
            unit: item.quantity.label,
          };
        }),
      };

      dispatch(
        createOrganizationRequest(
          data,
          () => {
            setAlertObj({
              open: true,
              message: "Request created successfully",
              isSuccess: true,
            });
            navigate(0);
          },
          (errorMsg) => {
            setTimeout(() => {
              setAlertObj({ open: true, message: errorMsg, isSuccess: false });
            }, 100);
          }
        )
      );
    } else {
      updateDirtyCheck();
    }
  };

  return (
    <div className="ic-org-create-container">
      {alertObj.open ? (
        <ShowAlert
          alertOpen={true}
          message={alertObj.message}
          isScuccess={alertObj.isSuccess}
          handleAlertClose={() => handleAlertClose()}
        />
      ) : null}
      <div className="ic-org-body-header">Create Request</div>
      <div className="ic-form-fields">
        <TextField
          error={formObj.name.dirty && !!formObj.name.error}
          value={formObj.name.value}
          onChange={(e) => onValueChange(e, "name")}
          onBlur={() => onBlur("name")}
          label="Request Name"
          variant="outlined"
          autoComplete="new-password"
          fullWidth={true}
        />
        <div className="ic-form-error-msg">
          {formObj.name.dirty && formObj.name.error}
        </div>
      </div>
      <div className="ic-form-fields">
        <TextField
          error={formObj.description.dirty && !!formObj.description.error}
          value={formObj.description.value}
          onChange={(e) => onValueChange(e, "description")}
          onBlur={() => onBlur("description")}
          label="Description"
          variant="outlined"
          autoComplete="new-password"
          multiline={true}
          fullWidth={true}
        />
        <div className="ic-form-error-msg">
          {formObj.description.dirty && formObj.description.error}
        </div>
      </div>
      <div className="ic-form-fields">
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="ngo">Request Type</InputLabel>
          <Select
            defaultValue={formObj.type.value}
            value={formObj.type.value}
            error={!!formObj.type.error}
            id="ngo"
            label="Request Type"
            onChange={(e, item) => onTypeDdnChange(e, item)}
          >
            {ngoTypes.map((option, index) => {
              return (
                <MenuItem value={option.value} key={index}>
                  {option.value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="ic-form-fields ic-form-chips">
        {formObj.tag.options.map((option) => {
          return (
            <Chip
              key={option.label}
              label={option.label}
              variant={option.isSelected ? "filled" : "outlined"}
              color={option.color}
              onClick={() => onChipClick(option.label)}
            />
          );
        })}
      </div>
      <div className="ic-btn">
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => onAddBtnClick()}
          fullWidth={true}
        >
          Add Item
        </Button>
      </div>
      <div className="ic-form-fields">
        {itemList.map((item, index) => {
          return (
            <div className="ic-form-items" key={index}>
              <div className="ic-item">
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="grouped-select">Product</InputLabel>
                  <Select
                    defaultValue={item.product.value}
                    value={item.product.value}
                    error={!!item.product.error}
                    id="grouped-select"
                    label="Product"
                    onChange={(e, item) => onItemDdnChange(e, item, index)}
                  >
                    {getDDnOptions().map((option, index) => {
                      return option.type === "header" ? (
                        <ListSubheader sx={{ color: "#30a0b1" }} key={index}>
                          {option.value}
                        </ListSubheader>
                      ) : (
                        <MenuItem value={option.value} key={index}>
                          {option.value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <TextField
                error={!!item.quantity.error}
                value={item.quantity.value}
                onChange={(e) => onItemValueChange(e, "quantity", index)}
                label={item.quantity.label}
                variant="outlined"
                sx={{ minWidth: "60px" }}
                autoComplete="new-password"
                type={"number"}
                InputProps={{
                  inputProps: {
                    min: item.quantity.min,
                    max: item.quantity.max,
                  },
                }}
              />
              <IconButton
                className="ic-delete-icon"
                size="large"
                onClick={() => onDeleteBtnClick(index)}
                disabled={itemList.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className="ic-btn">
        <Button
          variant="contained"
          onClick={() => onFormSubmit()}
          fullWidth={true}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
