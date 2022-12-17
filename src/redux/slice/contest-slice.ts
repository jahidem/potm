import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParticipantType, StandingRow } from "./afapi-slice";

enum contestType {
  CF,
  IOI,
  ICPC,
}
enum contestPhase {
  BEFORE = "BEFORE",
  CODING = "CODING",
  PENDING_SYSTEM_TEST = "PENDING_SYSTEM_TEST",
  SYSTEM_TEST = "SYSTEM_TEST",
  FINISHED = "FINISHED",
}
export interface Contest {
  id: number;
  name: string;
  type: contestType;
  phase: contestPhase;
  startTimeSeconds: number;
  websiteUrl: string;
}
interface ReportRow {
  handle: string;
  penalty: number;
  points: number;
}
interface ContestState {
  list: Contest[];
  epochStart: number;
  epochEnd: number;
  allowDiv: (string | number)[];
  allowOC: (string | number)[];
  reportRow: ReportRow[];
}
const initialState: ContestState = {
  list: [],
  epochStart: 0,
  epochEnd: 0,
  allowDiv: [],
  allowOC: [],
  reportRow: [],
};

const ContestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    loadContest(state, newContest: PayloadAction<Contest[]>) {
      state.list = newContest.payload.filter((contest: Contest) => {
        return (
          new Date(contest.startTimeSeconds * 1000) <
            new Date(state.epochEnd) &&
          new Date(state.epochStart) <=
            new Date(contest.startTimeSeconds * 1000) &&
          contest.phase == contestPhase.FINISHED &&
          ((contest.name.includes("Div. 1") &&
            state.allowDiv.includes("Div. 1")) ||
            (contest.name.includes("Div. 2") &&
              state.allowDiv.includes("Div. 2")) ||
            (contest.name.includes("Div. 3") &&
              state.allowDiv.includes("Div. 3")) ||
            (contest.name.includes("Div. 4") &&
              state.allowDiv.includes("Div. 4")) ||
            (state.allowDiv.includes("others") &&
              !contest.name.includes("Div. 3") &&
              !contest.name.includes("Div. 2") &&
              !contest.name.includes("Div. 4") &&
              !contest.name.includes("Div. 1")))
        );
      });

      state.list = state.list.sort((a, b) => (a.id < b.id ? 1 : 0));
    },
    deleteContest(state, delContest: PayloadAction<Contest>) {
      state.list = state.list.filter((contest) => {
        return contest.id != delContest.payload.id;
      });
    },
    setEpochStart(state, epoch: PayloadAction<number>) {
      state.epochStart = epoch.payload;
    },
    setEpochEnd(state, epoch: PayloadAction<number>) {
      state.epochEnd = epoch.payload;
    },
    updateAllowDiv(state, arr: PayloadAction<(string | number)[]>) {
      state.allowDiv = arr.payload;
    },
    updateAllowOC(state, arr: PayloadAction<(string | number)[]>) {
      state.allowOC = arr.payload;
    },
    updateReportRow(state, arr: PayloadAction<StandingRow[]>) {
      let list: ReportRow[] = state.reportRow;
      arr.payload.forEach((row: StandingRow) => {
        let reportRow: ReportRow = {
          handle: row.party.members[0].handle,
          points: 0,
          penalty: 0,
        };
        if (
          row.party.participantType == ParticipantType.CONTESTANT ||
          row.party.participantType == ParticipantType.OUT_OF_COMPETITION
        ) {
          if(row.points < 20){
            reportRow.penalty = row.penalty;
            
          }
          else{
            reportRow.points = row.points

          }
        }
      });
      state.reportRow = list;
    },
  },
});

export const {
  loadContest,
  deleteContest,
  setEpochStart,
  setEpochEnd,
  updateAllowDiv,
  updateAllowOC,
  updateReportRow,
} = ContestSlice.actions;
export default ContestSlice.reducer;
