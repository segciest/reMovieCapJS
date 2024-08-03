import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quanLyRapServ } from "../../services/quanLyRapServ";
import { Rate } from "antd";
import moment from "moment";
import { Button, Modal } from "antd";
import "./detail.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMovideDetailApiThunk } from "../../redux/slice/detailPhimSlice";
import HeThongLichChieuDetail from "../../layouts/HeThongLichChieuDetail/HeThongLichChieuDetail";

const Detail = () => {
  // hàm lấy id video từ link youtube có sẵn để tạo embed
  const extractYouTubeId = (url) => {
    if (!url) return null; // Thêm kiểm tra để xử lý url undefined hoặc null
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.detailPhimSlice);

  const { MaPhim } = useParams();
  console.log(MaPhim);

  // set modal for youtube trailer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Gọi api thunk
  useEffect(() => {
    dispatch(getMovideDetailApiThunk(MaPhim));
  }, []);
  return (
    <div className="container">
      <div className="phim">
        {/* Hình ảnh phim */}
        <div className="hinhAnh">
          <img src={movieDetail.hinhAnh} alt="" />
        </div>
        {/* Thông tin phim */}
        <div className="phimInfo">
          {/* Tên phim */}
          <h1 className="phimTitle">{movieDetail.tenPhim}</h1>
          {/* Mô tả phim */}
          <p className="phimMoTa">{movieDetail.moTa}</p>
          {/* Đánh giá */}
          <div className="phimRate">
            <Rate value={movieDetail.danhGia} disabled />
          </div>
          {/* Ngày chiếu */}
          <p className="phimDate">
            {moment(movieDetail.ngayKhoiChieu).format("MMM Do YY")}
          </p>
          <div className="btnAcess">
            <Button type="primary" onClick={showModal}>
              Xem trailer
            </Button>
            <Modal
              title="Trailer"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <iframe
                width={300}
                height={200}
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  movieDetail.trailer
                )}`}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </Modal>
            <Button
              type="primary"
              onClick={() => {
                navigate(/booking/);
              }}
            >
              Đặt vé
            </Button>
          </div>
        </div>
      </div>
      <HeThongLichChieuDetail
        heThongRapChieuDetail={movieDetail.heThongRapChieu}
      />
    </div>
  );
};

export default Detail;
