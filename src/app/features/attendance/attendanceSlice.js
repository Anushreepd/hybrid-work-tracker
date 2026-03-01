import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("attendanceRecords");
  return data ? JSON.parse(data) : {};
};

const initialState = {
  records: loadFromLocalStorage(),
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      const { date, status } = action.payload;
      state.records[date] = status;

      localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(state.records)
      );
    },
  },
});

export const { setStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;