import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { addContestant } from "./contestant-slice";
import { saveContest, updateReportRow } from "./contest-slice";
import { Contestant, Contest } from "../../common/types";
import { Loading } from "../../common/types";

// ThunkApis

export const fetchAllContest = createAsyncThunk(
  "cfSlice/fetchAllContest",
  async (_, thunkAPI) => {
    let url = "https://codeforces.com/api/contest.list?gym=false";
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    await thunkAPI.dispatch(saveContest(response.data.result));
    return response.data;
  }
);

export const fetchStandingRow = createAsyncThunk(
  "cfSlice/fetchStandingRow",
  async (url: string, thunkAPI) => {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    thunkAPI.dispatch(updateReportRow(response.data));

    return response.data;
  }
);

export const fetchContestant = createAsyncThunk(
  "cfSlice/fetchContestant",
  async (list: Contestant[], thunkAPI) => {
    window.api.logger({
      data: ["trying to fetch","count: ", list.length],
      date: null,
      level: "info",
      scope: "UI"
    });
    let url = "https://codeforces.com/api/user.info?handles=";
    list.forEach((contestant) => {
      url += contestant.name + ";";
    });
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    thunkAPI.dispatch(
      addContestant(
        response.data.result.map((val) => {
          const ret: Contestant = {
            id: 0,
            name: val.handle,
            isValid: true,
            info: val,
          };
          return ret;
        })[0]
      )
    );

    return response.data;
  }
);

// Slice Setup

interface ContestantFetchState {
  contestant: Contestant[];
  contesttantLoading: Loading;
  allContest: Contest[];
  contestLoading: Loading;
}

const initialState = {
  contestant: [],
  contesttantLoading: Loading.IDLE,
  allContest: [],
  contestLoading: Loading.IDLE,
} as ContestantFetchState;

const cfSlice = createSlice({
  name: "cfSlice",
  initialState,
  reducers: {
    updateContestantLoading(state, loading: PayloadAction<Loading>) {
      state.contesttantLoading = loading.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContestant.pending, (state) => {
      state.contesttantLoading = Loading.PENDING;
      window.api.logger({
        data: ["pending fetchContestant"],
        date: null,
        level: "info",
        scope: "UI"
      });
    });

    builder.addCase(fetchContestant.fulfilled, (state, action) => {
      state.contesttantLoading = Loading.SUCEEDED;
      window.api.logger({
        data: ["fulfilled fetchContestant","count: ", action.payload.result.length],
        date: null,
        level: "info",
        scope: "UI"
      });
      state.contestant = action.payload.result.map((val) => {
        const ret: Contestant = {
          id: 0,
          name: val.handle,
          isValid: true,
          info: val,
        };
        return ret;
      });
    });

    builder.addCase(fetchContestant.rejected, (state) => {
      window.api.logger({
        data: ["rejected fetchContestant"],
        date: null,
        level: "error",
        scope: "UI"
      });
      state.contesttantLoading = Loading.FAILED;
    });

    builder.addCase(fetchAllContest.pending, (state, action) => {
      window.api.logger({
        data: ["pending fetchAllContest"],
        date: null,
        level: "info",
        scope: "UI"
      });
      state.contestLoading = Loading.PENDING;
    });

    builder.addCase(fetchAllContest.fulfilled, (state, action) => {
      window.api.logger({
        data: ["fulfilled fetchAllContest", "count: ",action.payload.result.length],
        date: null,
        level: "info",
        scope: "UI"
      });
      state.contestLoading = Loading.SUCEEDED;
      state.allContest = action.payload.result;
    });

    builder.addCase(fetchStandingRow.fulfilled, (state, action) => {
      window.api.logger({
        data: ["fulfilled fetchStandingRow"],
        date: null,
        level: "info",
        scope: "UI"
      });
      console.log(action.payload);
    });
    builder.addCase(fetchStandingRow.rejected, (state) => {
      window.api.logger({
        data: ["rejected fetchStandingRow"],
        date: null,
        level: "error",
        scope: "UI"
      });
    });
    builder.addCase(fetchStandingRow.pending, (state) => {
      window.api.logger({
        data: ["pending fetchStandingRow"],
        date: null,
        level: "info",
        scope: "UI"
      });
    });
  },
});

export const { updateContestantLoading } = cfSlice.actions;
export default cfSlice.reducer;
