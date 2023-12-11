import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { setupInterceptors } from "./services/interceptor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./styles/index.scss";
import "./styles/widget.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#30a0b1",
    },
  },
});
setupInterceptors(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </Provider>
);
