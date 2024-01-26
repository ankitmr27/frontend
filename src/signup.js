import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      console.error("Password and Confirm Password do not match");
      return;
    }

    // Construct the user object to send to the backend
    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    // Make a POST request to your backend API for user registration
    try {
      const response = await fetch("http://localhost:8000/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle successful registration
        console.log("User registered successfully!");

        // Redirect to the signin page
        navigate("/login");
      } else {
        // Handle registration error, e.g., display an error message
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div>
      <h2> User Signup </h2>{" "}
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </label>{" "}
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </label>{" "}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
        </label>{" "}
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />{" "}
        </label>{" "}
        <br />
        <button type="submit"> Sign Up </button>{" "}
      </form>{" "}
    </div>
  );
};

export default Signup;
