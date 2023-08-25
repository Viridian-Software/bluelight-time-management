/* eslint-disable prettier/prettier */
import { socket } from '@renderer/context/websocketContext'
import { useState } from 'react'
import './profile.styles.scss'
const { ipcRenderer } = window.require('electron')

export const Profile = (props: ProfileProps): JSX.Element => {
  const [currentSessionId, setCurrentSessionId] = useState(-1)
  const [currentStatus, setCurrentStatus] = useState(props.isCurrentlyActive)

  // async function getCurrentMousePosition() {
  //   let currentMousePosition = await ipcRenderer.invoke('message-channel')
  //   return currentMousePosition
  // }
  ipcRenderer.on('event-response', (event, reply: boolean) => {
    if (!reply) {
      setCurrentStatus(false)
      if (currentSessionId !== -1) {
        socket.emit('enterLogoutTime', currentSessionId)
        setCurrentSessionId(-1)
      }
    }
  })
  const onChangeStatus = () => {
    console.log('change status called')
    socket.emit('setActiveStatus', { userId: props.id, status: currentStatus }, (response) => {
      console.log('status changed')
    })
    setCurrentStatus((prevStatus) => !prevStatus)
    if (currentStatus) {
      ipcRenderer.send('user-status-changed', true)
    } else {
      ipcRenderer.send('user-status-changed', false)
    }
    if (currentSessionId !== -1) {
      socket.emit('enterLogoutTime', currentSessionId)
      setCurrentSessionId(-1)
    }
  }

  const onStartWork = async () => {
    onChangeStatus()
    if (currentSessionId === -1) {
      socket.emit('createSession', { data: { userId: props.id } }, (response) => {
        console.log(response)
        setCurrentSessionId(response.id)
      })
    }
    // let currentMouseCoordinates = await getCurrentMousePosition()
    // if (currentStatus === false) {
    //   const monitorActivity = setTimeout(async () => {
    //     let newMouseCoordinates = await getCurrentMousePosition()
    //     if (
    //       newMouseCoordinates.x === currentMouseCoordinates.x &&
    //       newMouseCoordinates.y === currentMouseCoordinates.y
    //     ) {
    //       console.log('User is inactive')
    //       onChangeStatus()
    //       console.log('onchangestatus called')
    //       clearInterval(monitorActivity)
    //       console.log('interval cleared')
    //     } else {
    //       currentMouseCoordinates = newMouseCoordinates
    //     }
    //   }, 10000)
    // }
  }

  const lunch = (
    <div className="lunch-container">
      <button onClick={onChangeStatus}>Lunch</button>
      <button onClick={onChangeStatus}>AFK</button>
    </div>
  )
  return (
    <div className="profile">
      <h1>{`${props.fname} ${props.lname}`}</h1>
      <h2>{`${props.email}`}</h2>
      <p>User Id: {`${props.id}`}</p>
      <p>Activity Status: {`${currentStatus}`}</p>
      <button onClick={onStartWork}>{currentStatus === true ? 'Stop Work' : 'Start Work'}</button>
      {currentStatus === true ? <></> : lunch}
    </div>
  )
}
