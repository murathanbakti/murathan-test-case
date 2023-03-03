import React, { useState } from "react";
import "./loginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ProceedLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp[0].password === password) {
          toast.success("giris yapildi");

          if (resp[0].admin == true) {
            localStorage.setItem("user", JSON.stringify(resp[0]));
            navigate("/admin" );
          } else {
            localStorage.setItem("user", JSON.stringify(resp[0]));
            navigate("/user");
          }
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  console.log(email);
  console.log(password);
  return (
    <div className="loginContainer">
      <form onSubmit={ProceedLogin}>
        <img
          src="https://media.licdn.com/dms/image/C4D0BAQHy0Cw2-NWQmg/company-logo_200_200/0/1668176759649?e=2147483647&v=beta&t=oAF8npdK0DIH61Omx1wFcQWMDwMxzld9xsZ7MyWSmLg"
          alt=""
        />
        <div className="form-group">
          <label className="form-element">E-mail</label>
          <TextField
            required
            className="form-element"
            id="outlined-required"
            label="Required"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-element">Şifre</label>
          <TextField
            required
            className="form-element"
            id="outlined-required"
            label="Required"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" type="submit">
          Giriş Yap
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
