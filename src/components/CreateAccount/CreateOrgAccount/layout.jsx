import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

export const NGOForm = ({
  onValueChange,
  onBlur,
  verifyNgoOrganization,
  formObj,
  loading,
}) => {
  return (
    <>
      <div className="ic-form-fields">
        <TextField
          error={formObj.ngoId.dirty && !!formObj.ngoId.error}
          value={formObj.ngoId.value}
          onChange={(e) => onValueChange(e, "ngoId")}
          onBlur={() => onBlur("ngoId")}
          label="NGO ID"
          variant="outlined"
          autoComplete="new-password"
          fullWidth={true}
        />
        <div className="ic-form-error-msg">
          {formObj.ngoId.dirty && formObj.ngoId.error}
        </div>
      </div>
      <TextField value={"mock"} className={"ic-hide-form"} />
      <div className="ic-btn">
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={() => verifyNgoOrganization()}
          loadingPosition="start"
        >
          Verify
        </LoadingButton>
      </div>
    </>
  );
};

export const RegistrationComponent = ({ formObj, sendOtpForm, loading }) => {
  return (
    <>
      <div className="ic-form-fields">
        <TextField
          value={formObj.ngoId.value}
          label="NGO ID"
          variant="outlined"
          autoComplete="new-password"
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.name.value}
          label="Name"
          variant="outlined"
          autoComplete="new-password"
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.regNo.value}
          label="Registration Number"
          variant="outlined"
          autoComplete="new-password"
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.email.value}
          label="Email"
          variant="outlined"
          autoComplete="new-password"
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.state.value}
          label="State"
          variant="outlined"
          autoComplete="new-password"
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-btn">
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={() => sendOtpForm()}
          loadingPosition="start"
        >
          Next
        </LoadingButton>
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
  loading,
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
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={() => verifyOtpForm()}
          loadingPosition="start"
        >
          Verify
        </LoadingButton>
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
        value={formObj.uid.value}
        label="Login ID"
        disabled={true}
        variant="outlined"
        autoComplete="new-password"
        fullWidth={true}
      />
    </div>
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
