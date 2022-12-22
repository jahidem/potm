import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import {
  contestListDbToState,
  GenerateReport,
  setGenerateState,
  updateReportRow,
  makeReport,
} from "../../redux/slice/contest-slice";
import { fetchStandingRow } from "../../redux/slice/afapi-slice";
import {
  Flex,
  Spinner,
  Text,
  Box,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  TableCaption,
  Link,
  Button,
} from "@chakra-ui/react";
import { Contest, Contestant, ReportRow } from "../../common/types";
import { contestantListDbToState } from "../../redux/slice/contestant-slice";
const ReportPotm = () => {
  const reportRow: ReportRow[] = useAppSelector(
    (state) => state.contest.reportRow
  );
  const generateReport = useAppSelector(
    (state) => state.contest.reportGenerate
  );
  const dispatch = useAppDispatch();
  const [nowOnRow, setNowOnRow] = useState("");

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
    <>
      <hr />
      {generateReport != GenerateReport.DONE ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Spinner size="xl" color="blueviolet" speed="0.65s" />
        </Flex>
      ) : (
        <TableContainer
          fontSize="1.4rem"
          maxW="900px"
          mx="auto"
          padding="1rem"
          mt="4rem"
        >
          <Table size="md" fontSize="1.4rem">
            <TableCaption
              fontSize="1.6rem"
              placement="top"
              color="darkblue"
              my="1.4rem"
            >
              Contestant and their points
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="1.2rem">Rank</Th>
                <Th fontSize="1.2rem">Handle</Th>
                <Th fontSize="1.2rem">Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reportRow.map((rep) => (
                <Tr
                  key={rep.handle}
                  onMouseEnter={() => {
                    setNowOnRow(rep.handle);
                  }}
                  onMouseLeave={() => {
                    setNowOnRow("");
                  }}
                  bgColor={rep.handle == nowOnRow ? "white" : "none"}
                >
                  <Td>{rep.rank}</Td>
                  <Td> {rep.handle} </Td>
                  <Td isNumeric>{rep.points - rep.penalty}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ReportPotm;
