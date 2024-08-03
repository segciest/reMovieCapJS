import React, { useEffect, useState } from "react";
import { handleGetLocalStorage } from "../../utils/util";
import { quanLyPhimServ } from "../../services/quanLyPhimServ";
import { useFormik } from "formik";
import { DatePicker, Rate, Switch } from "antd";
import InputText from "../../components/Input2/InputText/InputText";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";

const EditMovie = () => {
  const navigate = useNavigate();
  let [data, setData] = useState("");
  let [dataFilm, setDataFilm] = useState(null); // Sử dụng null để kiểm tra trạng thái tải dữ liệu

  useEffect(() => {
    setData(handleGetLocalStorage("idEdit"));
  }, []);

  useEffect(() => {
    if (data) {
      quanLyPhimServ
        .layThongTinPhim(data)
        .then((res) => {
          setDataFilm(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: dataFilm?.tenPhim || "",
      trailer: dataFilm?.trailer || "",
      moTa: dataFilm?.moTa || "",
      maNhom: "GP01",
      ngayKhoiChieu: dataFilm?.ngayKhoiChieu || "",
      sapChieu: dataFilm?.sapChieu || false,
      dangChieu: dataFilm?.dangChieu || false,
      hot: dataFilm?.hot || false,
      danhGia: dataFilm?.danhGia || 0,
      hinhAnh: dataFilm?.hinhAnh || "",
    },
    enableReinitialize: true, // Cho phép formik khởi tạo lại initialValues khi dataFilm thay đổi
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      for (let key in values) {
        if (key === "hinhAnh") {
          formData.append("File", values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
      quanLyPhimServ
        .capNhatPhimUpload(formData)
        .then((res) => {
          console.log(res);
          alert("Cập nhật thành công");
          navigate(path.admin.managerMovie);
        })
        .catch((err) => {
          console.log(err);
          alert("Cập nhật thành công");
          navigate(path.admin.managerMovie);
        });
    },
  });

  if (!dataFilm) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Trang chỉnh sửa phim</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            value={formik.values.tenPhim}
            name="tenPhim"
            handleChange={formik.handleChange}
            label="Tên phim"
            placeholder="Nhập tên phim"
          />
          <InputText
            value={formik.values.trailer}
            name="trailer"
            handleChange={formik.handleChange}
            label="Trailer"
            placeholder="Nhập trailer"
          />
          <div className="flex justify-between col-span-2">
            <div>
              <label htmlFor="" className="block mb-2">
                Ngày khởi chiếu
              </label>
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(date, dateString) => {
                  formik.setFieldValue("ngayKhoiChieu", dateString);
                }}
                value={
                  formik.values.ngayKhoiChieu
                    ? moment(formik.values.ngayKhoiChieu)
                    : null
                }
              />
            </div>
            <div>
              <label htmlFor="" className="block mb-2">
                Đang chiếu
              </label>
              <Switch
                onChange={(checked) =>
                  formik.setFieldValue("dangChieu", checked)
                }
                checked={formik.values.dangChieu}
              />
            </div>
            <div>
              <label htmlFor="" className="block mb-2">
                Sắp chiếu
              </label>
              <Switch
                onChange={(checked) =>
                  formik.setFieldValue("sapChieu", checked)
                }
                checked={formik.values.sapChieu}
              />
            </div>
            <div>
              <label htmlFor="" className="block mb-2">
                Hot
              </label>
              <Switch
                onChange={(checked) => formik.setFieldValue("hot", checked)}
                checked={formik.values.hot}
              />
            </div>
            <div>
              <label htmlFor="" className="block mb-2">
                Đánh giá (trên thang điểm 10, mỗi ngôi sao 2đ)
              </label>
              <Rate
                onChange={(value) => formik.setFieldValue("danhGia", value * 2)}
                value={formik.values.danhGia / 2}
                allowHalf
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block" htmlFor="">
              Mô tả
            </label>
            <textarea
              name="moTa"
              onChange={formik.handleChange}
              value={formik.values.moTa}
              cols="30"
              rows="10"
              className="border border-gray-300 w-full"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="">Hình ảnh phim</label>
            <img className="w-40" src={image} alt="" />
            <input
              name="hinhAnh"
              onChange={(event) => {
                const img = event.target.files[0];
                if (img) {
                  const urlImg = URL.createObjectURL(img);
                  setImage(urlImg);
                  formik.setFieldValue("hinhAnh", img);
                }
              }}
              type="file"
              accept="image/*"
            />
          </div>
          <div>
            <button className="py-2 px-5 bg-black text-white rounded">
              Cập nhật phim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
