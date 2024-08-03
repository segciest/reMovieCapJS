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

const SignupPage = () => {
  // formik
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleAlert } = useContext(AlertContext);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        hoTen: "",
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
      {/* Sign Up */}
      <div className="formContainer signUp">
        <form id="formSignUp">
          <h2>Create Account</h2>
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
          <span>or use your email for registration</span>
          <InputText
            label="Tài khoản"
            name="taiKhoan"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.taiKhoan}
            touched={touched.taiKhoan}
            placeholder="Vui lòng nhập tài khoản"
            value={values.taiKhoan}
            type=""
            id="taiKhoanSignUp"
            className="w-full"
          />
          {/* thông báo tâi khoảng */}
          <span className="noti" id="nameNoti" />
          <InputText
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Vui lòng nhập email"
            value={values.email}
            type="email"
            id="emailSignUp"
            className="w-full"
          />
          {/* thông báo email */}
          <span className="noti" id="emailNoti" />
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
            id="passwordSignUp"
            className="w-full"
          />
          {/* thông báo password */}
          <span className="noti" id="passwordNoti" />
          <InputText
            label="Số diện thoại"
            name="soDt"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.soDt}
            touched={touched.soDt}
            placeholder="Vui lòng nhập sđt"
            value={values.soDt}
            type=""
            id="phoneSignUp"
            className="w-full"
          />
          {/* thông báo phone */}
          <span className="noti" id="phoneNoti" />
          <InputText
            label="Họ và tên"
            name="hoTen"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.hoTen}
            touched={touched.hoTen}
            placeholder="Vui lòng nhập sđt"
            value={values.hoTen}
            type=""
            id="hoTenSignUp"
            className="w-full"
          />
          <button type="button" id="btnSubmit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
