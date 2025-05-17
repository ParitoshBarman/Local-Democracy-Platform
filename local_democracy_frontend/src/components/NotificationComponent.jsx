// NotificationComponent.jsx
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { Toaster, toaster } from "./ui/toaster"
import { useDispatch } from "react-redux";

const socket = io("https://local-democracy-platform.onrender.com/");
// const socket = io("http://localhost:3001");

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
