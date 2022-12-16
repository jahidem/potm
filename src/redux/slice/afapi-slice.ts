import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import  {addContestant } from "./contestant-slice";
import {Contest} from "./contest-slice"
import {loadContest} from "./contest-slice"
export interface CfInfo{
  rating: number ,
  titlePhoto: string,
  handle:string,
  avatar: string,
  firstName: string,
  rank:string,
 }
 export interface Contestant{
   id: number
   name: string,
   isValid: boolean,
   info: CfInfo|null
 }

export interface DataCfInfo{
  status: string;
  result: CfInfo[];
};
type GetResponse = {
  data: DataCfInfo;
};
export enum Loading{
  'IDLE' ,
   'PENDING' ,
    'SUCEEDED' ,
     'FAILED'
}

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
    thunkAPI.dispatch(loadContest(response.data.result))
    
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
  },
})


export const {updateContestantLoading } = cfSlice.actions;
export default cfSlice.reducer; 



