import { socket } from '@renderer/context/websocketContext'
import { useEffect, useState } from 'react'
import { refactorMilliseconds } from '@renderer/lib/functions'
import './userCard.styles.scss'

export const UserCard = (props: UserCardProps): JSX.Element => {
  const [time, setTime] = useState(0)
  useEffect(() => {
    socket.emit('getWeeklyHours', props.userId, (response: number) => {
      setTime(response)
    })
  }, [])

  return (
    <>
      <div className={props.isCurrentlyActive ? 'active' : 'notActive'}>
        <div>
          <h2>{`${props.fname} ${props.lname}: ${props.userId}`}</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Week to Date</th>
            </tr>
            <tr>
              <th>{refactorMilliseconds(time)}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
