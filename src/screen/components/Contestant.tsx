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
  Link
  
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  Contestant as TypedContestant,
  addContestant,
  removeContestant,
  CfInfo,
  addList,
} from "../../redux/slice/contestant-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchContestant,
  Loading,
  updateContestantLoading,
} from "../../redux/slice/afapi-slice";

const Contestant = () => {
  const contestantList = useAppSelector((state) => state.contstant.list);
  const handleLoading: Loading = useAppSelector(
    (state) => state.cfapi.contesttantLoading
  );
  const loadedContestant: TypedContestant[] = useAppSelector(
    (state) => state.cfapi.contestant
  );
  const dispatch = useAppDispatch();

  const [newHandle, setNewHandle] = useState("");

  useEffect(() => {
    const findAll = async () => {
      const list = await window.api.findAllContestant();
      dispatch(addList(list));
    };
    findAll();
  }, []);

  const getContestant = () => {
    const handle = newHandle;
    if (handle != "")
      dispatch(
        fetchContestant([
          {
            id: contestantList.length,
            name: handle,
            isValid: false,
            info: null,
          },
        ])
      );
    setNewHandle("");
  };
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
        templateRows="repeat(10, 6rem)"
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
            <Text fontWeight="bold" fontSize="1.8rem" color="darkblue">
              Current Contestants
            </Text>
          </Flex>
          <Flex
            my="1rem 0"
            mx="0.5rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Input
              placeholder="cf handle"
              size="lg"
              fontSize="1.4rem"
              value={newHandle}
              onChange={(e) => setNewHandle(e.target.value.replace(/\s/g, ""))}
              mr="1rem"
              mt="0.5rem"
              onKeyPress={(e) => {
                if (e.key === "Enter" && handleLoading != Loading.PENDING) {
                  getContestant();
                }
              }}
            />
            <Button
              colorScheme="teal"
              isLoading={handleLoading == Loading.PENDING}
              onClick={() => getContestant()}
              size="lg"
            >
              Add
            </Button>
          </Flex>
          <Text
            m="0.2rem 0 0 1rem"
            color="red"
            hidden={handleLoading != Loading.FAILED}
            onClick={() => dispatch(updateContestantLoading(Loading.IDLE))}
          >
            not a valid cf handle
          </Text>
        </GridItem>
        <GridItem rowSpan={8} overflowY="scroll" pr="0.6rem">
          <TableContainer mx="0.5rem">
            <Table variant="striped" colorScheme="gray" fontSize="1.4rem">
              <Tbody>
                {contestantList.map((contestant) => (
                  <Tr key={contestant.name}>
                    <Td>
                      <Flex width="100%" justifyContent="space-between">
                        <Text
                          fontSize="1.3rem"
                          color={
                            contestant.isValid && contestant.info.rating
                              ? colorFromRank(contestant.info.rating)
                              : "black"
                          }
                          fontWeight="600"
                          textShadow="0.4px 0.1px black"
                        >
                          <Link onClick={()=>{window.open("https://codeforces.com/profile/"+contestant.info.handle);}}>{contestant.name}</Link>
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
