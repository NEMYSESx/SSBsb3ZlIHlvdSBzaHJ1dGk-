import {io} from "socket.io-client";

let socket = null;

export const connectSocket = (userId)=>{
    console.log("Connecting socket for user:", userId);
    socket = io(import.meta.env.MODE ==="development" ? "http://localhost:4000":"", {
        query: { userId: userId || "" },
        transports: ['websocket', 'polling'],
        upgrade: true,
        rememberUpgrade: true,
        path: "/socket.io"
    });
    
    // Make socket globally accessible for notifications
    window.socket = socket;

    socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
    });

    return socket;
};

export const getSocket = ()=> socket;
export const disconnectSocket = ()=>{
    if(socket){
        socket.disconnect();
        socket = null;
        window.socket = null;
    }
}