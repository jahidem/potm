import { Contestant} from "@prisma/client";
import prisma from "./db";

export interface CfInfo{
  rating: number ,
  titlePhoto: string,
  handle:string,
  avatar: string,
  firstName: string,
  rank:string,
 }
 export interface ContestantFront{
   id: number
   name: string,
   isValid: boolean,
   info: CfInfo|null
 }

export async function saveAll(rawData: ContestantFront[]) {
  const data: Contestant[] = rawData.map(con=>{
    const convert:Contestant = {
      CfInfoAvatar: con.info?.avatar,
      CfInfoFirstName: con.info?.firstName,
      CfInfoHandle: con.info?.handle,
      CfInfoRank: con.info?.rank,
      CfInfoRatting: con.info?.rating,
      CfInfoTitlePhoto: con.info?.titlePhoto,
      id: con.id,
      isValid: con.isValid,
      name: con.name
    }
    return convert
  })
  data.forEach(async(contestant)=>{
  await prisma.contestant.create(
    {
      data: contestant
    }
  )})

  return rawData;
}

export async function findAll() {
  const listAll: Contestant[] = await prisma.contestant.findMany();
  const retAll: ContestantFront[] = listAll.map(con=>{
    const convert:ContestantFront= {
      id: con.id,
      name: con.name,
      isValid: con.isValid,
      info: {
        avatar: con.CfInfoAvatar,
        firstName: con.CfInfoFirstName,
        handle: con.CfInfoHandle,
        rank: con.CfInfoRank,
        rating: con.CfInfoRatting,
        titlePhoto: con.CfInfoTitlePhoto
      }
    }
    return convert;
  });
  return retAll;
}

export async function deleteContestant(data: ContestantFront) {
  const deleteContestant = await prisma.contestant.delete({
    where: {name: data.name},
  })

  return data;
}