import {
  Box,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import { loadLogList } from "../../redux/slice/contest-slice";
import { ContestStanding, StandingLogs } from "../../common/types";

const LogScreen = () => {
  const listLogs: StandingLogs[] = useAppSelector(
    (state) => state.contest.listLogs
  );
  const [contestSet, setContestSet] = useState<Array<ContestStanding.Contest>>(
    []
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.api.readyLogList((event, value) => {
      dispatch(loadLogList(value));
    });

    window.api.loadLogListFromPotmWindow();
  }, []);

  useEffect(() => {
    const set: Set<ContestStanding.Contest> = new Set();
    listLogs.forEach((ele) => {
      set.add(ele.contest);
    });
    const temp = [];
    set.forEach((ele) => temp.push(ele));
    setContestSet(temp);
  }, [listLogs]);

  return (
    <>
      {contestSet.length == 0 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Spinner size="xl" color="blueviolet" speed="0.65s" />
        </Flex>
      ) : (
        <Box overflow="scroll" height="100%">
          {contestSet.map((con) => (
            <>
              <Flex flexDir="column">
                <TableContainer
                  fontSize="1.4rem"
                  w="900px"
                  mx="auto"
                  padding="1rem"
                  my="2.4rem"
                >
                  <Table
                    size="lg"
                    fontSize="1.4rem"
                    colorScheme="gray"
                    variant="striped"
                    border="3px solid rgb(240, 246, 249,0.7)"
                    borderRadius="7px"
                  >
                    <TableCaption
                      fontSize="1.8rem"
                      placement="top"
                      color="darkblue"
                      my="1.4rem"
                    >
                      {con.name + "#" + con.id}
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th fontSize="1.2rem">handle</Th>
                        <Th fontSize="1.2rem">points</Th>
                        <Th fontSize="1.2rem">penalty</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listLogs.map((rep) => {
                        if (rep.contest.id == con.id) {
                          return (
                            <Tr key={rep.reportRow.handle}>
                              <Td>{rep.reportRow.handle}</Td>
                              <Td> {rep.reportRow.points} </Td>
                              <Td>{rep.reportRow.penalty}</Td>
                            </Tr>
                          );
                        } else return null;
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
              <hr />
            </>
          ))}
        </Box>
      )}
    </>
  );
};

export default LogScreen;
