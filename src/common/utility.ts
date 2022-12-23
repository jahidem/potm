import { ContestStanding, ContestType, ReportRow } from "./types";

const colorFromRank = (rank: number): string => {
  if (rank < 1200) return 'grey';
  else if (rank < 1400) return 'green';
  else if (rank < 1600) return 'cyan';
  else if (rank < 1900) return 'blue';
  else if (rank < 2200) return 'violet';
  else if (rank < 2400) return 'orange';
  else return 'red';
};

const calculatePoints = (
  contest: ContestStanding.Contest,
  row: ContestStanding.Row,
  reportRow: ReportRow
) => {
  const eduDiv2 = [0, 500, 1250, 2250, 3750, 5500, 7500, 9750, 12250];
  const cfDiv3 = [0, 250, 750, 1500, 2500, 3750, 5250, 7000, 9000];

  if (
    row.party.participantType == ContestStanding.ParticipantType.CONTESTANT ||
    row.party.participantType ==
      ContestStanding.ParticipantType.OUT_OF_COMPETITION
  ) {
    if (contest.type == ContestType.CF) {
      reportRow.points = row.points;
    } else if (contest.name.includes('Div. 2')) {
      reportRow.points = eduDiv2[row.points];
      reportRow.penalty = row.penalty;
    } else if (contest.name.includes('Div. 3')) {
      reportRow.points = cfDiv3[row.points];
      reportRow.penalty = row.penalty;
    }
  }
  console.log(reportRow);
  return reportRow;
};

const CODEFORCES_PROFILE = 'https://codeforces.com/profile/';
const CODEFORCES_CONTEST = 'https://codeforces.com/contest/';

export {
  colorFromRank,
  calculatePoints,
  CODEFORCES_PROFILE,
  CODEFORCES_CONTEST,
};
