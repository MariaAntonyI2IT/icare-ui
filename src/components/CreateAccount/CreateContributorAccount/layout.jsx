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

export const RegistrationComponent = ({
  onValueChange,
  onBlur,
  sendOtpForm,
  formObj,
  loading,
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
