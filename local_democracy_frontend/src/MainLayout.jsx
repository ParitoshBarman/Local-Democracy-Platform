import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AllRouter from "./components/AllRouter";

const MainLayout = () => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1">
        <Header />
        <Box p="4">
          <AllRouter />
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
