import { Text, Flex, Select, Input, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { fetchAllContest, Loading } from "../../redux/slice/afapi-slice";
import { setEpochStart, setEpochEnd } from "../../redux/slice/contest-slice";

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

  const [start, setStart] = useState<ChooserState>(initials);
  const [end, setEnd] = useState<ChooserState>(initials);

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

  return (
    <>
      <Flex flexDir="column" p="1.4rem">
        <Text
          color="darkblue"
          alignSelf="center"
          fontSize="1.6rem"
          fontWeight="500"
        >
          Choose the period for POTM
        </Text>
        <Flex justifyContent="space-between" my="2.4rem">
          <Text fontSize="1.4rem">From: </Text>
          <Select
            width="10rem"
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
            width="10rem"
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

        <Flex justifyContent="space-between" mb="2.4rem">
          <Text fontSize="1.4rem">Till: </Text>
          <Select
            width="10rem"
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
            width="10rem"
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

        <Button
          m="1rem"
          size="lg"
          fontSize="1.4rem"
          colorScheme="teal"
          isLoading={contestLoading == Loading.PENDING}
          onClick={() => dispatch(fetchAllContest(1))}
        >
          Fetch Contest
        </Button>
      </Flex>
    </>
  );
};

export default Setting;
