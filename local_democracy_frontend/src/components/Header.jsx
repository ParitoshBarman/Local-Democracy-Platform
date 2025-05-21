import { Box, Flex, Text, Spacer, Avatar, HStack, Menu, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "./ui/toaster";
import { useSelector } from "react-redux";
const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_URL;

const Header = () => {
  let userState = useSelector((state)=>state.user)
  const navigate = useNavigate();
  function handalLogout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    toaster.create({
      title: 'Successfully Logout!',
      type: 'warning',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    })
    navigate('/login');
  }
  return (<>
    <Toaster />
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
            Hello, {userState?.user?.name}
          </Text>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Avatar.Root>
                <Avatar.Fallback name={userState?.user?.name} />
                <Avatar.Image src={`${IMAGE_BASE_URL}${userState?.user?.profilePhoto}`} />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner style={{ position: "absolute", top: "0px", right: "0px", zIndex: 1005 }}>
                <Menu.Content style={{ position: "absolute", top: "0px", right: "0px", zIndex: 1005 }}>
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel>More</Menu.ItemGroupLabel>
                    <Menu.Item>Profile</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Separator />
                  <Menu.ItemGroup>
                    <Menu.ItemGroupLabel onClick={handalLogout} style={{cursor:'pointer'}}>LogOut</Menu.ItemGroupLabel>

                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>

          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  </>
  );
};

export default Header;
