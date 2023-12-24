import React, { useState, useRef, useContext } from "react";
import lo from "./Login.module.css";
import { loginCall } from "../../ApiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";
import { useNavigate } from "react-router";
import axios from "axios"

function Login() {
  const { user, isFetching, error, dispatch,errormsg } = useContext(AuthContext);
  // to prevent rerendering use useRef hook instead of useState

  // const [errormsg,seterrormsg] = useState("");

  console.log(error?.response?.data?.message)
  const nav = useNavigate()
  const emailref = useRef();
  const passwordref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailref.current.value, passwordref.current.value);
    loginCall(
      { email: emailref.current.value, password: passwordref.current.value },
      dispatch
    );

  
  };




  
  return (
    <div className={lo.login}>
      <div className={lo.loginWrapper}>
        <div className={lo.loginLeft}>
          <h3 className={lo.loginLogo}>Chatterbox</h3>
          <span className={lo.loginDesc}>
            Connect with friends and the world around you on Chatterbox.
          </span>
        </div>
        <div className={lo.loginRight}>
          <form className={lo.loginBox} onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              ref={emailref}
              className={lo.loginInput}
            ></input>
            <input
              placeholder="Password"
              type="password"
              minLength={6}
              required
              ref={passwordref}
              className={lo.loginInput}
            ></input>
            <div>{error?error?.response?.data?.message:""}</div>
            
            <button className={lo.loginButton} type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="white" size="20px"/> : "Log In"}
            </button>
            <span className={lo.loginForgot}>Forgot Password?</span>
            <button className={lo.loginRegisterButton} onClick={()=>nav("/register")}>
            {isFetching ? <CircularProgress color="white" size="20px"/> : "Create new Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
