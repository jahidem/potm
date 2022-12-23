import {
  Flex,
  Button,
  Box,
  Text,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import {useState , useEffect} from "react"
import { useAppDispatch } from "../../redux/hook";
import { updateAllowOC } from "../../redux/slice/contest-slice";
const Filter = () => {
  const [allow, setAllow] = useState<(string | number)[]>(["Div. 2", "Div. 3"]);
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(updateAllowOC(allow))
  }, [allow])
  return (
    <>
      <Flex
        w="100%"
        h="100%"
        flexDir="column"
        justifyContent="space-around"
        padding="1.6rem"
        border="3px solid rgb(90,190,250, 0.1)"
        borderRadius="11px"
      >
        <Flex m="1rem">
          <Text fontSize="1.3rem" mr="1rem">
            Allow OUT_OF_COMPETITION:{" "}
          </Text>

          <CheckboxGroup
            colorScheme="twitter"
            defaultValue={allow}
            onChange={(values)=> setAllow(values)}
          >
            <Stack spacing={[13]} direction={["row"]}>
              <Checkbox size="lg" value="Div. 2">
                Div. 2
              </Checkbox>
              <Checkbox size="lg" value="Div. 3">
                Div. 3
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </Flex>
        <Flex w="100%" justifyContent="center" flexDir="column">
          <Text colorScheme="gray" fontSize="1.4rem" fontWeight="semibold">
            The programmer of the month will be generate including the current
            contestant and contest.
          </Text>
          <Button
            m="2.4rem"
            size="lg"
            fontSize="1.4rem"
            colorScheme="twitter"
            onClick={() => {
              window.api.openPotmWindow();
            }}
          >
            Generate POTM
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default Filter;
