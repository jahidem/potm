import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportRow,
  Contest,
  contestPhase,
  ContestStanding,
  contestType,
  Contestant,
} from "../../common/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveAll } from "../../../core/lib/useCaseContestant";
import { RoomState, AppDispatch } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchStandingRow } from "./afapi-slice";

export enum GenerateReport {
  IDLE = "IDLE",
  PENDING = "PENDING",
  DONE = "DONE",
}
interface ContestState {
  list: Contest[];
  epochStart: number;
  epochEnd: number;
  allowDiv: (string | number)[];
  allowOC: (string | number)[];
  reportRow: ReportRow[];
  reportGenerate: GenerateReport;
}
const initialState: ContestState = {
  list: [],
  epochStart: 0,
  epochEnd: 0,
  allowDiv: [],
  allowOC: [],
  reportRow: [],
  reportGenerate: GenerateReport.IDLE,
};

// AsyncThunk

export const contestListDbToState = createAsyncThunk(
  "contest/contestListDbToState",
  async (_, thunkAPI) => {
    const list = await window.api.findAllContest();
    thunkAPI.dispatch(saveAllContest(list));
    return list;
  }
);

export const deleteContestDb = createAsyncThunk(
  "contest/deleteContestDb",
  async (con: Contest, thunkAPI) => {
    const conRet: Contest = await window.api.deleteContest(con);
    thunkAPI.dispatch(deleteContest(conRet));
    return conRet;
  }
);

export const saveContest = createAsyncThunk(
  "contest/saveContest",
  async (list: Contest[], { getState, dispatch }) => {
    dispatch(saveAllContest(list));
    dispatch(filterAllContest());
    dispatch(saveContestDb());
    return list;
  }
);
export const makeReport = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  void,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RoomState;
    extra: {
      jwt: string;
    };
  }
>("contest/makeReport", async (_, thunkAPI) => {
  const contestList = thunkAPI.getState().contest.list;
  const contestantList = thunkAPI.getState().contstant.list;
  console.log(contestList);
  // bulild request string
  let handles = "&handles=";
  contestantList.map((contestant: Contestant) => {
    handles += contestant.info.handle + ";";
  });
  handles += "&showUnofficial=true";

  for (const contest of contestList) {
    const url =
      "https://codeforces.com/api/contest.standings?contestId=" +
      contest.id +
      handles;
    await thunkAPI.dispatch(fetchStandingRow(url));
  }

  thunkAPI.dispatch(setGenerateState(GenerateReport.DONE));
});

export const saveContestDb = createAsyncThunk<
  // Return type of the payload creator
  void,
  // First argument to the payload creator
  void,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RoomState;
    extra: {
      jwt: string;
    };
  }
>("contest/saveContestDb", async (_, thunkAPI) => {
  const deleteList = await window.api.findAllContest();
  console.log(
    "deleteList_________________________________________________________________________"
  );
  console.log(deleteList.length);
  for (const con of deleteList) {
    await window.api.deleteContest(con);
  }
  const state = thunkAPI.getState();
  const list: Contest[] = state.contest.list.map((con) => {
    const retCon: Contest = {
      id: con.id,
      name: con.name,
      phase: con.phase,
      startTimeSeconds: con.startTimeSeconds,
      type: con.type,
    };
    return retCon;
  });
  try {
    const ret: Contest[] = await window.api.saveContestToDb(list);
  } catch {
    console.log("catch");
  }
});

const ContestSlice = createSlice({
  name: "contest",
  initialState,
  reducers: {
    filterAllContest(state) {
      let filtered = state.list.filter((contest: Contest) => {
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

      state.list = filtered.sort((a, b) => (a.id < b.id ? 1 : 0));
    },
    saveAllContest(state, list: PayloadAction<Contest[]>) {
      state.list = list.payload;
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
    updateReportRow(
      state,
      contestStanding: PayloadAction<ContestStanding.RootObject>
    ) {
      console.log("updtRow");
      const arr = contestStanding.payload.result.rows;
      const contest = contestStanding.payload.result.contest;
      arr.forEach((row: ContestStanding.Row) => {
        let reportRow: ReportRow = {
          handle: row.party.members[0].handle,
          points: 0,
          penalty: 0,
        };
        if (
          row.party.participantType ==
            ContestStanding.ParticipantType.CONTESTANT ||
          row.party.participantType ==
            ContestStanding.ParticipantType.OUT_OF_COMPETITION
        ) {
          if (contest.type == contestType.CF) {
            //calc points
            reportRow.penalty = row.penalty;
          } else {
            reportRow.points = row.points;
          }
        }
        let exist = false;
        state.reportRow = state.reportRow.map((row: ReportRow) => {
          if (row.handle == reportRow.handle) {
            reportRow.points += row.points;
            reportRow.penalty += row.penalty;
            exist = true;
            return reportRow;
          } else return row;
        });
        if (!exist) state.reportRow.push(reportRow);
      });
    },
    setGenerateState(state, generate: PayloadAction<GenerateReport>) {
      state.reportGenerate = generate.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(saveContestDb.rejected, (state) => {
      console.log(state.list.length);
      console.log("R saveContestDb");
    });
  },
});

export const {
  filterAllContest,
  deleteContest,
  setEpochStart,
  setEpochEnd,
  updateAllowDiv,
  updateAllowOC,
  updateReportRow,
  setGenerateState,
  saveAllContest,
} = ContestSlice.actions;
export default ContestSlice.reducer;
