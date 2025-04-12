import React, { useState, useEffect } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Avatar,
  Heading, useBreakpointValue 
} from '@chakra-ui/react'
import {FiMenu} from 'react-icons/fi'
import Nav from './Nav'

const Sidebar = () => {
  const defaultNavSize = useBreakpointValue({
    base: "small", md: "large"
  });


  const [navSize, changeNavSize] = useState(defaultNavSize || "large")

  useEffect(() => {
    if (defaultNavSize) {
      changeNavSize(defaultNavSize);
    }
  }, [defaultNavSize]);

  return (
    <>
      <Flex
        pos="sticky"
        left="5"
        minH="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        onMouseEnter={()=>changeNavSize("large")}
        onMouseLeave={()=>changeNavSize("small")}
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
            <FiMenu color='black' />
          </IconButton>

<Nav navSize={navSize}/>
          
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
              <Avatar.Fallback name="Paritosh Barman" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
              <Heading as="h3" size="sm">Paritosh Barman</Heading>
              <Text color="gray">User</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

    </>
  )
}

export default Sidebar
