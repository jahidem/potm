import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import {
  Contest,
  GenerateReport,
  setGenerateState,
  updateReportRow,
} from "../../redux/slice/contest-slice";
import { Contestant } from "../../redux/slice/contestant-slice";
import { fetchStandingRow, Loading } from "../../redux/slice/afapi-slice";
import { Flex, Spinner, Text } from "@chakra-ui/react";

const ReportPotm = () => {
  const contestList: Contest[] = useAppSelector((state) => state.contest.list);
  const contestantList = useAppSelector((state) => state.contstant.list);
  const reportRow = useAppSelector((state) => state.contest.reportRow);
  const generateReport = useAppSelector(
    (state) => state.contest.reportGenerate
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(contestList)
    dispatch(updateReportRow([]));
    dispatch(setGenerateState(GenerateReport.PENDING));
    let handles = "&handles=";
    contestantList.map((contestant: Contestant) => {
      handles += contestant.info.handle + ";";
    });
    handles += "&showUnofficial=true";
    console.log("sdg");
    const fetchAll = async () => {
      for (const contest of contestList) {
        const url =
          "https://codeforces.com/api/contest.standings?contestId=" +
          contest.id +
          handles;
        const res = await dispatch(fetchStandingRow(url));
        console.log( res);
      }

      dispatch(setGenerateState(GenerateReport.DONE));
    };

    fetchAll();
  }, [dispatch]);

  return generateReport != GenerateReport.DONE ? (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Spinner size="xl" color="blueviolet" speed="0.65s" />
    </Flex>
  ) : 
  <Flex flexDir="column">
  {contestList.map((con) => <Text key={con.id}>{con.name}</Text>)}
  </Flex>
  
};

export default ReportPotm;
