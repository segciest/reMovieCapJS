import React, { useEffect, useState } from "react";
import { handleGetLocalStorage } from "../../utils/util";
import "./receipt.scss";
import { useNavigate } from "react-router-dom";

const Receipt = () => {
  let [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const pickedData = handleGetLocalStorage("pickedData");
    setData(pickedData);
  }, []);
  if (!data) {
    return <div>Đặt chưa thành công</div>;
  }

  const { filmInfo } = data;

  if (!filmInfo) {
    return <div>Thông tin phim không tồn tại</div>;
  }

  return (
    <>
      <div className="container">
        <div className="receipt">
          <h1 className="text-red-500 text-lg">Đặt vé thành công !</h1>
          <div className="content grid grid-cols-2 justify-center">
            <div className="filmInfo">
              <div className="filmTitle">{data.filmInfo.tenPhim}</div>
              <div>
                <img src={data.filmInfo.hinhAnh} alt="" />
              </div>
            </div>
            <div className="rap">
              <div className="rapContent">
                <div className="cumRap">{data.filmInfo.tenCumRap}</div>
                <div className="diaChi">{data.filmInfo.diaChi}</div>
                <div className="rap grid grid-cols-2">
                  <div className="rapSo">{data.filmInfo.tenRap}</div>
                  <div className="ghe flex gap-2">
                    {data.danhSachVe.map((item) => {
                      return <p>Ghế {item.maGhe}</p>;
                    })}
                  </div>
                </div>
                <p>{data.filmInfo.ngayChieu}</p>
                <p>Giờ chiếu: {data.filmInfo.gioChieu}</p>
              </div>
              {/* Về trang chủ */}
              <div className="text-center">
                <button
                  className="bg-blue-300 text-white px-2 py-2 rounded hover:bg-blue-400"
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Về Trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
