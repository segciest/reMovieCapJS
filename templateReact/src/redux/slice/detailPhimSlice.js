import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleTurnOffLoading, handleTurnOnLoading } from "./loadingSlice";
import { quanLyRapServ } from "../../services/quanLyRapServ";

export const getMovideDetailApiThunk = createAsyncThunk(
  "phim/getMovideDetailApiThunk",
  async (MaPhim, { dispatch }) => {
    dispatch(handleTurnOnLoading());
    const res = await quanLyRapServ.layThongTinLichChieuPhim(MaPhim);
    dispatch(handleTurnOffLoading());
    console.log(MaPhim);
    // trả về kết quả cần lưu trữ vào trong redux
    // console.log(res);
    return res.data.content; // [{"tenPhim","trailer","hot"}....]
  }
);

const initialState = {
  movieDetail: {},
};

const detailPhimSlice = createSlice({
  name: "detailPhim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // thành công
    builder.addCase(getMovideDetailApiThunk.fulfilled, (state, action) => {
      console.log(action);
      state.movieDetail = action.payload;
    });
    // thất bại
    builder.addCase(getMovideDetailApiThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = detailPhimSlice.actions;

export default detailPhimSlice.reducer;
