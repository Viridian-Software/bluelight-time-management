import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'
import { refactorMilliseconds } from '@renderer/lib/functions'

export const UserCard = (props: UserCardProps): JSX.Element => {
  const [time, setTime] = useState(0)
  useEffect(() => {
    socket.emit('getWeeklyHours', props.userId, (response: number) => {
      setTime(response)
    })
  }, [])

  return (
    <>
      <div>
        <div>
          <h2>{`${props.fname} ${props.lname}: ${props.userId}`}</h2>
        </div>
        <table>
          <tr>
            <th>Week to Date</th>
            <th>Today</th>
          </tr>
          <tr>
            <th>{refactorMilliseconds(time)}</th>
            <th></th>
          </tr>
        </table>
      </div>
    </>
  )
}