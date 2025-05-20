import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useLocation } from "react-router-dom";


const MainLayout = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch({ type: 'LOAD_USER' });
    }, []);

  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1">
        <Header />
        <Box p="4">
          {props.children}
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
