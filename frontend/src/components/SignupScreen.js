import React, { useState, useEffect } from "react";

import { Box, Button, TextField, Switch } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";
import logo from "../assets/discuss.png";
import "../styles/form.css";

import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

var CryptoJS = require("crypto-js");

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

export default function LoginFormPage({ setPage }) {
  const [loginData, setLoginData] = useState({
    name: "",
    contact: "",
    city: "",
    email: "",
    pass: "",
    cpass: "",
  });

  const [togglePass, setTogglePass] = useState(true);

  useEffect(() => {}, [togglePass]);

  let name, val;
  const handleInput = (e) => {
    name = e.target.name;
    val = e.target.value;
    setLoginData({ ...loginData, [name]: val });
    // console.log(loginData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      loginData.email === "" ||
      loginData.pass === "" ||
      loginData.cpass === "" ||
      loginData.name === "" ||
      loginData.city === "" ||
      loginData.contact === ""
    ) {
      toast("Fields can't be empty!!");
      // SEND DATA
      return;
    }

    // VALIDATE CONTACT
    let regContact = /^[789]\d{9}$/;
    if (!regContact.test(loginData.contact)) {
      toast("Incorrect Contact Number!!");
      return;
    }

    // VALIDATE EMAIL
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(loginData.email)) {
      toast("Incorrect Email Address!!");
      return;
    }

    // VALIDATE PASSWORD
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regPass.test(loginData.pass)) {
      toast(
        "Please follow the password pattern!!\nMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    //  PASS & CPASS
    if (loginData.pass === "" || loginData.cpass === "") {
      toast("Password and Confirm Password do not match!!");
      return;
    }

    // ENCRYPT DATA
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(loginData),
      "my-secret-key@123"
    ).toString();

    console.log("Encrypt Data : \n", ciphertext);

    axios
      .post("api/auth/signup", {
        ciphertext,
      })
      .then((res) => {
        toast("Signed up");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="loginBox">
        <ToastContainer />
        <div className="signinBox">
          <h1>
            <span> FORM </span>
          </h1>
          <form>
            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PersonOutlineOutlinedIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="name"
                  label="Name"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>
            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LocalPhoneIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="contact"
                  label="Contact No."
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>
            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PersonOutlineOutlinedIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>

            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LocationCityIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="city"
                  label="City"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>

            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockOutlinedIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="pass"
                  label="Password"
                  variant="standard"
                  onChange={handleInput}
                  type={togglePass ? "password" : "text"}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>

            <div className="rows">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockOutlinedIcon
                  sx={{ color: "rgb(187, 187, 187)", mr: 1, my: 2.5 }}
                />
                <TextField
                  name="cpass"
                  label="Confirm Password"
                  variant="standard"
                  onChange={handleInput}
                  type={togglePass ? "password" : "text"}
                  InputLabelProps={{ className: "textfield__label" }}
                />
              </Box>
            </div>

            <div className="rows rows_last">
              <div className="rows_switch">
                <Switch
                  color="primary"
                  onChange={() => setTogglePass(!togglePass)}
                />
              </div>

              <div className="rows_btn">
                <Button
                  type="submit"
                  className="submit_btn"
                  variant="contained"
                  onClick={() => setPage("login")}
                  style={{ marginRight: 15 }}
                >
                  LOGIN
                </Button>

                <Button
                  type="submit"
                  className="submit_btn"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="Banner">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
}
