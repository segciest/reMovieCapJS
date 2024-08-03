import { useState } from "react";
// import InputText from "../../Input2/InputText/InputText";
// import { handleGetLocalStorage, saveLocalStorage } from "../../../utils/util";
import React, { useContext } from "react";
// import { AlertContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { quanLyNguoiDungServ } from "../../../services/quanLyNguoiDungServ";
// import { handleGetValue } from "../../../redux/slice/userSlice";
import InputText from "../../components/Input2/InputText/InputText";
import { saveLocalStorage } from "../../utils/util";
import { AlertContext } from "../../App";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDungServ";
import { handleGetValue } from "../../redux/slice/userSlice";

const SignInPage = () => {
  // formik
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleAlert } = useContext(AlertContext);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: async (values) => {
        // khi sử dụng async await luôn có một try catch bọc lại để bắt các vấn đề về lỗi
        try {
          const res = await quanLyNguoiDungServ.dangNhap(values);
          console.log(res);
          handleAlert("success", "Đăng nhập thành công");
          // handleGetLocalStorage("dataUser", res.data.content);
          saveLocalStorage("dataUser", res.data.content);
          dispatch(handleGetValue(res.data.content));
          navigate("/");
        } catch (error) {
          console.log(error);
          handleAlert("error", error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });
  return (
    <div>
      <div className="formContainer signIn">
        <form id="formSignIn" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="formIcon">
            <a href="#">
              <i className="fa-brands fa-square-facebook" />
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
            <a href="#">
              <i className="fa-brands fa-google-plus-g" />
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a href="#">
              <i className="fa-brands fa-github" />
            </a>
          </div>
          <span>or use your email password</span>

          <InputText
            label="Tài khoản"
            name="taiKhoan"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.taiKhoan}
            touched={touched.taiKhoan}
            placeholder="Vui lòng nhập tài khoản"
            value={values.taiKhoan}
            id="emailSignIn"
            className="w-full"
          />
          {/* thông báo email */}
          <span className="noti" id="emailNotiSignIn" />

          <InputText
            label="Mật khẩu"
            name="matKhau"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.matKhau}
            touched={touched.matKhau}
            placeholder="Vui lòng nhập mật khẩu"
            value={values.matKhau}
            type="password"
            id="passwordSignIn"
            className="w-full"
          />
          {/* thông báo password */}
          <span className="noti" id="passwordNotiSignIn" />
          <div>
            <button
              className="bg-black text-white px-5 py-2 rounded-md w-full text-center"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
