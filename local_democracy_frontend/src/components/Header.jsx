import { Box, Flex, Text, Spacer, Avatar, HStack, Menu, Portal } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      as="header"
      width="100%"
      px={6}
      py={3}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color="blue.600">
          Local Democracy
        </Text>

        <Spacer />

        <HStack spacing={4}>
          <Text fontSize="md" fontWeight="medium" color="gray.700">
            Hello, Paritosh Barman
          </Text>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Avatar.Root>
                <Avatar.Fallback name="Paritosh Barman" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner style={{ position: "absolute", top: "0px", right: "0px", zIndex: 1005 }}>
                <Menu.Content style={{ position: "absolute", top: "0px", right: "0px", zIndex: 1005}}>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>More</Menu.ItemGroupLabel>
                    <Menu.Item>Profile</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Separator />
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>LogOut</Menu.ItemGroupLabel>
                    
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
              </Portal>
            
          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
