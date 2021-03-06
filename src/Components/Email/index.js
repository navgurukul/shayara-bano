import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import FileUploader from "./FileUploader";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link target="_blank" color="inherit" href="https://navgurukul.org/">
        NavGurukul
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  csvFileText: {
    backgroundColor: "slategrey",
  },

  attachmentsText: {
    backgroundColor: "slategrey",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: "60px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Email() {
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

  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    mailBody: "",
    mailSubject: "",
    cc: "",
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearUploads = () => {
    console.log("Will be cleared");
    axios
      .get("/api/clearUploads")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadSample = () => {
    axios
      .get("/api/downloadSample")
      .then((res) => {
        window.open("/api/downloadSample");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/sendEmail", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography>
            In order to use this tool you need to turn on this feature. <br />
            <Link
              href="https://www.google.com/settings/security/lesssecureapps"
              target="_blank"
              // color="white"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                backgroundColor: "#ef9a9a33",
              }}
            >
              Click Here
            </Link>{" "}
            to turn on Less Secure Apps
          </Typography>
          <Typography
            style={{ marginBottom: "30px" }}
            component="h1"
            variant="h5"
          >
            Write an email!
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} sm={6}>
              <Card>
                <Typography className={classes.attachmentsText}>
                  <p style={{ marginTop: "10px" }}>Upload Attachments: </p>
                </Typography>
                <Grid item md={6} sm={6}>
                  <FileUploader fileType="image/*, application/pdf" />
                </Grid>
              </Card>
            </Grid>

            <Grid item md={6} sm={4}>
              <Card>
                <Typography className={classes.csvFileText}>
                  Upload contacts CSV file:{" "}
                  <Button
                    style={{
                      textDecoration: "none",
                      fontWeight: 700,
                      backgroundColor: "#ef9a9a33",
                    }}
                    onClick={downloadSample}
                  >
                    Click Here
                  </Button>{" "}
                  to download sample csv file
                </Typography>

                <Grid item md={6} sm={4}>
                  <FileUploader fileType=".csv" />
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="CC"
                  placeholder="Comma separated emails (xyz@gmail.com, abc@gmail.com)"
                  name="cc"
                  autoComplete="off"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="mailSubject"
                  label="Email Subject"
                  type="text"
                  id="subject"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Email"
                  name="mailBody"
                  fullWidth
                  required
                  multiline
                  rows={12}
                  variant="outlined"
                  onChange={changeHandler}
                />{" "}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Send
            </Button>
          </form>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={clearUploads}
              >
                <Typography align="center" variant="button">
                  Clear all uploads
                </Typography>{" "}
              </Button>
            </Grid>
          </Grid>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
