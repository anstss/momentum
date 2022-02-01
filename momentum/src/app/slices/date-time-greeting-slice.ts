import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dateTimeGreetingState {
  timeOfDay: string;
}

const initialState: dateTimeGreetingState = {
  timeOfDay: "",
};

export const dateTimeGreetingSlice = createSlice({
  name: "dateTimeGreeting",
  initialState,
  reducers: {
    setTimeOfDay(state, action: PayloadAction<string>) {
      state.timeOfDay = action.payload;
    },
  },
});

export default dateTimeGreetingSlice.reducer;
