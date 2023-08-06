import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

//TODO: Switch to environment variable
export const socket = io('https://employee-monitor-ec0d1c2f0000.herokuapp.com/')
export const WebSocketContext = createContext<Socket>(socket)
export const WebSocketProvider = WebSocketContext.Provider
