import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import {
  contestListDbToState,
  setGenerateState,
  updateReportRow,
  makeReport,
} from "../../redux/slice/contest-slice";
import { fetchStandingRow } from "../../redux/slice/cfapi-slice";
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
import {
  Contest,
  Contestant,
  GenerateReport,
  ReportRow,
} from "../../common/types";
import { contestantListDbToState } from "../../redux/slice/contestant-slice";
const ReportPotm = () => {
  const reportRow: ReportRow[] = useAppSelector(
    (state) => state.contest.reportRow
  );
  const generateReport = useAppSelector(
    (state) => state.contest.reportGenerate
  );
  const listLog = useAppSelector((state) => state.contest.listLogs);
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

  useEffect(()=>{
    window.api.handleLogList((event) => {
      event.sender.send("SEND_LOG_LIST", listLog);
    });
  },[listLog])

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
        <Box w="100%" h="100%" overflow="scroll">
          <TableContainer
            fontSize="1.4rem"
            maxW="900px"
            mx="auto"
            padding="1rem"
            mt="2rem"
          >
            <Table size="lg" fontSize="1.4rem" variant="striped">
              <TableCaption
                fontSize="1.8rem"
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
                    <Td>{rep.points - rep.penalty}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default ReportPotm;
