import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
// import listRoomSlice from "./slice/listRoomSlice";
import loadingSlice from "./slice/loadingSlice";
import phimSlice from "./slice/phimSlice";
import detailPhimSlice from "./slice/detailPhimSlice";
import initReducer from "./slice/initReducer";
import seatBooking from "./slice/seatBooking";

export const store = configureStore({
  reducer: {
    userSlice,
    // listRoomSlice,
    loadingSlice,
    phimSlice,
    detailPhimSlice,
    initReducer,
    seatBooking,
  },
});
