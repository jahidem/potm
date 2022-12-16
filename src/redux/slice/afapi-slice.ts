import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

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
enum Loading{
  'IDLE' ,
   'PENDING' ,
    'SUCEEDED' ,
     'FAILED'
}

interface ContestantFetchState {
  contestant: Contestant[]
  contesttantLoading: Loading
}



const fetchContestant = createAsyncThunk(
  'cfSlice/fetchContestant',
  async (list: Contestant[], thunkAPI) => {
    let url = "https://codeforces.com/api/user.info?handles="
    list.forEach((contestant, indx)=>{
      url+=contestant.name;
      if(indx+1<list.length)
        url+=";"
    })
    const response = await axios.get<GetResponse>(
       url,
        {
          headers: {
            Accept: "application/json",
          },
        }
    )
    return  response.data.data.result.map((val: CfInfo)=>{
      const ret:Contestant ={
      id: 0,
      name: val.handle,
      isValid: true,
      info: val}
      return ret;
    })
  }
)

const initialState = {
  contestant: [],
  contesttantLoading: Loading.IDLE,
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
      state.contestant = [...state.contestant , ...action.payload ]
    })

    builder.addCase(fetchContestant.rejected ,(state)=>{
      state.contesttantLoading = Loading.FAILED
    })


  },
})


export const {updateContestantLoading } = cfSlice.actions;
export default cfSlice.reducer; 



// // Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById({
//   id:0,
//   name: "dihaj",
//   isValid: false
// }))