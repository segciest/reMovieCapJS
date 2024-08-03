import { http } from "./config";
export const quanLyDatVe = {
  layDanhSachPhongVe: (maLichChieu) => {
    return http.get(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  datVe: (DanhSachVe) => {
    return http.post("/QuanLyDatVe/DatVe", DanhSachVe);
  },
};
