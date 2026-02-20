// src/socket.js
import { io } from "socket.io-client";

// Replace with your backend URL and port
const BACKEND_URL = "http://localhost:8080";

// Create a singleton socket client
const socket = io(BACKEND_URL, {
  autoConnect: true,  // automatically connect when imported
});

// Optional: debug logs
socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

export default socket;
