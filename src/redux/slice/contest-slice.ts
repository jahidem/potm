import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum contestType {
  CF,
  IOI,
  ICPC,
}
enum contestPhase {
  BEFORE,
  CODING,
  PENDING_SYSTEM_TEST,
  SYSTEM_TEST,
  FINISHED,
}
export interface Contest {
  id: number;
  name: string;
  type: contestType;
  phase: contestPhase;
  startTimeSeconds: number;
  websiteUrl: string;
}

interface ContestState {
  list: Contest[];
  epochStart: number;
  epochEnd: number;
}
const initialState: ContestState = {
  list: [],
  epochStart: 0,
  epochEnd: 0,
};

const ContestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    loadContest(state, newContest: PayloadAction<Contest[]>) {
      state.list = newContest.payload.filter((contest: Contest) => {
        return (
          contest.startTimeSeconds < state.epochEnd &&
          state.epochStart <= contest.startTimeSeconds
        );
      });
    },
    setEpochStart(state, epoch: PayloadAction<number>) {
      state.epochStart = epoch.payload;
    },
    setEpochEnd(state, epoch: PayloadAction<number>) {
      state.epochEnd = epoch.payload;
    },
  },
});

export const { loadContest, setEpochStart, setEpochEnd } = ContestSlice.actions;
export default ContestSlice.reducer;
