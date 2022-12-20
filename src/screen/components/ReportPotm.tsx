import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import {
  contestListDbToState,
  GenerateReport,
  setGenerateState,
  updateReportRow,
  makeReport
} from "../../redux/slice/contest-slice";
import { fetchStandingRow } from "../../redux/slice/afapi-slice";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Contest, Contestant } from "../../common/types";
import { contestantListDbToState } from "../../redux/slice/contestant-slice";
const ReportPotm = () => {
  const contestList: Contest[] = useAppSelector((state) => state.contest.list);
  const contestantList = useAppSelector((state) => state.contstant.list);
  const reportRow = useAppSelector((state) => state.contest.reportRow);
  const generateReport = useAppSelector(
    (state) => state.contest.reportGenerate
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    const fetchAll = async () => {
      dispatch(setGenerateState(GenerateReport.PENDING));
      await dispatch(contestListDbToState());
      await dispatch(contestantListDbToState());
      await dispatch(makeReport());
    };

    fetchAll();
  }, []);

  // useEffect(() => {
  //   const loadAll = async () => {
  //     dispatch(contestListDbToState());
  //     dispatch(contestantListDbToState());
  //   };

  //   loadAll();
  // }, []);
  return (
    generateReport != GenerateReport.DONE ? (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Spinner size="xl" color="blueviolet" speed="0.65s" />
      </Flex>
    ) :
    <>
      <Flex flexDir="column">
        {contestList.map((con) => (
          <Text key={con.id}>{con.name}</Text>
        ))}
      </Flex>
      <Flex flexDir="column">
        {contestantList.map((con) => (
          <Text key={con.name}>{con.name}</Text>
        ))}
      </Flex>
      <Flex flexDir="column">
        {reportRow.map((con) => (
          <Text key={con.handle}>{con.handle+" "+con.points}</Text>
        ))}
      </Flex>
    </>
  );
};

export default ReportPotm;
