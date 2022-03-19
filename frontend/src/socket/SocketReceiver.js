/**
 * Attach to receive events from socket.io server
 */
 import { useEffect } from 'react';
 import { useDispatch } from 'react-redux';
 
 import registerGame from "./game.receiver";
 
 export default function SocketReceiver() {
     const dispatch = useDispatch();
 
     useEffect(() => {
         dispatch(registerGame());
     }, [dispatch]);
     
     return (null); // Not rendering anything
 }