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
  Link,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

import {
  getContestantListDb,
  removeContestant,
} from '../../redux/slice/contestant-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  fetchContestant,
  updateContestantLoading,
} from '../../redux/slice/cfapi-slice';
import { Contestant as TypedContestant, Loading } from '../../common/types';
import { CODEFORCES_PROFILE, colorFromRank } from '../../common/utility';

const Contestant = () => {
  const contestantList = useAppSelector((state) => state.contstant.list);
  const handleLoading: Loading = useAppSelector(
    (state) => state.cfapi.contesttantLoading
  );
  const loadedContestant: TypedContestant[] = useAppSelector(
    (state) => state.cfapi.contestant
  );
  const dispatch = useAppDispatch();

  const [newHandle, setNewHandle] = useState('');

  useEffect(() => {
    const findAll = async () => {
      dispatch(getContestantListDb(0));
    };
    findAll();
  }, []);

  const getContestant = () => {
    const handle = newHandle;
    if (handle != '')
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
    setNewHandle('');
  };

  return (
    <>
      <Flex
        bg="rgb(247, 249, 249,1)"
        borderRadius="11px"
        p="2.4rem 1rem"
        flexDir="column"
      >
        <Flex height="120px" flexDir="column">
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
              onChange={(e) => setNewHandle(e.target.value.replace(/\s/g, ''))}
              mr="1rem"
              mt="0.5rem"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && handleLoading != Loading.PENDING) {
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
        </Flex>
        <Box overflowY="scroll" pr="0.6rem" maxH="calc( 100vh - 260px)">
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
                              : 'black'
                          }
                          fontWeight="600"
                          textShadow="0.4px 0.1px black"
                        >
                          <Link
                            onClick={() => {
                              window.api.openContentWindow(
                                CODEFORCES_PROFILE + contestant.info.handle
                              );
                            }}
                          >
                            {contestant.name}
                          </Link>
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
                              cursor: 'pointer',
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
        </Box>
      </Flex>
    </>
  );
};

export default Contestant;
