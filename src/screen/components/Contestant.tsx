import {
  Flex,
  Text,
  Tbody,
  Table,
  Td,
  Tr,
  TableContainer,
  Box,
  Input,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Contestant as TypedContestant,
  addContestant,
  removeContestant,
  CfInfo,
} from "../../redux/slice/contestant-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import apiGet, { DataCfInfo } from "../cfApi/apiGet";

const Contestant = () => {
  const fetch = apiGet();
  const contestantList = useAppSelector((state) => state.contstant.list);
  const dispatch = useAppDispatch();

  const [newHandle, setNewHandle] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const addToList = async (contestant: TypedContestant) => {
      fetch(
        handleData,
        handleError,
        "https://codeforces.com/api/user.info?handles=" + newHandle,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
    };
    let contestant: TypedContestant = {
      id: 0,
      isValid: false,
      name: newHandle,
      info: null,
    };
    const handleError = () => {
      dispatch(addContestant(contestant));
    };
    const handleData = (data: DataCfInfo) => {
      if (data.status == "OK") {
        contestant = {
          ...contestant,
          isValid: true,
          info: data.result[0],
          name: data.result[0].handle,
        };
        dispatch(addContestant(contestant));
      }
    };

    if (adding && newHandle != "") {
      addToList(contestant);
    }
    setAdding(false);
    setNewHandle("");
  }, [adding]);

  const colorFromRank = (rank: number): string => {
    if (rank < 1200) return "grey";
    else if (rank < 1400) return "green";
    else if (rank < 1600) return "cyan";
    else if (rank < 1900) return "blue";
    else if (rank < 2200) return "violet";
    else if (rank < 2400) return "orange";
    else return "red";
  };

  return (
    <>
      <Grid
        
        h="200px"
        templateRows="repeat(10, 5rem)"
        templateColumns="repeat(1, 1fr)"
        gap={1}
        bg="rgb(247, 249, 249,1)"
        borderRadius="11px"
        p="1rem"
      >
        <GridItem rowSpan={2}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            margin="0 0.5rem 2rem 1rem"
          >
            <Text fontWeight="bold" fontSize="1.8rem">
              Current Contestants
            </Text>
          </Flex>
          <Flex my="1rem" justifyContent="space-between" alignItems="center">
            <Input
              placeholder="cf handle"
              size="lg"
              fontSize="1.4rem"
              value={newHandle}
              onChange={(e) => setNewHandle(e.target.value.replace(/\s/g, ""))}
              mr="0.5rem"
              my="0.5rem"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setAdding(true);
                }
              }}
            />
            <Button
              colorScheme="teal"
              isLoading={adding}
              onClick={() => setAdding(true)}
            >
              Add
            </Button>
          </Flex>
        </GridItem>
        <GridItem rowSpan={8} overflowY="scroll">
          <TableContainer>
            <Table variant="striped" colorScheme="gray" fontSize="1.4rem">
              <Tbody>
                {contestantList.map((contestant) => (
                  <Tr key={contestant.name}>
                    <Td>
                      <Flex width="100%" justifyContent="space-between">
                        <Text
                          position="sticky"
                          fontSize="1.3rem"
                          color={
                            contestant.isValid
                              ? colorFromRank(contestant.info.rating)
                              : "black"
                          }
                          fontWeight="600"
                        >
                          {contestant.name}
                        </Text>
                        <Flex
                          zIndex="100"
                          justifyContent="flex-end"
                          width="100%"
                          height="2rem"
                          opacity={0}
                          _hover={{
                            opacity: 1,
                          }}
                        >
                          <Box
                            _hover={{
                              cursor: "pointer",
                            }}
                          >
                            <TiDeleteOutline
                              fontSize="1.8rem"
                              color="crimson"
                              onClick={() =>
                                dispatch(removeContestant(contestant))
                              }
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
        </GridItem>
      </Grid>
    </>
  );
};

export default Contestant;
