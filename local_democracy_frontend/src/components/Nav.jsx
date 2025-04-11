import React from "react";
import { Flex, Box, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Icon, Text } from "@chakra-ui/react";

  import {
    FiHome,
    FiBell,
    FiFileText,
    FiThumbsUp,
    FiMessageCircle,
    FiBarChart2,
    FiUsers,
    FiCalendar
  } from "react-icons/fi";
  

const Nav = (props) => {
  const navLinks = [
    { icon: <FiHome />, path: "/", label: "Dashboard" },
    { icon: <FiBell />, path: "/notifications", label: "Notifications" },
    { icon: <FiFileText />, path: "/laws", label: "Laws" },
    { icon: <FiThumbsUp />, path: "/voting", label: "Voting" },
    { icon: <FiMessageCircle />, path: "/feedback", label: "Feedback" },
    { icon: <FiBarChart2 />, path: "/impact", label: "Impact" },
    { icon: <FiUsers />, path: "/stories", label: "Stories" },
    { icon: <FiCalendar />, path: "/initiatives", label: "Initiatives" },
  ];

  return (
    <Flex
      as="nav"
      color="white"
      px={6}
      py={3}
      gap={6}
      flexDir="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      {navLinks.map((link) => (
        <Box key={link.path}>
          <Link
            as={NavLink}
            to={link.path}
            _hover={{ textDecoration: "none", color: "blue.600" }}
            _activeLink={{ fontWeight: "bold", borderBottom: "2px solid white" }}
          >
            <Icon>{link.icon}</Icon><Text display={props.navSize=="small"?"none":"block"}>{link.label}</Text>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default Nav;
