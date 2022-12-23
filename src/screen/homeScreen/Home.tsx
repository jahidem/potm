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
      maxW="1333px"
        m="4rem auto"
        px="2rem"
        templateRows="repeat(10, 5.6rem)"
        templateColumns="repeat(6, 1fr)"
        gap={2}
        
      >
        <GridItem
          maxW="360px"
          height="calc(100vh - 11rem)"
          rowSpan={10}
          colSpan={2}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
        >
          <Contestant />
        </GridItem>
        <GridItem
        mr="1.4rem"
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
          height="calc(100vh - 350px)"
          rowSpan={6}
          p = "1rem"
          mt="1.4rem"
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
