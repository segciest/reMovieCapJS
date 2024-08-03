import React from "react";
import Lottie from "lottie-react";
import loginAnimation from "./../../assets/Animation/loginAnimation.json";
import FormLogin from "../../components/Form/FormLogin/FormLogin";
const Login = () => {
  return (
    <div className="h-screen">
      {/* animation  */}
      {/* <div>
        <Lottie animationData={loginAnimation} loop={true} />
      </div> */}
      {/* form  */}
      <div>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
