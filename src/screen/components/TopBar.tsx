import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from "react-icons/vsc";

import { Flex, Text } from "@chakra-ui/react";
import React from "react";
export interface BarSetting{
  host: string
}
const TopBar = ( {context}  ) => {
  return (
    <>
      <style>
        {`
         .app-draggable {
          -webkit-app-region: drag;
          -webkit-user-select: none; 
         }
        `}
      </style>
      <Flex height="3rem" backgroundColor="rgb(229,229,229)" width="100%">
        <Flex width="25rem" justifyContent="space-around" key={0}>
          <Flex
            className="app-draggable"
            alignItems="center"
            justifyContent="space-around"
            pl="1rem"
          >
            <Text fontSize={13} color="blueviolet" fontWeight="semibold">
              POTM
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-around"
            _hover={{ bg: "#DCDCDC" }}
            px="0.8rem"
            my="0.3rem"
            ml="1rem"
            borderRadius="7px"
          >
            <Text fontSize={13}>File</Text>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-around"
            _hover={{ bg: "#DCDCDC" }}
            px="0.8rem"
            my="0.3rem"
            borderRadius="7px"
          >
            <Text fontSize={13}>Open</Text>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-around"
            _hover={{ bg: "#DCDCDC" }}
            px="0.8rem"
            my="0.3rem"
            borderRadius="7px"
          >
            <Text fontSize={13}>About</Text>
          </Flex>
        </Flex>

        <Flex className="app-draggable" width="100%"></Flex>
        <Flex width="16rem" alignItems="center" justifyContent="space-around">
          <Flex
            _hover={{ bg: "#DCDCDC" }}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="space-around"
            onClick={() => window.api.minimizeWindow()}
          >
            <VscChromeMinimize color="black" size={16} />
          </Flex>
          <Flex
            _hover={{ bg: "#DCDCDC" }}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="space-around"
            onClick={() => window.api.maximizeWindow()}
          >
            <VscChromeMaximize color="black" size={16} />
          </Flex>
          <Flex
            _hover={{ bg: "#DCDCDC" }}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="space-around"
            onClick={() => {
              context == "HOME"
                ? window.api.closeWindow()
                : window.api.closePotm();
            }}
          >
            <VscChromeClose size={16} color="black" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TopBar;
