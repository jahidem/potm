import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState{
  value: number
}

const initialState: CounterState ={
  value: 0
}

const CounterSlice = createSlice(
  {
    name: "counter",
    initialState,
    reducers:{
      increamented(state, val: PayloadAction<number>){
        state.value+= val.payload;
      },
      decreament(state){
        state.value--;
      }

    }
  }
);

export const {increamented } = CounterSlice.actions;
export default CounterSlice.reducer;