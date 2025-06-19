import { createSlice } from "@reduxjs/toolkit";

const initialState = { vitalData: [], shown: true, page:'' };

const vitalSlice = createSlice({
  name: "vital",
  initialState,
  reducers: {
    addVitalItem: (state, action) => {
      const dataCopy = JSON.parse(JSON.stringify(state.vitalData));
      dataCopy.push(action.payload);
      state.vitalData = dataCopy;
    },
    simulateVitalItem: (state, action) => {
      const dataCopy = JSON.parse(JSON.stringify(state.vitalData));
      dataCopy.push(...action.payload);
      state.vitalData = dataCopy;
    },
    setShown: (state, action) => {
      state.shown = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { addVitalItem, simulateVitalItem, setShown, setPage } = vitalSlice.actions;
export default vitalSlice.reducer;
