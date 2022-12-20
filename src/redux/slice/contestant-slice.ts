import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contestant, ThunkState,  } from "../../common/types";
 
 export interface ContestantState{
   list: Contestant[],
   constestListState: ThunkState 
 }
const initialState: ContestantState = {
  list: [],
  constestListState: ThunkState.PENDING
}


// AsyncThunk


export const getContestantListDb = createAsyncThunk(
  'contestant/getContestantListDb',
  async ( num:number = 0,thunkAPI) => {
    const list = await window.api.findAllContestant();
    thunkAPI.dispatch(addList(list));
    return  list
  }
)

export const deleteContestantDb = createAsyncThunk(
  'contestant/deleteContestantDb',
  async ( con:Contestant ,thunkAPI) => {
    const conRet: Contestant = await window.api.deleteContestant(con);
    thunkAPI.dispatch(removeContestant(conRet));
    return  conRet
  }
)

const ContestantSlice = createSlice(
  {
    name: "contestant",
    initialState,
    reducers:{
      addContestant(state, newContestant: PayloadAction<Contestant>){
        const contestant = {...newContestant.payload, id:state.list.length+1 }
        let exist = false;
        state.list.forEach(cont=>{
          exist ||= (cont.name == contestant.name || cont.name=="")
        })

        if(!exist){
          state.list.push(contestant);
          window.api.saveAllContestant([contestant]);
        }
      },
     removeContestant(state, contestant: PayloadAction<Contestant>){
      state.list = state.list.filter((contstn)=> contstn.name!=contestant.payload.name)
      window.api.deleteContestant(contestant.payload)
     },
     addList(state,list : PayloadAction<Contestant[]>){
      state.list =  list.payload
     }

    },
    extraReducers: (builder) =>{
      builder.addCase(getContestantListDb.fulfilled, (state)=>{
        state.constestListState = ThunkState.FULFILLED
      })

      builder.addCase(getContestantListDb.pending,(state)=>{
        state.constestListState = ThunkState.PENDING
      })

      builder.addCase(getContestantListDb.rejected,(state)=>{
        state.constestListState = ThunkState.REJECTED
      })
    }



  }
);

export const {addContestant, removeContestant, addList } = ContestantSlice.actions;
export default ContestantSlice.reducer; 