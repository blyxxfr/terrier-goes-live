import { Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import darkTheme from "./themes/darkTheme";
import { SettingsPage } from "./views/SettingsPage/SettingsPage";

const paperStyle = {
  background: "linear-gradient(#1d1c1c 0%, #242233 62.11%, #1d1c21 100%)"
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <Paper square style={paperStyle}>
        <Router>
          <Switch>
            <Route path="/settings" component={SettingsPage} />
            <Route component={App} />
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
