import { Student, User } from "@prisma/client";

export interface Api {
  getMain: string,
  addStudent: (data:Student) => Promise<Student>
  addUser: (data:User) => Promise<void>,
  findAllStudent: ()=> Promise<Array<Student>>,
  deleteStudent: (data: Student) => Promise<void>,
  printWebContent: ()=>void,
  closeWindow: () => void,
  minimizeWindow: () => void,
  maximizeWindow: () => void
}

declare global {
  interface Window {
    api: Api,
    
  }
}

