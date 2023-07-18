/* eslint-disable prettier/prettier */
import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'

export const Profile = (props: ProfileProps): JSX.Element => {
  const [currentSessionId, setCurrentSessionId] = useState(-1)
  const [isActive, setIsActive] = useState(true)
  useEffect(() => {
    socket.emit('createSession', { data: { userId: props.id } }, (response) => {
      console.log(response)
      setCurrentSessionId(response.id)
    })
    return () => {
      socket.emit('enterLogoutTime', currentSessionId)
    }
  }, [])
  return (
    <>
      <h1>{`${props.fname} ${props.lname}`}</h1>
      <h2>{`${props.email}`}</h2>
      <p>User Id: {`${props.id}`}</p>
      <p>Session ID: {currentSessionId}</p>
      <button>Lunch</button>
      <button>AFK</button>
    </>
  )
}
