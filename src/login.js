import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 5) {
      setPasswordError("The password must be 6 characters or longer");
      return;
    }

    // Check if email has an account associated with it
    checkAccountExists((accountExists) => {
      // If yes, log in
      if (accountExists) logIn();
      // Else, ask user if they want to create a new account and if yes, then log in
      else if (
        window.confirm(
          "An account does not exist with this email address: " +
            email +
            ". Do you want to create a new account?"
        )
      ) {
        logIn();
      }
    });
  };

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = (callback) => {
    fetch("http://localhost:8000/auth/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.message === "Email already exists");
      });
  };

  // Log in a user using email and password
  const logIn = () => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("User Found" === r.message) {
          document.cookie = `isLoggedIn=` + r.token + `; path=/;`;
          localStorage.setItem(
            "user",
            JSON.stringify({ email: email, token: r.token })
          );
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate("/");
        } else {
          window.alert("Wrong email or password");
        }
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="email"
          value={email}
          autoComplete="on"
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          autoComplete="on"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
