import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { setupInterceptors } from "./services/interceptor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { updateToken } from "./store/user/reducer";
import { getSession } from "./utils/session";
import "./styles/index.scss";
import "./styles/widget.scss";
import { appConfig } from "./utils/constants";
import cover from "./assets/cover.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1342ad",
    },
  },
});
const token = getSession(appConfig.token);
const userTheme = getSession("theme");
if (!!token) {
  store.dispatch(updateToken(token));
}
if (userTheme && userTheme === "dark") {
  if (!document.getElementById("root").classList.contains("ic-dark")) {
    document.getElementById("root").classList.add("ic-dark");
  }
} else {
  if (document.getElementById("root").classList.contains("ic-dark")) {
    document.getElementById("root").classList.remove("ic-dark");
  }
}

setupInterceptors(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <img className="ic-cover" src={cover} alt="Cover" />
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </Provider>
);
