// src/hooks/useGetRealTimeMessage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import socket from "../socket"; // ✅ import the client

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);

  useEffect(() => {
    // Listen for new messages from server
    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    // Cleanup
    return () => {
      socket.off("newMessage");
    };
  }, [messages, dispatch]);
};

export default useGetRealTimeMessage;
