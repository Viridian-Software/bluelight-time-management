/* eslint-disable prettier/prettier */
import { socket } from '@renderer/context/websocketContext'
import { useState } from 'react'

export const Profile = (props: ProfileProps): JSX.Element => {
  const [currentSessionId, setCurrentSessionId] = useState(-1)
  const [currentStatus, setCurrentStatus] = useState(props.isCurrentlyActive)

  const onChangeStatus = () => {
    socket.emit('setActiveStatus', { id: props.id, status: currentStatus }, (response) => {
      setCurrentStatus(!currentStatus)
    })

    if (currentSessionId !== -1) {
      socket.emit('enterLogoutTime', currentSessionId)
      setCurrentSessionId(-1)
    }
  }

  const onStartWork = () => {
    onChangeStatus()
    if (currentSessionId === -1) {
      socket.emit('createSession', { data: { userId: props.id } }, (response) => {
        console.log(response)
        setCurrentSessionId(response.id)
      })
    }
  }
  return (
    <>
      <h1>{`${props.fname} ${props.lname}`}</h1>
      <h2>{`${props.email}`}</h2>
      <p>User Id: {`${props.id}`}</p>
      <p>Session ID: {currentSessionId}</p>
      <p>Activity Status: {`${currentStatus}`}</p>
      <button onClick={onStartWork}>Start Work</button>
      <button onClick={onChangeStatus}>Lunch</button>
      <button onClick={onChangeStatus}>AFK</button>
    </>
  )
}
