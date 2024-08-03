import { createSlice } from '@reduxjs/toolkit'
// import { getArrSeat } from '../../utils/utils';
let data;

const initialState = {
  arrSeat: [],
  activeFilmImg: '',
  arrConfirmSeats: ["A1"],
}

const initReducer = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setActiveFilm: (state, {type, payload})=>{
      state.activeFilmImg = payload;
    },
    updateSeat: (state, {type, payload})=>{
      state.arrSeat = [...payload]
    },
    updateArrSeat: (state, {type, payload})=>{
      const {hang, cot, arrSeat, bool} = payload;
      const axis = arrSeat.findIndex(item=>item.hang==hang);
      const newArrSeat = [...arrSeat]
      newArrSeat[axis] = {...newArrSeat[axis]}
      newArrSeat[axis].danhSachGhe = [...newArrSeat[axis].danhSachGhe];
      newArrSeat[axis].danhSachGhe[cot-1] = {...newArrSeat[axis].danhSachGhe[cot-1]}
      newArrSeat[axis].danhSachGhe[cot-1].daDat = bool;
      state.arrSeat = newArrSeat;
    },
    updateArrSeatOrigin: (state, {type, payload})=>{
      state.arrSeat = payload;
    },
    setConfirmSeat: (state, {type, payload})=>{
      state.arrConfirmSeats = payload
    }
    

    
  }
});

export const {updateSeat, updateArrSeat, setActiveFilm, setConfirmSeat, updateArrSeatOrigin} = initReducer.actions

export default initReducer.reducer