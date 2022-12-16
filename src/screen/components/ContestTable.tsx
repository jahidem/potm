import { Box,TableContainer, Table,Tr, Td, Tbody, Thead, Th,TableCaption  } from "@chakra-ui/react";

const ContestTable = ()=>{
  return(
  <Box overflowY="scroll">
  <TableContainer fontSize="1.4rem">
  <Table size='md' fontSize="1.4rem" >
  <TableCaption fontSize="1.4rem" placement="top">All contest on this month</TableCaption>
    <Thead  >
      <Tr >

      <Th fontSize="1.2rem">Id</Th>
        <Th fontSize="1.2rem">Name</Th>
        <Th fontSize="1.2rem">Type</Th>
        
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
      <Tr>
        <Td >inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
</Box>)
}

export default ContestTable;