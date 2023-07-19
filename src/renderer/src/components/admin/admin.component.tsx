import { socket } from '@renderer/context/websocketContext'
import { UserCard } from '../userCard/userCard.component'
import { useState } from 'react'

export const Admin = (props: AdminProps): JSX.Element => {
  const [users, setUsers] = useState<Users[]>([])
  socket.emit('findAllUsers', {}, (response: Users[]) => {
    setUsers(response)
  })

  socket.on('userStatusChanged', () => {
    socket.emit('findAllUsers', {}, (response: Users[]) => {
      setUsers(response)
    })
  })

  return (
    <>
      <div>
        <h1>{`${props.fname} ${props.lname}`}</h1>
        <div>
          {users.map((user) => (
            <UserCard
              fname={user.fname}
              lname={user.lname}
              userId={user.id}
              isCurrentlyActive={user.isCurrentlyActive}
            />
          ))}
        </div>
      </div>
    </>
  )
}
