import { Contestant, Contest } from "../../common/types"; 
export interface Api {
  preloadSucess: string,
  printWebContent: () => void
  //api contestant
  findAllContestant: () => Promise<Contestant[]>,
  saveAllContestant: (data: Contestant[]) => Promise<void>,
  deleteContestant: (data: Contestant) => Promise<Contestant>,


  closeWindow: () => void,
  minimizeWindow: () => void,
  maximizeWindow: () => void,
  openPotmWindow: () => void,
  closePotm: () => void,
  openContentWindow: (data: string) => void,

  //api contest
  deleteContest: (data: Contest) =>  Promise<Contest>,
  findAllContest: () => Promise<Contest[]>,
  saveContestToDb: (data: Contest[]) => Promise< Contest[]>,

}

declare global {
  interface Window {
    api: Api;
  }
}
