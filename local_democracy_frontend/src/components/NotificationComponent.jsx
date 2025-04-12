// NotificationComponent.jsx
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { Toaster, toaster } from "./ui/toaster"

const socket = io("http://localhost:3001"); // Replace with your backend URL if hosted

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
//   const toast = useToast();

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);

    //   toast({
    //     title: data.title,
    //     description: data.description,
    //     status: "info",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top-right",
    //   });

    toaster.create({
        title: data.title,
        description: data.description,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        type:'success',
      })

    console.log(data);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <VStack align="start" spacing={3} mt={6}>
      <Text fontSize="xl" fontWeight="bold">
        Real-Time Notifications
      </Text>
      {notifications.map((notif, idx) => (
        <Box
          key={idx}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          w="100%"
        >
          <Text fontWeight="bold">{notif.title}</Text>
          <Text>{notif.description}</Text>
          <Text fontSize="sm" color="gray.500">
            {notif.date}
          </Text>
        </Box>
      ))}

      <Toaster />
    </VStack>
  );
};

export default NotificationComponent;
