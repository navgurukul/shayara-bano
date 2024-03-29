import React, { useState } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios from "axios";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const emailMappedtoName = {
  Nitesh: "nitesh@navgurukul.org",
  Aman: "aman18@navgurukul.org",
  Shahnaaz: "shahnaaz@navgurukul.org",
  Nilam: "nilam@navgurukul.org",
  Kitty: "kitty@navgurukul.org",
  Rahit: "rahit.roy@navgurukul.org",
};

export default function Admission() {
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
    senderName: "",
    senderEmail: "",
    senderPassword: "",
    campus: "",
    name: "",
    cc: "",
    receiverEmail: "",
    date: "",
    langType: "",
  });

  const changeHandler = (e) => {
    if (e.target.name === "senderName") {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        ["senderEmail"]: emailMappedtoName[e.target.value],
      });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
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

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("api/offerLetter/generateCertificate", values)
      .then((res) => {
        console.log(res);
        axios
          .post("api/offerLetter/sendEmail", values)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Email Sender Name
                    </InputLabel>
                    <Select
                      value={values.senderName}
                      onChange={changeHandler}
                      label="senderName"
                      name="senderName"
                    >
                      <MenuItem value={"Nitesh"}>Nitesh</MenuItem>
                      <MenuItem value={"Aman"}>Aman</MenuItem>
                      <MenuItem value={"Shahnaaz"}>Shahnaaz</MenuItem>
                      <MenuItem value={"Nilam"}>Nilam</MenuItem>
                      <MenuItem value={"Kitty"}>Kitty</MenuItem>
                      <MenuItem value={"Rahit"}>Rahit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="senderEmail"
                    // label="Email Address"
                    placeholder="Email Address"
                    value={values.senderEmail}
                    name="senderEmail"
                    autoComplete="off"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="senderPassword"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Campus
                    </InputLabel>
                    <Select
                      value={values.campus}
                      onChange={changeHandler}
                      label="Campus"
                      name="campus"
                    >
                      <MenuItem value={"Pune"}>Pune</MenuItem>
                      <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                      <MenuItem value={"Dharamshala"}>Dharamshala</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="date"
                    label="Date"
                    type="text"
                    id="subject"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Language Type
                    </InputLabel>
                    <Select
                      value={values.langType}
                      onChange={changeHandler}
                      label="Language Type"
                      name="langType"
                    >
                      <MenuItem value={"onlyEnglish"}>Only English</MenuItem>
                      <MenuItem value={"both"}>Both</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Receiver's Email Address"
                    name="receiverEmail"
                    autoComplete="off"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Receiver's Name"
                    name="name"
                    autoComplete="off"
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
    </div>
  );
}
