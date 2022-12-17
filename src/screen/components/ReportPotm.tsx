import TopBar from "./TopBar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import { Contest, updateReportRow } from "../../redux/slice/contest-slice";
import { Contestant } from "../../redux/slice/contestant-slice";
import { fetchStandingRow } from "../../redux/slice/afapi-slice";

const ReportPotm = () => {
  const contestList = useAppSelector((state) => state.contest.list);
  const contestantList = useAppSelector((state) => state.contstant.list);
  const reportRow = useAppSelector((state) => state.contest.reportRow);

  const dispatch = useAppDispatch();

  enum GenerateReport {
    "IDLE",
    "PENDING",
    "DONE",
  }
  const [state, setState] = useState<GenerateReport>(GenerateReport.IDLE);

  useEffect(() => {
    dispatch(updateReportRow([]));
    setState(GenerateReport.PENDING);
    let handles = "&handles=";
    contestantList.map((contestant: Contestant) => {
      handles += contestant.info.handle + ";";
    });
    handles += "&showUnofficial=true";

    contestList.forEach((contest: Contest) => {
      const url =
        "https://codeforces.com/api/contest.standings?contestId=" +
        contest.id +
        handles;
      dispatch(fetchStandingRow(url))
    });

    setState(GenerateReport.DONE);
  }, []);

  return (
    <>
    </>
  );
};

export default ReportPotm;
