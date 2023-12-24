import React, { useContext, useRef } from "react";
import lo from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { loginCall } from "../../ApiCalls";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const usernameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const confirmpasswordref = useRef();
  const nav = useNavigate();

  const { user, isFetching, error, dispatch, errormsg } =
    useContext(AuthContext);
  const handlelogin = (m,n)=>{
    loginCall(
      { email: m, password: n },
      dispatch
    );

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if confirmpassword and password are same exactly!!
    if (passwordref.current.value !== confirmpasswordref.current.value) {
      confirmpasswordref.current.setCustomValidity(
        "password and confirm password dont match"
      );
    } else {
      const user = {
        username: usernameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        //  navigate user to login page
        // nav("/login");
        handlelogin(emailref.current.value,passwordref.current.value)
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={lo.login}>
      <div className={lo.loginWrapper}>
        <div className={lo.loginLeft}>
          <h3 className={lo.loginLogo}>ChatterBox</h3>
          <span className={lo.loginDesc}>
            Connect with friends and the world around you on ChatterBox.
          </span>
        </div>
        <div className={lo.loginRight}>
          <form className={lo.loginBox} onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={usernameref}
              className={lo.loginInput}
            ></input>
            <input
              type="email"
              placeholder="Email"
              required
              ref={emailref}
              className={lo.loginInput}
            ></input>
            <input
              type="password"
              minLength={6}
              placeholder="Password"
              required
              ref={passwordref}
              className={lo.loginInput}
            ></input>
            <input
              type="password"
              minLength={6}
              placeholder="Confirm Password"
              required
              ref={confirmpasswordref}
              className={lo.loginInput}
            ></input>
            <button className={lo.loginButton} type="submit">
              Sign up
            </button>


<button className={lo.loginRegisterButton} onClick={()=>nav("/login")}>Log into Account</button>
     


          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
