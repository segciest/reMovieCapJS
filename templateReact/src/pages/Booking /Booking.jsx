import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import {
  getUser,
  getCountedSeat,
  getArrSeat,
  setBookingData,
  getPickedSeat,
  getTotalPrice,
  getArrSeatSecond,
  getFilmInfo,
} from "../../redux/slice/seatBooking";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import BookingTable from "./BookingTable";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingReceipt from "./BookingReceipt";
import "./booking.scss";
import { useParams } from "react-router-dom";
import { quanLyDatVe } from "../../services/quanLyDatVe";
const Booking = () => {
  const { maLichChieu } = useParams();

  const dispatch = useDispatch();

  const {
    bookingData,
    user,
    countedSeat,
    arrSeat,
    pickedSeat,
    totalPrice,
    arrSeatSecond,
    filmInfo,
  } = useSelector((state) => {
    return state.seatBooking;
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(maLichChieu);
    getData();
    // Gọi api lấy danh sách ghế
    quanLyDatVe
      .layDanhSachPhongVe(maLichChieu)
      .then((res) => {
        // gán dữ liệu danh sách ghế lên redux arrSeat2
        dispatch(getArrSeatSecond(res.data.content.danhSachGhe));
        dispatch(getFilmInfo(res.data.content.thongTinPhim));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Formik
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    setValues,
    isValid,
    isSubmitting,
    validateField,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      user: "",
      countedSeat: "",
      arrSeat: [],
      bookingData: {},
    },
    onSubmit: (values) => {
      console.log(values);
      console.log(errors);
      dispatch(getUser(values.user));
      dispatch(getCountedSeat(values.countedSeat));
      alert("Mời bạn chọn ghế");

      // xoá disabled sau khi submit form thành công
      let allCheckBox = document.querySelectorAll(
        '#tableBookingSeat input[type="checkbox"][disabled]'
      );
      console.log(allCheckBox);
      allCheckBox.forEach((checkbox) => {
        if (checkbox.defaultValue != "true") {
          checkbox.removeAttribute("disabled");
        }
      });
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Vui lòng không bỏ trống"),
      countedSeat: Yup.number().required("Vui lòng nhập số lượng ghế"),
    }),
  });
  // console.log(data);

  const getData = async () => {
    const data = await axios({
      url: "/data/danhSachGhe.json",
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setData(res.data);
        dispatch(getArrSeat(res.data));
      })
      .catch((err) => {
        // console.log(err);
      });
    return data;
  };
  console.log({ value: values });
  console.log({ error: errors });

  return (
    <div id="body">
      <h1 className="font-bold text-2xl text-center py-10">
        Movie Seat Selection
      </h1>
      <div>
        <form
          style={{ marginLeft: "auto", marginRight: "auto", width: "80%" }}
          onSubmit={handleSubmit}
          className="grid grid-cols-3 gap-5"
        >
          <Input
            name="user"
            id="user"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched.user}
            value={values.user}
            error={errors.user}
            labelInput="Type in your user name"
            placeholder="User name"
            inputWidth="100%"
          />
          <Input
            name="countedSeat"
            id="countedSeat"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched.countedSeat}
            value={values.countedSeat}
            error={errors.countedSeat}
            labelInput="Please type in the amount of seat"
            placeholder="Seats"
            inputWidth="100%"
          />
          <div className="flex flex-col gap-3" style={{ width: "80%" }}>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-violet-500 hover:bg-violet-400 text-white"
            >
              Lets picking seat
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-white"
              onClick={() => {
                resetForm();
              }}
            >
              Reset your choices
            </button>
          </div>
          <div></div>
        </form>
      </div>
      <div id="bookingContent">
        <div id="bookingTable">
          <BookingTable
            user={user}
            pickedSeat={pickedSeat}
            totalPrice={totalPrice}
            arr={arrSeat}
            arr2={arrSeatSecond}
            countedSeat={countedSeat}
            bookingData={bookingData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            getPickedSeat={getPickedSeat}
            getTotalPrice={getTotalPrice}
            setBookingData={setBookingData}
            filmInfo={filmInfo}
          />
        </div>
        <div id="bookingReceipt">
          <BookingReceipt
            user={user}
            countedSeat={countedSeat}
            pickedSeat={pickedSeat}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
