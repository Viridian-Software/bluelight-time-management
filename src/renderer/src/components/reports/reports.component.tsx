import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'
import { AddUser } from '../add_user/addUser.component'
const { ipcRenderer } = window.require('electron')
export const Reports = (): JSX.Element => {
  const [allUsersAndSessions, setAllUsersAndSessions] = useState('')
  const [adduser, setAddUser] = useState(false)

  useEffect(() => {
    socket.emit('getUsersAndSessions', {}, (response) => {
      setAllUsersAndSessions(response)
    })
  }, [])

  const handleDownload = () => {
    ipcRenderer.send('downloadStateData', allUsersAndSessions)
  }

  const displayAddUser = () => {
    setAddUser(true)
  }
  return (
    <>
      <div>
        <button onClick={handleDownload} className="button">
          Download All Session Information
        </button>
        <button onClick={displayAddUser}>Add User</button>
        {adduser === true ? <AddUser /> : <></>}
      </div>
    </>
  )
}
