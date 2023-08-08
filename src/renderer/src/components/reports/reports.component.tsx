import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'
const { ipcRenderer } = window.require('electron')
export const Reports = (): JSX.Element => {
  const [allUsersAndSessions, setAllUsersAndSessions] = useState('')
  useEffect(() => {
    socket.emit('getUsersAndSessions', {}, (response) => {
      setAllUsersAndSessions(response)
    })
  }, [])

  const handleDownload = () => {
    ipcRenderer.send('downloadStateData', allUsersAndSessions)
  }

  return (
    <>
      <div>
        <button onClick={handleDownload} className="button">
          Download All Session Information
        </button>
      </div>
    </>
  )
}
