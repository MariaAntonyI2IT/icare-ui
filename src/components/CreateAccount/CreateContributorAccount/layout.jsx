import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const RegistrationComponent = ({
  onValueChange,
  onBlur,
  sendOtpForm,
  formObj,
}) => {
  return (
    <>
      <div className="ic-form-fields">
        <TextField
          error={formObj.email.dirty && !!formObj.email.error}
          value={formObj.email.value}
          onChange={(e) => onValueChange(e, "email")}
          onBlur={() => onBlur("email")}
          label="Email"
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
          error={formObj.firstName.dirty && !!formObj.firstName.error}
          value={formObj.firstName.value}
          onChange={(e) => onValueChange(e, "firstName")}
          onBlur={() => onBlur("firstName")}
          label="First Name"
          variant="outlined"
          autoComplete="new-password"
          fullWidth={true}
        />
        <div className="ic-form-error-msg">
          {formObj.firstName.dirty && formObj.firstName.error}
        </div>
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.lastName.value}
          onChange={(e) => onValueChange(e, "lastName")}
          label="Last Name (Optional)"
          variant="outlined"
          autoComplete="new-password"
          fullWidth={true}
        />
        <div className="ic-form-error-msg">{formObj.lastName.error}</div>
      </div>
      <div className="ic-form-fields">
        <TextField
          error={formObj.phoneNumber.dirty && !!formObj.phoneNumber.error}
          value={formObj.phoneNumber.value}
          onChange={(e) => onValueChange(e, "phoneNumber")}
          label="Phone Number (Optional)"
          variant="outlined"
          autoComplete="new-password"
          type={"number"}
          fullWidth={true}
        />
        <div className="ic-form-error-msg">{formObj.phoneNumber.error}</div>
      </div>
      <TextField value={"mock"} className={"ic-hide-form"} />
      <div className="ic-btn">
        <Button variant="contained" onClick={() => sendOtpForm()}>
          Next
        </Button>
      </div>
    </>
  );
};

export const OtpComponent = ({
  onValueChange,
  onBlur,
  verifyOtpForm,
  sendOtpForm,
  formObj,
}) => (
  <>
    <div className="otp-wrapper">
      <div className="ic-form-fields">
        <TextField
          error={formObj.otp.dirty && !!formObj.otp.error}
          value={formObj.otp.value}
          onChange={(e) => onValueChange(e, "otp")}
          onBlur={() => onBlur("otp")}
          label="OTP"
          variant="outlined"
          type={"number"}
          autoComplete="new-password"
          fullWidth={true}
        />
        <div className="ic-form-error-msg">
          {formObj.otp.dirty && formObj.otp.error}
        </div>
      </div>
      <div className="ic-btn">
        <Button variant="contained" onClick={() => verifyOtpForm()}>
          Verify
        </Button>
      </div>
    </div>
    <div className="ic-resend-otp">
      <span className="ic-resend-otp-content">
        Didn't receive an email? &nbsp;
      </span>
      <span className="ic-resend-otp-link" onClick={() => sendOtpForm(true)}>
        Resend OTP
      </span>
    </div>
  </>
);

export const PasswordComponent = ({
  onValueChange,
  onBlur,
  onFormSubmit,
  formObj,
}) => (
  <>
    <div className="ic-form-fields">
      <TextField
        error={formObj.password.dirty && !!formObj.password.error}
        value={formObj.password.value}
        onChange={(e) => onValueChange(e, "password")}
        onBlur={() => onBlur("password")}
        label="Password"
        variant="outlined"
        autoComplete="new-password"
        fullWidth={true}
      />
      <div className="ic-form-error-msg">
        {formObj.password.dirty && formObj.password.error}
      </div>
    </div>
    <div className="ic-form-fields">
      <TextField
        error={formObj.confirmPassword.dirty && !!formObj.confirmPassword.error}
        value={formObj.confirmPassword.value}
        onChange={(e) => onValueChange(e, "confirmPassword")}
        onBlur={() => onBlur("confirmPassword")}
        label="Confirm Password"
        variant="outlined"
        autoComplete="new-password"
        fullWidth={true}
      />
      <div className="ic-form-error-msg">
        {formObj.confirmPassword.dirty && formObj.confirmPassword.error}
      </div>
    </div>
    <div className="ic-btn">
      <Button variant="contained" onClick={() => onFormSubmit()}>
        Create
      </Button>
    </div>
  </>
);
