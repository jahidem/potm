import {
  Box,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  TableCaption,
  Flex,
  Text,
  Link,
} from "@chakra-ui/react";
import { TiDeleteOutline } from "react-icons/ti";
import {useState} from "react"
import { useAppSelector } from "../../redux/hook";
import { Contest, deleteContest } from "../../redux/slice/contest-slice";
import { useAppDispatch } from "../../redux/hook";

const ContestTable = () => {
  const contestList: Contest[] = useAppSelector((state) => state.contest.list);
  const [nowOnContest,setNowOnContest] = useState(0)

  const dispatch = useAppDispatch();

  return (
    <TableContainer
      fontSize="1.4rem"
      height="100%"
      overflowX="scroll"
      overflowY="scroll"
      padding="1rem"
    >
      <Table size="md" fontSize="1.4rem">
        <TableCaption fontSize="1.6rem" placement="top" color="darkblue">
          All contest on this month
        </TableCaption>
        <Thead>
          <Tr>
            <Th fontSize="1.2rem">Id</Th>
            <Th fontSize="1.2rem">Name</Th>
            <Th fontSize="1.2rem">Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contestList.map((contest) => (
            <Tr key={contest.id} onMouseEnter={()=>{
              setNowOnContest(contest.id)
            }}
            
            onMouseLeave={()=>{
              setNowOnContest(0)
            }}
            
            bgColor ={contest.id == nowOnContest? "white": "none"}
            >
              <Td>
                <Link href={contest.websiteUrl}> {contest.id} </Link>
              </Td>
              <Td>{contest.name.substring(0, 80)+ (contest.name.length> 80? "...":"")}</Td>
              <Td >
                <Flex >
                  <Text width="5rem"> {contest.type}</Text>

                  <Flex
                    opacity={contest.id == nowOnContest? 1 : 0}
                   
                  >
                    <Box
                      _hover={{
                        cursor: "pointer",
                      }}
                    >
                      <TiDeleteOutline
                        fontSize="1.8rem"
                        color="crimson"
                        onClick={()=> dispatch(deleteContest(contest))}
                      />
                    </Box>
                  </Flex>
                </Flex>
               
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ContestTable;
