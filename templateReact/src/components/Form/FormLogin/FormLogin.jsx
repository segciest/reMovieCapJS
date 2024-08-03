import { useState } from "react";
import "./formLogin.scss";
import InputText from "../../Input2/InputText/InputText";
import { handleGetLocalStorage, saveLocalStorage } from "../../../utils/util";
import React, { useContext } from "react";
import { AlertContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { quanLyNguoiDungServ } from "../../../services/quanLyNguoiDungServ";
import { handleGetValue } from "../../../redux/slice/userSlice";
import SignInPage from "../../../pages/SignInPage/SignInPage";
import SignupPage from "../../../pages/SignupPage/SignupPage";

const FormLogin = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className="body">
      {/* container */}
      <div
        className={`containerLayout ${isActive ? "active" : ""}`}
        id="container"
      >
        {/* Sign up */}
        <SignupPage />
        {/* Sign In */}
        <SignInPage />

        {/* Container toggle */}
        <div className="toggleContainer">
          {/* toogle layout got 2 parts: left and right */}
          <div className="toggle">
            {/* toggle left */}
            <div className="togglePannel toggleLeft">
              <h1>Welcome Back!</h1>
              <p className="font-thin">
                Enter your personal details to use all of site features
              </p>
              <button
                className="hiddenBtn"
                id="login"
                onClick={handleLoginClick}
              >
                Sign In
              </button>
            </div>
            {/* toggle right */}
            <div className="togglePannel toggleRight">
              <h1>Hello!</h1>
              <p className="font-thin">
                Register with your personal details to use all of site features
              </p>
              <button
                className="hiddenBtn"
                id="register"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
