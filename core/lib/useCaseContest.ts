import { Contest } from '../../src/common/types';
import prisma from './db';

export async function saveAllContest(rawData: Contest[]) {
  rawData.forEach(async (con) => {
    await prisma.contest.create({
      data: con,
    });
  });
  return rawData;
}

export async function findAllContest() {
  const listAll: Contest[] = await prisma.contest.findMany();
  const retList = listAll.map((con) => {
    const ret: Contest = {
      id: con.id,
      name: con.name,
      phase: con.phase,
      startTimeSeconds: con.startTimeSeconds,
      type: con.type,
    };
    return ret;
  });
  return retList;
}

export async function deleteContest(data: Contest) {
  const con = await prisma.contest.delete({
    where: { id: data.id },
  });
  return con;
}
