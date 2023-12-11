import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import RegistrationLayout from "./../../layouts/RegistrationLayout";
import { appConfig } from "../../utils/constants";
import { forgotPassword } from "../../store/user/action";
import ShowAlert from "../../widgets/Alert";
import "./index.scss";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const [formObj, setFormObj] = useState({
    email: { value: "", error: "", dirty: false, isMandatory: true },
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
        case "email":
          if (!value) {
            form[field].error = "Please enter Email/UID";
          } else if (!value.match(appConfig.mailRegex)) {
            form[field].error = "Please enter valid Email/UID";
          }
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
    if (isValidForm()) {
      const data = {
        email: formObj.email.value,
      };
      dispatch(
        forgotPassword(
          data,
          () => {
            navigate("/login");
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

  const handleAlertClose = () => {
    setAlertObj({ open: false, message: "", isSuccess: false });
  };

  return (
    <RegistrationLayout>
      {alertObj.open ? (
        <ShowAlert
          alertOpen={true}
          message={alertObj.message}
          isScuccess={alertObj.isSuccess}
          handleAlertClose={() => handleAlertClose()}
        />
      ) : null}

      <div className="ic-forgot-password-container">
        <div className="ic-forgot-password-wrapper">
          <div className="ic-name">Forgot Password</div>
          <div className="ic-form-fields">
            <TextField
              error={formObj.email.dirty && !!formObj.email.error}
              value={formObj.email.value}
              onChange={(e) => onValueChange(e, "email")}
              onBlur={() => onBlur("email")}
              label="Email/UID"
              variant="outlined"
              autoComplete="new-password"
              fullWidth={true}
            />
            <div className="ic-form-error-msg">
              {formObj.email.dirty && formObj.email.error}
            </div>
          </div>
          <TextField value={"mock"} className={"ic-hide-form"} />
          <div className="ic-forgot-password">
            <Button variant="contained" onClick={() => onFormSubmit()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  );
}
