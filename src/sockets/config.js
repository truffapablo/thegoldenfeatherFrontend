import {io} from 'socket.io-client';
/**
 * Configuracion vultr
 * const socket = io("http://www.thegoldenfeather.dev", { transports: ["websocket"] });
 * 
 * Configuracion localhost
 * const socket = io("http://localhost:4001", { transports: ["websocket"] });
 * 
 */
const socket = io("http://localhost:4001", { transports: ["websocket"] });

export default socket;
