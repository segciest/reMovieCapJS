import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "../../services/quanLyPhimServ";
import { handleGetLocalStorage } from "../../utils/util";
import InputText from "../../components/Input2/InputText/InputText";
import { DatePicker } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";

const TimeLine = () => {
  const [heThongRap, setHeThongRap] = useState([]);
  const [selectedHeThongRap, setSelectedHeThongRap] = useState(""); // Thêm state để lưu giá trị đã chọn
  const [cumRap, setCumRap] = useState([]);
  const [selectedHeThongCumRap, setSelectedHeThongCumRap] = useState(""); // Thêm state để lưu giá trị đã chọn
  const [maPhim, setMaPhim] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    quanLyPhimServ
      .layThongTinHeThongRap()
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    quanLyPhimServ
      .layThongTinCumRapTheoHeThong(selectedHeThongRap)
      .then((res) => {
        console.log(res);
        setCumRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedHeThongRap]);
  useEffect(() => {
    setMaPhim(handleGetLocalStorage("idEdit"));
  }, []);

  const handleChange1 = (event) => {
    setSelectedHeThongRap(event.target.value); // Cập nhật state với giá trị đã chọn
    console.log("Selected Value:", event.target.value); // Xử lý logic theo giá trị đã chọn
  };

  const handleChange2 = (event) => {
    setSelectedHeThongCumRap(event.target.value); // Cập nhật state với giá trị đã chọn
    console.log("Selected Value:", event.target.value); // Xử lý logic theo giá trị đã chọn
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      maPhim: handleGetLocalStorage("idEdit"),
      giaVe: "",
      maRap: selectedHeThongCumRap,
      ngayChieuGioChieu: "",
    },
    onSubmit: (values) => {
      quanLyPhimServ
        .taoLichChieu(values)
        .then((res) => {
          alert("Tạo lịch chiếu thành công");
          navigate(path.admin.managerMovie);
          window.location.reload();
        })
        .catch((err) => {});
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Tạo lịch chiếu</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="maHeThong" className="form-label">
            Mã hệ thống
          </label>
          <select
            className="form-select form-select-lg"
            name=""
            id="maHeThong"
            onChange={handleChange1} // Thêm sự kiện onChange vào thẻ select
            value={selectedHeThongRap} // Liên kết giá trị của thẻ select với state
          >
            {heThongRap.map((item, index) => {
              return (
                <option key={index} value={item.maHeThongRap}>
                  {item.tenHeThongRap}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="cumRap" className="form-label">
            Cụm rạp
          </label>
          <select
            className="form-select form-select-lg"
            name=""
            id="cumRap"
            onChange={handleChange2} // Thêm sự kiện onChange vào thẻ select
            value={selectedHeThongCumRap} // Liên kết giá trị của thẻ select với state
          >
            {cumRap.map((item, index) => {
              return (
                <option key={index} value={item.maCumRap}>
                  {item.tenCumRap}
                </option>
              );
            })}
          </select>
        </div>
        <InputText
          value={values.giaVe}
          name="giaVe"
          handleChange={handleChange}
          label="Giá vé"
          placeholder="Nhập giá vé"
        />
        {/* Ngày giờ chiếu  */}
        <div>
          <label htmlFor="" className="block mb-2">
            Ngày giờ chiếu
          </label>
          <DatePicker
            format="DD-MM-YYYY hh:mm"
            onChange={(date, dateString) => {
              // console.log(date);
              // console.log(dateString);
              setFieldValue("ngayChieuGioChieu", dateString);
              setFieldValue("maPhim", handleGetLocalStorage("idEdit"));
            }}
          />
        </div>
        <div>
          <button
            className="py-2 px-5 bg-black text-white rounded"
            onClick={() => {
              alert("Tạo lịch chiếu thành công");
              navigate(path.admin.managerMovie);
              window.location.reload();
            }}
          >
            Tạo lịch chiếu
          </button>
        </div>
      </form>
    </>
  );
};

export default TimeLine;
