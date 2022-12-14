import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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


interface ContestantState{
  list: Array<Contestant>
}
const initialState: ContestantState = {
  list: [],
}

const ContestantSlice = createSlice(
  {
    name: "contestant",
    initialState,
    reducers:{
      addContestant(state, newContestant: PayloadAction<Contestant>){
        const contestant = {...newContestant.payload, id:state.list.length+1 }
        let exist = false;
        state.list.forEach(cont=>{
          exist ||= (cont.name == contestant.name)
        })

        if(!exist)
          state.list.push(contestant);
      },
     removeContestant(state, contestant: PayloadAction<Contestant>){
      state.list = state.list.filter((contstn)=> contstn.name!=contestant.payload.name)
     }

    }
  }
);

export const {addContestant, removeContestant } = ContestantSlice.actions;
export default ContestantSlice.reducer; 