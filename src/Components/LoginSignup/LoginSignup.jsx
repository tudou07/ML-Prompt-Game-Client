import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import userIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import logo from "../Assets/pictionary-logo.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitForm = () => {
    const xhr = new XMLHttpRequest();
    const data = JSON.stringify({ email, password });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const json = JSON.parse(xhr.responseText);
          window.location.href = json.redirect;
        }
      }
    };

    xhr.withCredentials = true;
    xhr.open("POST", `https://isa-server.azurewebsites.net/${action.toLowerCase()}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Send a POST request to the server with the user's login data
    const data = { email: email, password: password };
    console.log(data);
    fetch(`https://isa-server.azurewebsites.net/${action.toLowerCase()}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.redirect; // Redirect to user.html upon successful login
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
  // Send a POST request to the server with the user's email
  fetch('https://isa-server.azurewebsites.net/forgotPassword', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(response => response.text())
  .then(data => {
    if (data === 'Email sent') {
      console.log(`Password reset link sent to ${email}`);
      setForgotPassword(false);
    } else {
      console.log(email);
      console.log('Email not found');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="container">
    <div className="header">
      <div className="text">Smart Pictionary</div>
      <img src={logo} alt="logo" />
      <div className="text">{forgotPassword ? "Forgot Password" : action}</div>
      <div className="underline"></div>
    </div>
    <form >
      {forgotPassword ? (
        <>
          <div className="input">
            <img src={emailIcon} alt="email icon" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="submit-container">
            <button className="submit" onClick={handleForgotPassword}>Send Password Reset Link</button>
            <button className="submit" onClick={() => setForgotPassword(false)}>Back</button>
          </div>
        </>
        ) : (
          <>
            {action === "Login" ? null : (
              <div className="input">
                <img src={userIcon} alt="user icon" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="input">
              <img src={emailIcon} alt="email icon" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="password icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             <div className="submit-container">
            <div className="submit-btn-container">
            <button className="submit-btn" onClick={(event) => handleLogin(event)}>
  {action}
</button>
            </div>
            <div className="switch-container">
            <a
              type="button"
              className="switch-btn"
              onClick={() => setAction(action === "Login" ? "Register" : "Login")}
            >
              {action === "Login" ? "New User? Register" : "Login"}
            </a>
            </div>
            {action === "Login" && (
              <a
                type="button"
                className="forgot-password"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password
              </a>
            )}
          </div>
        </>
      )}
    </form>
  </div>
  );
}
export default LoginSignup;