import { io, type Socket } from "socket.io-client";
import { BASE_URL } from "../constants";

let socket: Socket | null = null;

const createSocket = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, { withCredentials: true });
  }

  return io("/", {
    path: "/api/socket.io",
    withCredentials: true,
  });
};

export const getSocket = () => {
  if (!socket) {
    socket = createSocket();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
