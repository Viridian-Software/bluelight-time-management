import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'
const { ipcRenderer } = window.require('electron')
export const Reports = (): JSX.Element => {
  const [allSessions, setAllSessions] = useState('')
  const [allUsers, setAllUsers] = useState('')
  const [allUsersAndSessions, setAllUsersAndSessions] = useState('')

  useEffect(() => {
    socket.emit('findAllSessions', {}, (response) => {
      setAllSessions(response)
    })
    socket.emit('findAllUsers', {}, (response) => {
      setAllUsers(response)
    })
    socket.emit('getUsersAndSessions', {}, (response) => {
      setAllUsersAndSessions(response)
    })
  }, [])

  const handleDownload = () => {
    ipcRenderer.send('downloadStateData', allUsersAndSessions)
  }
  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  )
}
