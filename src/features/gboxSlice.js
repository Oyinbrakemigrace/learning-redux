import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageUrl: "",
};

export const gboxSlice = createSlice({
  name: "gbox",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setBannerData, setImageUrl } = gboxSlice.actions;
export default gboxSlice.reducer;
