import io from "socket.io-client";
import { url } from "./config";

const socket = io(url, { transports: ['websocket'] });

export default socket