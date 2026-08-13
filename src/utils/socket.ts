import io from "socket.io-client";
import { BASE_URL } from "../constants";

const socketConnection = () => {
  return io(BASE_URL);
};

export default socketConnection;
