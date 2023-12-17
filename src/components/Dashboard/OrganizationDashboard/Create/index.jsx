import { useState } from "react";
import { useDispatch } from "react-redux";
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
import Select from "@mui/material/Select";
import "./index.scss";
import { products, categories } from "../../../../utils/icare";

export default function Create() {
  const [formObj, setFormObj] = useState({
    name: { value: "", error: "", dirty: false, isMandatory: true },
    description: { value: "", error: "", dirty: false, isMandatory: true },
    tag: {
      value: "Non-urgent",
      options: [
        { label: "Non-urgent", isSelected: true, color: "info" },
        { label: "Normal", isSelected: false, color: "secondary" },
        { label: "Urgent", isSelected: false, color: "warning" },
        { label: "Emergency", isSelected: false, color: "error" },
      ],
      error: "",
      dirty: false,
      isMandatory: true,
    },
  });

  const newItem = {
    product: { value: products[0], error: "", isMandatory: true },
    qty: {
      value: products[0].min,
      error: "",
      isMandatory: true,
      label: products[0].unit,
      min: products[0].min,
      max: products[0].max,
    },
  };

  const getDDnOptions = () => {
    const options = [];
    Object.keys(categories).map((key) => {
      const category = categories[key];
      options.push({ type: "header", value: category });
      products
        .filter((product) => product.category == category)
        .map((product) => {
          options.push({ type: "content", value: product });
        });
    });
    return options;
  };

  const [itemList, setItemList] = useState([newItem]);

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
    items[index]["qty"].label = item.unit;
    items[index]["qty"].min = item.min;
    items[index]["qty"].max = item.max;
    setItemList(items);
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
    items[index][field].value = value.trim();
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
        case "qty":
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
        products: itemList.map((item) => {
          return {
            name: item.product.value.name,
            qty: item.qty.value,
            unit: item.qty.label,
          };
        }),
      };
    } else {
      updateDirtyCheck();
    }
  };

  return (
    <div className="ic-org-create-container">
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
      <div className="ic-form-fields ic-form-chips">
        {formObj.tag.options.map((option) => {
          return (
            <Chip
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
            <div className="ic-form-items">
              <div className="ic-item">
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="grouped-select">Product</InputLabel>
                  <Select
                    defaultValue={item.product.value}
                    value={item.product.value}
                    error={!!item.product.error}
                    id="grouped-select"
                    label="Grouping"
                    onChange={(e, item) => onItemDdnChange(e, item, index)}
                  >
                    {getDDnOptions().map((option) => {
                      return option.type == "header" ? (
                        <ListSubheader sx={{ color: "#30a0b1" }}>
                          {option.value}
                        </ListSubheader>
                      ) : (
                        <MenuItem value={option.value}>
                          {option.value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <TextField
                error={item.qty.error}
                value={item.qty.value}
                onChange={(e) => onItemValueChange(e, "qty", index)}
                label={item.qty.label}
                variant="outlined"
                sx={{ minWidth: "60px" }}
                autoComplete="new-password"
                type={"number"}
                InputProps={{
                  inputProps: { min: item.qty.min, max: item.qty.max },
                }}
              />
              <IconButton
                className="ic-delete-icon"
                size="large"
                onClick={() => onDeleteBtnClick(index)}
                disabled={itemList.length == 1}
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
