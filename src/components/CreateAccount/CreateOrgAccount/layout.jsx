import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
        <Button
          variant="contained"
          onClick={() => verifyNgoOrganization()}
          startIcon={loading && <RefreshIcon className="ic-spin" />}
        >
          {loading ? "Loading" : "Verify"}
        </Button>
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
          className={'ic-readOnly'}
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
          className={'ic-readOnly'}
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-form-fields">
        <TextField
          value={formObj.registrationNumber.value}
          label="Registration Number"
          variant="outlined"
          autoComplete="new-password"
          className={'ic-readOnly'}
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
          className={'ic-readOnly'}
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
          className={'ic-readOnly'}
          disabled={true}
          fullWidth={true}
        />
      </div>
      <div className="ic-btn">
        <Button
          variant="contained"
          onClick={() => sendOtpForm()}
          startIcon={loading && <RefreshIcon className="ic-spin" />}
        >
          {loading ? "Loading" : "Next"}
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
        <Button
          variant="contained"
          onClick={() => verifyOtpForm()}
          startIcon={loading && <RefreshIcon className="ic-spin" />}
        >
          {loading ? "Loading" : "Verify"}
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
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  formObj,
}) => (
  <>
    <div className="ic-form-fields">
      <TextField
        value={formObj.uid.value}
        label="Login ID"
        disabled={true}
        className={'ic-readOnly'}
        variant="outlined"
        autoComplete="new-password"
        fullWidth={true}
      />
    </div>
    <div className="ic-form-fields">
      <FormControl variant="outlined" fullWidth={true}>
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={formObj.password.dirty && !!formObj.password.error}
        >
          Password
        </InputLabel>
        <OutlinedInput
          error={formObj.password.dirty && !!formObj.password.error}
          value={formObj.password.value}
          onChange={(e) => onValueChange(e, "password")}
          onBlur={() => onBlur("password")}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          autoComplete="new-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          fullWidth={true}
        />
      </FormControl>
      <div className="ic-form-error-msg">
        {formObj.password.dirty && formObj.password.error}
      </div>
    </div>
    <div className="ic-form-fields">
      <FormControl variant="outlined" fullWidth={true}>
        <InputLabel
          htmlFor="outlined-adornment-confirmPassword"
          error={
            formObj.confirmPassword.dirty && !!formObj.confirmPassword.error
          }
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          error={
            formObj.confirmPassword.dirty && !!formObj.confirmPassword.error
          }
          value={formObj.confirmPassword.value}
          onChange={(e) => onValueChange(e, "confirmPassword")}
          onBlur={() => onBlur("confirmPassword")}
          id="outlined-adornment-confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          autoComplete="new-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          fullWidth={true}
        />
      </FormControl>
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
