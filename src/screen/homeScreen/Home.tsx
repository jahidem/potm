import { useAppDispatch } from "../../redux/hook";
import { Box, Flex, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import Contestant from "../components/Contestant";
import TopBar from "../components/TopBar";
import Setting from "../components/Setting";
import ContestTable from "../components/ContestTable";
const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <TopBar />

      <Grid
        h="200px"
        templateRows="repeat(10, 5rem)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        m="2rem"
      >
        <GridItem
          maxW="350px"
          rowSpan={10}
          colSpan={2}
          bg="rgb(247, 249, 249,1)"
          borderRadius="11px"
          mx="1rem"
        >
          <Contestant />
        </GridItem>
        <GridItem colSpan={2}rowSpan={3} bg="rgb(247, 249, 249,1)"  borderRadius="11px">
            
          </GridItem>
        <GridItem colSpan={2} rowSpan={3} bg="rgb(247, 249, 249,1)"  borderRadius="11px">
          <Setting/>
        </GridItem>
        <GridItem rowSpan={7} mt="1rem" colSpan={4} bg="rgb(178,216,216,0.2)"  borderRadius="11px">
          <ContestTable/>
          </GridItem>
      </Grid>
    </>
  );
};

export default Home;
