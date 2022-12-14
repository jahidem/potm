import {Contestant} from "../../redux/slice/contestant-slice";
export interface Api {
  findAllContestant: () => Promise<Contestant[]>,
  saveAllContestant: (data: Contestant[]) => Promise<void>,
  deleteContestant: (data: Contestant) => void,
  closeWindow: () => void,
  minimizeWindow: () => void,
  maximizeWindow: () => void,
}

declare global {
  interface Window {
    api: Api;
  }
}
