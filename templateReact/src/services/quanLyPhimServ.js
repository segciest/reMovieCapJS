import { http } from "./config";

export const quanLyPhimServ = {
  layDanhSachBanner: () => {
    return http.get("/QuanLyPhim/LayDanhSachBanner");
  },
  layDanhSachPhim: () => {
    return http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  themPhimUploadHinh: (data) => {
    return http.post("/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  capNhatPhimUpload: (data) => {
    return http.post("/QuanLyPhim/CapNhatPhimUpload", data);
  },
  layThongTinPhim: (maPhim) => {
    return http.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  xoaPhim: (maPhim) => {
    return http.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
  layThongTinHeThongRap: () => {
    return http.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  layThongTinCumRapTheoHeThong: (data) => {
    return http.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${data}`
    );
  },
  taoLichChieu: (data) => {
    return http.post("/QuanLyDatVe/TaoLichChieu", data);
  },
};
