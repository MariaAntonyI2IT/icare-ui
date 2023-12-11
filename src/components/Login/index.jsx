import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import RegistrationLayout from "./../../layouts/RegistrationLayout";
import { appConfig } from "../../utils/constants";
import { loginGoogleUser, loginUser } from "../../store/user/action";
import ShowAlert from "../../widgets/Alert";
import "./index.scss";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const [formObj, setFormObj] = useState({
    email: { value: "", error: "", dirty: false, isMandatory: true },
    password: { value: "", error: "", dirty: false, isMandatory: true },
  });
  const accountMenuOpen = Boolean(anchorEl);

  const onCreateAccountClick = (createOrganization) => {
    navigate("/create-account", { state: { createOrganization } });
    setAnchorEl(null);
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
        case "email":
          if (!value) {
            form[field].error = "Please enter Email/UID";
          } else if (!value.match(appConfig.mailRegex)) {
            form[field].error = "Please enter valid Email/UID";
          }
          break;

        case "password":
          if (!value) {
            form[field].error = "Please enter password";
          } else if (value.length < 7) {
            form[field].error = "Password should be more than 6 characters";
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
    if (isValidForm()) {
      const data = {
        email: formObj.email.value,
        password: formObj.password.value,
      };
      dispatch(
        loginUser(
          data,
          () => {
            navigate("/dashboard");
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const data = {
        accessToken: tokenResponse.access_token,
      };
      dispatch(
        loginGoogleUser(
          data,
          () => {
            navigate("/dashboard");
          },
          (errorMsg) => {
            setTimeout(() => {
              setAlertObj({ open: true, message: errorMsg, isSuccess: false });
            }, 100);
          }
        )
      );
    },
    onError: (err) => {
      setTimeout(() => {
        setAlertObj({ open: true, message: err.message, isSuccess: false });
      }, 100);
    },
  });

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

      <div className="ic-login-container">
        <div className="ic-login-wrapper">
          <div className="ic-name">Sign in</div>
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
          <div className="ic-form-fields">
            <TextField
              error={formObj.password.dirty && !!formObj.password.error}
              value={formObj.password.value}
              onChange={(e) => onValueChange(e, "password")}
              onBlur={() => onBlur("password")}
              label="Password"
              type={"password"}
              variant="outlined"
              autoComplete="new-password"
              fullWidth={true}
            />
            <div className="ic-form-error-msg">
              {formObj.password.dirty && formObj.password.error}
            </div>
          </div>
          <TextField value={"mock"} className={"ic-hide-form"} />
          <div className="ic-login">
            <Button variant="contained" onClick={() => onFormSubmit()}>
              Login
            </Button>
          </div>
        </div>
        <div className="ic-signup">
          <span className="ic-singnup-content">Don't have an account yet?</span>
          <Button
            className="ic-singnup-link"
            id="basic-button"
            aria-controls={accountMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={accountMenuOpen ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Create Account
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={accountMenuOpen}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => onCreateAccountClick(true)}>
              For Organization
            </MenuItem>
            <MenuItem onClick={() => onCreateAccountClick(false)}>
              For Contribution
            </MenuItem>
          </Menu>
        </div>
        <div className="ic-brk-wrapper">
          <div className="ic-brk">
            <span>OR</span>
          </div>
        </div>
        <div className="ic-btn-google">
          <Button
            variant="contained"
            onClick={() => googleLogin()}
            disableElevation={true}
            startIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </RegistrationLayout>
  );
}
