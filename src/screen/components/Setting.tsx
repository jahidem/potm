import {
  Text,
  Flex,
  Select,
  Input,
  Button,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  useCheckbox,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { fetchAllContest } from "../../redux/slice/afapi-slice";
import { Loading } from "../../common/types";
import {
  setEpochStart,
  setEpochEnd,
  updateAllowDiv,
  saveAllContest,
  filterAllContest,
  saveContest,
  saveContestDb,
} from "../../redux/slice/contest-slice";

interface ChooserState {
  month: number;
  year: number;
  epoch: number;
}
const today = new Date();
const initials = {
  month: 1,
  year: today.getFullYear(),
  epoch: 0,
} as ChooserState;

const Setting = () => {
  const contestLoading = useAppSelector((state) => state.cfapi.contestLoading);
  const dispatch = useAppDispatch();
  const contestList = useAppSelector((state) => state.contest.list);

  const [start, setStart] = useState<ChooserState>(initials);
  const [end, setEnd] = useState<ChooserState>({ ...initials, month: 12 });
  const [checkedDiv, setCheckedDiv] = useState<(string | number)[]>([
    "Div. 2",
    "Div. 3",
    "others",
  ]);
  const [updateList, setUpdateList] = useState(0);

  useEffect(() => {
    const update = async () => {
      dispatch(fetchAllContest(1));
    };
    update();
  }, [updateList]);

  const getEpo = (date: ChooserState) => {
    if (date.month && date.year) {
      let dateString = "";
      dateString += date.year + "-";
      if (date.month < 10) dateString += "0" + date.month;
      else dateString += date.month;
      dateString += "-01";
      console.log(dateString);
      date.epoch = new Date(dateString).getTime();
      console.log(date.epoch);
      return date;
    }
    return date;
  };
  useEffect(() => {
    const date = getEpo(start);
    setStart(date);
    dispatch(setEpochStart(date.epoch));
  }, [start]);

  useEffect(() => {
    const date = getEpo(end);
    setEnd(date);
    dispatch(setEpochEnd(date.epoch));
  }, [end]);

  useEffect(() => {
    dispatch(updateAllowDiv(checkedDiv));
  }, [checkedDiv]);

  return (
    <>
      <Flex flexDir="column" p="1.6rem 2rem">
        <Text
          color="darkblue"
          alignSelf="center"
          fontSize="1.6rem"
          fontWeight="500"
        >
          Choose the period for POTM
        </Text>
        <Flex justifyContent="space-between" my="2rem">
          <Flex
            justifyContent="space-between"
            width="16rem"
            alignItems="center"
          >
            <Text fontSize="1.4rem" fontWeight="semibold">
              From:{" "}
            </Text>
            <Select
              width="6rem"
              icon={<ChevronDownIcon />}
              size="lg"
              placeholder="Select Month"
              variant="outline"
              fontSize="1.3rem"
              onChange={(e) =>
                setStart((state) => {
                  const newState = {
                    ...state,
                    month: parseInt(e.target.value),
                  };

                  return newState;
                })
              }
              value={start.month}
            >
              <option value={1}>Jan</option>
              <option value={2}>Feb</option>
              <option value={3}>Mar</option>
              <option value={4}>Apr</option>
              <option value={5}>May</option>
              <option value={6}>Jun</option>
              <option value={7}>Jul</option>
              <option value={8}>Aug</option>
              <option value={9}>Sep</option>
              <option value={10}>Oct</option>
              <option value={11}>Nov</option>
              <option value={12}>Dec</option>
            </Select>

            <Input
              placeholder="Year"
              width="5.5rem"
              size="lg"
              fontSize="1.4rem"
              type="number"
              value={start.year}
              onChange={(e) =>
                setStart((state) => {
                  const newState: ChooserState = {
                    ...state,
                    year: parseInt(e.target.value),
                  };
                  return newState;
                })
              }
            />
          </Flex>

          <Flex
            justifyContent="space-between"
            width="15rem"
            alignItems="center"
          >
            <Text fontSize="1.4rem" fontWeight="semibold">
              Till:{" "}
            </Text>
            <Select
              width="6rem"
              icon={<ChevronDownIcon />}
              size="lg"
              placeholder="Select Month"
              variant="outline"
              fontSize="1.3rem"
              onChange={(e) =>
                setEnd((state) => {
                  const newState = {
                    ...state,
                    month: parseInt(e.target.value),
                  };

                  return newState;
                })
              }
              value={end.month}
            >
              <option value={1}>Jan</option>
              <option value={2}>Feb</option>
              <option value={3}>Mar</option>
              <option value={4}>Apr</option>
              <option value={5}>May</option>
              <option value={6}>Jun</option>
              <option value={7}>Jul</option>
              <option value={8}>Aug</option>
              <option value={9}>Sep</option>
              <option value={10}>Oct</option>
              <option value={11}>Nov</option>
              <option value={12}>Dec</option>
            </Select>

            <Input
              placeholder="Year"
              width="5.5rem"
              size="lg"
              fontSize="1.4rem"
              type="number"
              value={end.year}
              onChange={(e) =>
                setEnd((state) => {
                  const newState: ChooserState = {
                    ...state,
                    year: parseInt(e.target.value),
                  };
                  return newState;
                })
              }
            />
          </Flex>
        </Flex>
        <Box my="0 1rem">
          <Text
            color="darkblue"
            fontSize="1.6rem"
            fontWeight="500"
            textAlign="left"
          >
            Filter:
          </Text>

          <Flex mt="0.8rem" ml="1rem">
            <Text fontSize="1.3rem" mr="1.4rem" fontWeight="semibold">
              Division:{" "}
            </Text>
            <CheckboxGroup
              defaultValue={checkedDiv}
              onChange={(value) => setCheckedDiv(value)}
            >
              <Stack spacing={[3]} direction={["row"]}>
                <Checkbox colorScheme="teal" size="lg" value="Div. 1">
                  Div. 1
                </Checkbox>
                <Checkbox colorScheme="teal" size="lg" value="Div. 2">
                  Div. 2
                </Checkbox>
                <Checkbox colorScheme="teal" size="lg" value="Div. 3">
                  Div. 3
                </Checkbox>
                <Checkbox colorScheme="teal" size="lg" value="Div. 4">
                  Div. 4
                </Checkbox>
                <Checkbox colorScheme="teal" size="lg" value="others">
                  others
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Flex>
        </Box>

        <Button
          m="3rem 1rem 0 2rem"
          size="lg"
          fontSize="1.4rem"
          colorScheme="teal"
          isLoading={contestLoading == Loading.PENDING}
          onClick={() => setUpdateList(state=> 1 - state)}
        >
          Fetch Contest List
        </Button>
      </Flex>
    </>
  );
};

export default Setting;
