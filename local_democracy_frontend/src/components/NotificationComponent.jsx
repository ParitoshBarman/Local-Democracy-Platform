// NotificationComponent.jsx
import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { Toaster, toaster } from "./ui/toaster"
import { useDispatch } from "react-redux";

const socket = io("http://localhost:3001"); // Replace with your backend URL if hosted

const NotificationComponent = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        socket.on("notification", (data) => {
            dispatch({ type: 'ADD_NOTIFICATION', payload: data })


            toaster.create({
                title: data.title,
                description: data.description,
                status: "info",
                duration: 7000,
                isClosable: true,
                position: "top-right",
                type: 'success',
            })

            console.log(data);
        });

        // return () => {
        //   socket.disconnect();
        // };
    }, []);

    return (
        <>
            <Toaster />
        </>

    );
};

export default NotificationComponent;
