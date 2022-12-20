import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import  {addContestant } from "./contestant-slice";
import { saveContest, updateReportRow} from "./contest-slice"
import { Contestant, Contest } from '../../common/types';
import { Loading } from '../../common/types';



interface ContestantFetchState {
  contestant: Contestant[]
  contesttantLoading: Loading
  allContest: Contest[],
  contestLoading: Loading
}


export const fetchAllContest = createAsyncThunk(
  'cfSlice/fetchAllContest',
  async (time:number, thunkAPI) => {
    let url = "https://codeforces.com/api/contest.list?gym=false"
    const response = await axios.get(
       url,
        {
          headers: {
            Accept: "application/json",
          },
        }
    );
    thunkAPI.dispatch(saveContest(response.data.result))
    return  response.data
  }
)


export const  fetchStandingRow = createAsyncThunk(
  'cfSlice/fetchStandingRow',
  async (url:string, thunkAPI) => {
    const response = await axios.get(
       url,
        {
          headers: {
            Accept: "application/json",
          },
        }
    );
    thunkAPI.dispatch( updateReportRow(response.data))
    
    return  response.data
  }
)


export const fetchContestant = createAsyncThunk(
  'cfSlice/fetchContestant',
  async (list: Contestant[], thunkAPI) => {
    let url = "https://codeforces.com/api/user.info?handles="
    list.forEach((contestant)=>{
      url+=contestant.name+";";
    })
    const response = await axios.get(
       url,
        {
          headers: {
            Accept: "application/json",
          },
        }
    );
    thunkAPI.dispatch(addContestant(response.data.result.map((val)=>{
      const ret:Contestant ={
      id: 0,
      name: val.handle,
      isValid: true,
      info: val}
      return ret;
    })[0]))
    
    return  response.data
  }
)

const initialState = {
  contestant: [],
  contesttantLoading: Loading.IDLE,
  allContest: [],
  contestLoading: Loading.IDLE
} as ContestantFetchState

// Then, handle actions in your reducers:
const cfSlice = createSlice({
  name: 'cfSlice',
  initialState,
  reducers: {
    updateContestantLoading(state, loading: PayloadAction< Loading>){
      state.contesttantLoading = loading.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContestant.pending,(state)=>{
      state.contesttantLoading = Loading.PENDING
    })

    builder.addCase(fetchContestant.fulfilled , (state, action) => {
      state.contesttantLoading = Loading.SUCEEDED

      state.contestant = action.payload.result.map((val)=>{
        const ret:Contestant ={
        id: 0,
        name: val.handle,
        isValid: true,
        info: val}
        return ret;
      })

    })

    builder.addCase(fetchContestant.rejected ,(state)=>{
      state.contesttantLoading = Loading.FAILED 
    })

    builder.addCase(fetchAllContest.pending,(state,action)=>{
      state.contestLoading = Loading.PENDING
    })

    builder.addCase(fetchAllContest.fulfilled,(state,action)=>{
      state.contestLoading = Loading.SUCEEDED
        state.allContest = action.payload.result
    })

      builder.addCase(fetchStandingRow.fulfilled,(state,action)=>{
        console.log(action.payload)
      })
      builder.addCase(fetchStandingRow.rejected,(state)=>{
        console.log("reject")
      })
      builder.addCase(fetchStandingRow.pending,(state)=>{
        console.log("pending")
      })
  },
})


export const {updateContestantLoading,  } = cfSlice.actions;
export default cfSlice.reducer; 



