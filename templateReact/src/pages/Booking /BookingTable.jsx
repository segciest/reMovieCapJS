import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { quanLyDatVe } from "../../services/quanLyDatVe";
import { useNavigate, useParams } from "react-router-dom";
import { saveLocalStorage } from "../../utils/util";

const BookingTable = ({
  arr,
  arr2,
  user,
  pickedSeat,
  totalPrice,
  countedSeat,
  bookingData,
  handleSubmit,
  handleChange,
  getPickedSeat,
  getTotalPrice,
  setBookingData,
  filmInfo,
}) => {
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const navigate = useNavigate();
  // useEffect updating
  useEffect(() => {
    const arrListSeat = document.querySelectorAll(".seatCheckBox");
    // console.log(arrListSeat);
    // console.log(arrListSeat.length);
    pickSeat(arrListSeat, countedSeat);
  }, [arr, countedSeat, arr2]);
  useEffect(() => {});

  //  function picking seat on choices
  const pickSeat = (arr, countedSeat) => {
    arr.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const checkedCheckboxes = document.querySelectorAll(
          ".seatCheckBox:checked"
        );

        // Kiểm tra nếu số lượng checkboxes được check vượt quá giới hạn
        if (checkedCheckboxes.length >= countedSeat) {
          // Vô hiệu hóa tất cả các checkboxes chưa được check
          arr.forEach((box) => {
            if (!box.checked) {
              box.disabled = true;
            }
          });
        } else {
          // Kích hoạt lại tất cả các checkboxes theo sk onChange
          arr.forEach((box) => {
            // box nào được đặt rồi thì không chỉnh về false
            if (box.defaultValue != "true") {
              box.disabled = false;
            }
          });
        }
      });
    });
  };

  //   Function submit choices from user
  const pickData = () => {
    const data = document.querySelectorAll(".seatCheckBox:checked");
    console.log("hello");
    console.log(data);
    let pickedSeat = [];
    let totalPrice = 0;
    data.forEach((choice) => {
      pickedSeat.push(choice.id);
      totalPrice += parseFloat(choice.name);
    });

    console.log(pickedSeat);
    dispatch(getPickedSeat(pickedSeat));
    console.log(totalPrice);
    dispatch(getTotalPrice(totalPrice));
  };
  const pickData2 = () => {
    const data = document.querySelectorAll(".seatCheckBox:checked");
    let danhSachVe = [];
    data.forEach((choice) => {
      danhSachVe.push({
        maGhe: parseInt(choice.id),
        giaVe: parseInt(choice.name),
      });
    });
    let dataBooking = {
      maLichChieu: parseInt(maLichChieu),
      danhSachVe,
      user,
      filmInfo,
    };
    console.log(dataBooking);
    return dataBooking;
  };

  return (
    <div id="bookingTableContent">
      <form id="tableBookingSeat">
        <div className="grid grid-cols-10">
          {arr2.map((item, index) => {
            return (
              <div key={index}>
                <Input
                  name={item.giaVe}
                  id={item.tenGhe} // thay vì sử dụng item.maGhe để gọi api e đổi thày item.tenGhe để in bill
                  handleChange={handleChange}
                  cssInput="seatCheckBox "
                  value={item.daDat}
                  type="checkbox"
                  disabled={true}
                />
              </div>
            );
          })}
        </div>
      </form>
      {/* Button Đặt vé */}
      <div>
        <button
          type="button"
          onClick={() => {
            // quanLyDatVe
            //   .datVe(JSON.stringify(pickData2()))
            //   .then((res) => {
            //     alert("đặt vé thành công");
            //     pickData();
            //     resetForm();
            //   })
            //   .catch((err) => console.log(err));
            saveLocalStorage("pickedData", pickData2());
            navigate("/receipt");
          }}
          className="px-5 py-2 rounded bg-green-500"
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
};

export default BookingTable;
