import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { increamented } from "../../redux/slice/counter-slice";
import { Box, Flex, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import Contestant from "../components/Contestant";
import TopBar from "../components/TopBar";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <TopBar/>

      <Grid
        h="200px"
        templateRows="repeat(3, 16rem)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        m="2rem"
      >
        <GridItem
        maxW="400px"
          rowSpan={3}
          colSpan={2}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
          mx="1rem"
        >
          <Contestant />
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem rowSpan={2} colSpan={4} bg="tomato" />
      </Grid>
    </>
  );
};

export default Home;
