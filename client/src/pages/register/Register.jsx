import React from 'react'
import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const fullName = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords doesn't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mrghdev</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Mrghdev.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Fullname" required ref={fullName} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input placeholder="Password"  type="password" required ref={password} minLength="6" className="loginInput" />
            <input placeholder="Password Again"  type="password" required ref={passwordAgain} className="loginInput" />
            <button className="signupButton" type="submit" >Sign Up</button>
            <Link to="/login" style={{display:"flex", justifyContent: "center", textDecoration: "none"}}>
              <button className="loginRegisterButton">
                Log into Account
              </button>
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
}