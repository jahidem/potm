import { Text, Flex,Select, Input, Button } from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hook";

const Setting = () => {
  return (
    <>
      <Flex flexDir="column" p="1rem">
        <Text
          color="darkblue"
          alignSelf="center"
          fontSize="2xl"
          fontWeight="500"
        >
          Select The Month to fetch contest list
        </Text>
        <Flex justifyContent="space-around" my="2.4rem">
          <Select 
          width="10rem"
          icon={<ChevronDownIcon />}  
          size='lg'
           placeholder="Select Month" 
           variant='outline'
            fontSize="1.3rem" >
            <option value="1" >Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </Select>

        <Input placeholder="Year" width="10rem" size="lg" fontSize="1.4rem" type="number"/>
        </Flex>
        <Button m="1rem" size="lg" fontSize="1.4rem" colorScheme="teal">
          Fetch Contest
        </Button>
      </Flex>
    </>
  );
};

export default Setting;
