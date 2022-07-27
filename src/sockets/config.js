import {io} from 'socket.io-client';
/**
 * Configuracion vultr
 * const socket = io("https://www.thegoldenfeather.dev", { transports: ["websocket"] });
 * 
 * Configuracion localhost
 * const socket = io("http://localhost:4001", { transports: ["websocket"] });
 * 
 */
 
 const socket = io(process.env.REACT_APP_SOCKET_CONFIG, { transports: ["websocket"] });


export default socket;
