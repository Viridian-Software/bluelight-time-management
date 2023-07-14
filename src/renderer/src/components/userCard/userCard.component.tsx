import { WebSocketContext } from '@renderer/context/websocketContext'
import { useContext, useEffect } from 'react'

export const UserCard = (props): JSX.Element => {
  const socket = useContext(WebSocketContext)

  return (
    <>
      <div>
        <h1>{`${props.fname} ${props.lname}`}</h1>
      </div>
    </>
  )
}
