// Contest types

export enum contestType {
  CF = "CF",
  IOI = "IOI",
  ICPC = "ICPC",
}
export enum contestPhase {
  BEFORE = "BEFORE",
  CODING = "CODING",
  PENDING_SYSTEM_TEST = "PENDING_SYSTEM_TEST",
  SYSTEM_TEST = "SYSTEM_TEST",
  FINISHED = "FINISHED",
}


export type Contest = {
  id: number
  name: string
  startTimeSeconds: number
  type: string
  phase: string
}
export interface ReportRow {
  handle: string;
  penalty: number;
  points: number;
}

// Contestant types


export enum ParticipantType{
  OUT_OF_COMPETITION= "OUT_OF_COMPETITION",
  CONTESTANT = "CONTESTANT",
  PRACTICE = "PRACTICE"

}

interface Handle{
  handle: string
}
export interface Party{
  members: Handle[]
  participantType: ParticipantType,
 
}

export interface StandingRow{
  party: Party,
  points: number
  penalty: number
}
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
export enum Loading{
  'IDLE' ,
   'PENDING' ,
    'SUCEEDED' ,
     'FAILED'
}

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
 export enum ThunkState{
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED"

 }