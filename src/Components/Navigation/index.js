import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, NavLink, Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function Header() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ce93d8",
      },
      secondary: {
        main: "#ef9a9a",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <AppBar color="secondary">
          <Toolbar>
            <NavLink to="/email">
              <Typography variant="button" style={{ padding: "10px" }}>
                Email
              </Typography>
            </NavLink>
            <NavLink to="/whatsapp">
              <Typography variant="button" style={{ padding: "10px" }}>
                Whatsapp
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Header;
