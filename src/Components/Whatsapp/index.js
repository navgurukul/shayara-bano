import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import FileUploader from "./FileUploader";
import QrCode from "./Qrcode";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: "60px",
  },

  AttachmentsText: {
    backgroundColor: "slategrey",
  },

  csvfile: {
    backgroundColor: "slategrey",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Whatsapp() {
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
    message: "",
    base64QR: "",
    showQR: false,
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const backdropClosed = () => {
    setValues({ ...values, showQR: false });
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
      .get("/api/whatsapp/downloadSample")
      .then((res) => {
        window.open("/api/whatsapp/downloadSample");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contactsAdder = () => {
    axios.post("/api/whatsapp/addContacts").then((res) => {
      console.log(res.status);
    });
  };

  const loadQR = () => {
    axios
      .post("api/whatsapp/generateQR", values)
      .then((res) => {
        console.log(res);
        setValues({ ...values, showQR: true, base64QR: res.data });
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/whatsapp/sendMessage", values)
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
          <Typography component="h1" variant="h5">
            Write a whatsapp message!
          </Typography>
          <br />

          <Grid container spacing={2}>
            <Grid item md={6} sm={6}>
              <Card>
                <Typography className={classes.AttachmentsText}>
                  <p style={{ marginTop: "10px" }}>Upload Attachments: </p>
                </Typography>

                <Grid item xs={6} sm={6}>
                  <FileUploader fileType="image/*, application/pdf" />
                </Grid>
              </Card>
            </Grid>

            <Grid item md={6} sm={4}>
              <Card>
                <Typography className={classes.csvfile}>
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
                <Grid item xs={6} sm={4}>
                  <FileUploader fileType=".csv" />
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={contactsAdder}
          >
            Add Contacts
          </Button>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  name="message"
                  fullWidth
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  onChange={changeHandler}
                />{" "}
              </Grid>
            </Grid>

            {/* <NavLink to="/qr"> */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={loadQR}
            >
              Load QR And Send Message
            </Button>
            {/* </NavLink> */}
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
          {values.showQR ? (
            <QrCode
              clicked={backdropClosed}
              isOpen={values.showQR}
              base64={values.base64QR}
            />
          ) : null}

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
