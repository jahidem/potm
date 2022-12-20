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

// Contest Standing types

export module ContestStanding {

  export interface Contest {
      id: number;
      name: string;
      type: string;
      phase: string;
      frozen: boolean;
      durationSeconds: number;
      startTimeSeconds: number;
      relativeTimeSeconds: number;
  }

  export interface Problem {
      contestId: number;
      index: string;
      name: string;
      type: string;
      points: number;
      rating: number;
      tags: string[];
  }

  export interface Member {
      handle: string;
  }

  export interface Party {
      contestId: number;
      members: Member[];
      participantType: string;
      ghost: boolean;
      room: number;
      startTimeSeconds: number;
  }

  export interface ProblemResult {
      points: number;
      rejectedAttemptCount: number;
      type: string;
      bestSubmissionTimeSeconds: number;
  }

  export interface Row {
      party: Party;
      rank: number;
      points: number;
      penalty: number;
      successfulHackCount: number;
      unsuccessfulHackCount: number;
      problemResults: ProblemResult[];
  }

  export interface Result {
      contest: Contest;
      problems: Problem[];
      rows: Row[];
  }

  export interface RootObject {
      status: string;
      result: Result;
  }
  export enum ParticipantType{
    OUT_OF_COMPETITION= "OUT_OF_COMPETITION",
    CONTESTANT = "CONTESTANT",
    PRACTICE = "PRACTICE"
  
  }
}




// Contestant types
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