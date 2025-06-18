import { createSlice } from "@reduxjs/toolkit";

const initialState = { vitalData: [] };

const vitalSlice = createSlice({
  name: "vital",
  initialState,
  reducers: {
    addVitalItem: (state, action) => {
      const dataCopy = JSON.parse(JSON.stringify(state.vitalData));
      dataCopy.push(action.payload);
      state.vitalData = dataCopy;
    },
  },
});

export const { addVitalItem } = vitalSlice.actions;
export default vitalSlice.reducer;
