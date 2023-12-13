import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../../../widgets/Alert";
import { useDispatch } from "react-redux";
import {
  registerContributor,
  sendOtp,
  verifyOtp,
} from "../../../store/user/action";
import { appConfig } from "../../../utils/constants";
import {
  OtpComponent,
  PasswordComponent,
  RegistrationComponent,
} from "./layout";
import "./index.scss";

export default function CreateContributorAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertObj, setAlertObj] = useState({
    open: false,
    message: "",
    isSuccess: true,
  });
  const [formObj, setFormObj] = useState({
    email: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "account",
    },
    firstName: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "account",
    },
    lastName: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: false,
      category: "account",
    },
    phoneNumber: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "account",
    },
    otp: {
      value: "",
      error: "",
      dirty: false,
      isMandatory: true,
      category: "otp",
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

  const [accVerified, setAccVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  const checkError = (field, form) => {
    if (form[field].isMandatory) {
      const value = form[field].value;
      form[field].error = "";
      switch (field) {
        case "email":
          if (!value) {
            form[field].error = "Please enter Email";
          } else if (!value.match(appConfig.mailRegex)) {
            form[field].error = "Please enter valid Email";
          }
          break;

        case "firstName":
          if (!value) {
            form[field].error = "Please enter first name";
          }
          break;
        case "otp":
          if (!value) {
            form[field].error = "Please enter OTP";
          } else if (value.length !== 6) {
            form[field].error = "OTP should be 6 digit";
          }
          break;
        case "phoneNumber":
          if (value && value.length !== 10) {
            form[field].error = "Phone number should be 10 digit";
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
        firstName: formObj.firstName.value,
        lastName: formObj.lastName.value,
        phoneNumber: formObj.phoneNumber.value,
      };
      dispatch(
        registerContributor(
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

  const handleAlertClose = () => {
    setAlertObj({ open: false, message: "", isSuccess: false });
  };

  return (
    <>
      <div className="ic-contributor-signup-container">
        {alertObj.open ? (
          <ShowAlert
            alertOpen={true}
            message={alertObj.message}
            isScuccess={alertObj.isSuccess}
            handleAlertClose={() => handleAlertClose()}
          />
        ) : null}
        <div
          className={`ic-contributor-signup-wrapper ${
            loading ? "loading" : ""
          }`}
        >
          <div className="ic-name">Create Account</div>
          {!accVerified ? (
            <RegistrationComponent
              onBlur={onBlur}
              onValueChange={onValueChange}
              sendOtpForm={sendOtpForm}
              formObj={formObj}
              loading={loading}
            />
          ) : !otpVerified ? (
            <OtpComponent
              onBlur={onBlur}
              onValueChange={onValueChange}
              sendOtpForm={sendOtpForm}
              verifyOtpForm={verifyOtpForm}
              formObj={formObj}
              loading={loading}
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
