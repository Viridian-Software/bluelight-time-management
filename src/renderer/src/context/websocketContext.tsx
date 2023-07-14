import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

//TODO: Switch to environment variable
export const socket = io('http://localhost:3000')
export const WebSocketContext = createContext<Socket>(socket)
export const WebSocketProvider = WebSocketContext.Provider
