import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShowAlert from "../../../widgets/Alert";
import Spinner from "../../../widgets/Spinner";
import {
  registerOrganization,
  verifyOrganization,
  sendOtp,
  verifyOtp,
} from "../../../store/user/action";
import {
  NGOForm,
  OtpComponent,
  PasswordComponent,
  RegistrationComponent,
} from "./layout";
import "./index.scss";

export default function CreateOrgAccount() {
  const [ngoVerified, setNgoVerified] = useState(false);
  const [accVerified, setAccVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const [formObj, setFormObj] = useState({
    ngoId: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "ngo",
    },
    name: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: false,
      category: "account",
    },
    email: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: false,
      category: "account",
    },
    regNo: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: false,
      category: "account",
    },
    state: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: false,
      category: "account",
    },
    otp: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "otp",
    },
    uid: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "password",
    },
    password: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "password",
    },
    confirmPassword: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "password",
    },
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

  const updateDirtyCheck = (category) => {
    const keys = Object.keys(formObj);
    const form = { ...formObj };
    for (const field of keys) {
      if (category && category !== form[field].category) {
        continue;
      }
      form[field].dirty = true;
    }
    setFormObj(form);
  };

  const checkError = (field, form) => {
    if (form[field].isMandatory) {
      const value = form[field].value;
      form[field].error = "";
      switch (field) {
        case "ngoId":
          if (!value) {
            form[field].error = `Please enter NGO ID`;
          }
          break;
        case "otp":
          if (!value) {
            form[field].error = "Please enter OTP";
          } else if (value.length !== 6) {
            form[field].error = "OTP should be 6 digit";
          }
          break;
        case "password":
          if (!value) {
            form[field].error = "Please enter password";
          } else if (value.length < 7) {
            form[field].error = "Password should be more than 6 characters";
          }
          break;
        case "confirmPassword":
          if (
            form["password"].value &&
            form["password"].value !== form[field].value
          ) {
            form[field].error = "Password do not match";
          }
          break;
        default:
          break;
      }
    }
  };

  const isValidForm = (category) => {
    const keys = Object.keys(formObj);
    let isValid = true;
    const form = { ...formObj };
    for (const field of keys) {
      if (category && category !== form[field].category) {
        continue;
      }
      checkError(field, form);
      if (form[field].error && isValid) {
        isValid = false;
      }
    }
    setFormObj(form);
    return isValid;
  };

  const verifyNgoOrganization = () => {
    if (isValidForm('ngo')) {
      const obj = {
        ngoId: formObj.ngoId.value,
      };
      setLoading(true);
      dispatch(
        verifyOrganization(
          obj,
          (data) => {
            const keys = Object.keys(formObj);
            const form = { ...formObj };
            for (const field of keys) {
              form[field].value = data[field];
            }
            setFormObj(form);
            setNgoVerified(true);
            setLoading(false);
          },
          (errorMsg) => {
            setLoading(false);
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

  const sendOtpForm = (resend = false) => {
    if (isValidForm("account")) {
      setLoading(true);
      const obj = {
        email: formObj.email.value,
      };
      dispatch(
        sendOtp(
          obj,
          () => {
            if (resend) {
              setLoading(false);

              setTimeout(() => {
                setAlertObj({
                  open: true,
                  message: "OTP sent Successfully",
                  isSuccess: true,
                });
              }, 100);
            } else {
              setAccVerified(true);
              setLoading(false);
            }
          },
          (errorMsg) => {
            setTimeout(() => {
              setAlertObj({ open: true, message: errorMsg, isSuccess: false });
            }, 100);
          }
        )
      );
    } else {
      updateDirtyCheck("account");
    }
  };

  const verifyOtpForm = () => {
    if (isValidForm("otp")) {
      setLoading(true);
      const obj = {
        otp: formObj.otp.value,
      };
      dispatch(
        verifyOtp(
          obj,
          () => {
            setOtpVerified(true);
            setLoading(false);
          },
          (errorMsg) => {
            setTimeout(() => {
              setAlertObj({ open: true, message: errorMsg, isSuccess: false });
            }, 100);
          }
        )
      );
    } else {
      setLoading(false);
      updateDirtyCheck("otp");
    }
  };

  const onFormSubmit = () => {
    if (isValidForm()) {
      const obj = {
        email: formObj.email.value,
      };
      dispatch(
        registerOrganization(
          obj,
          () => {
            navigate("/login");
            setTimeout(() => {
              setAlertObj({
                open: true,
                message: "Account Created Successfully",
                isSuccess: true,
              });
            }, 100);
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

  const onBackBtnClick = () => {
    setNgoVerified(false);
  };

  const handleAlertClose = () => {
    setAlertObj({ open: false, message: "", isSuccess: false });
  };

  return (
    <>
      <Spinner loading={loading} fullViewPort={false} />
      <div className="ic-org-signup-container">
        {alertObj.open ? (
          <ShowAlert
            alertOpen={true}
            message={alertObj.message}
            isScuccess={alertObj.isSuccess}
            handleAlertClose={() => handleAlertClose()}
          />
        ) : null}
        <div className="ic-org-signup-wrapper">
          <div className="ic-name-wrapper">
            {ngoVerified && !accVerified && !otpVerified ? (
              <IconButton
                className="ic-bck-icon"
                size="large"
                onClick={() => onBackBtnClick()}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : null}
            <div className="ic-name">Create Account</div>
          </div>
          {!ngoVerified ? (
            <NGOForm
              onBlur={onBlur}
              onValueChange={onValueChange}
              verifyNgoOrganization={verifyNgoOrganization}
              formObj={formObj}
            />
          ) : !accVerified ? (
            <RegistrationComponent
              sendOtpForm={sendOtpForm}
              formObj={formObj}
            />
          ) : !otpVerified ? (
            <OtpComponent
              onBlur={onBlur}
              onValueChange={onValueChange}
              sendOtpForm={sendOtpForm}
              verifyOtpForm={verifyOtpForm}
              formObj={formObj}
            />
          ) : (
            <PasswordComponent
              onBlur={onBlur}
              onValueChange={onValueChange}
              onFormSubmit={onFormSubmit}
              formObj={formObj}
            />
          )}
        </div>
      </div>
    </>
  );
}
