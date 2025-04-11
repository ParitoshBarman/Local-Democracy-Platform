import React, { useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Avatar,
  Heading
} from '@chakra-ui/react'
import { FiMenu } from "react-icons/fi";
import { LuSearch } from "react-icons/lu"



const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large")
  return (
    <>
      <Flex
        pos="sticky"
        left="5"
        h="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            
            onClick={() => {
              if (navSize == "small")
                changeNavSize("large")
              else
              changeNavSize("small")
          }}
          >
          <FiMenu/>
          </IconButton>
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
        >

          <Flex mt={4} align="center">
            <Avatar.Root>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
              <Heading as="h3" size="sm">Sylwia Weller</Heading>
              <Text color="gray">Admin</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

    </>
  )
}

export default Sidebar
