import { useAppDispatch } from "../../redux/hook";
import { Box, Flex, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import Contestant from "../components/Contestant";
import TopBar from "../components/TopBar";
import Setting from "../components/Setting";
import ContestTable from "../components/ContestTable";
import Filter from "../components/Filter";
const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <TopBar context="HOME"/>
      <Grid
      maxW="1300px"
        m="4rem auto"
        px="2rem"
        templateRows="repeat(10, 5.6rem)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem
          maxW="360px"
          rowSpan={10}
          colSpan={2}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
        >
          <Contestant />
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={4}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
        >
          <Filter/>
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={4}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
        >
          <Setting />
        </GridItem>
        <GridItem
          rowSpan={6}
          mt="1rem"
          colSpan={4}
          bg="rgb(178,216,216,0.2)"
          borderRadius="11px"
          overflowY="scroll"
        >
          <ContestTable />
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
