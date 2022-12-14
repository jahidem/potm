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
  list: Contestant[]
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

    }
  }
);

export const {addContestant, removeContestant, addList } = ContestantSlice.actions;
export default ContestantSlice.reducer; 