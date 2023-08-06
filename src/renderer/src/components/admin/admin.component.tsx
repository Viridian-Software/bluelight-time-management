import { socket } from '@renderer/context/websocketContext'
import { UserCard } from '../userCard/userCard.component'
import { useState } from 'react'
import './admin.styles.scss'
import { Reports } from '../reports/reports.component'

export const Admin = (props: AdminProps): JSX.Element => {
  const [users, setUsers] = useState<Users[]>([])
  const [activeTab, setActiveTab] = useState('tab1')
  socket.emit('findAllUsers', {}, (response: Users[]) => {
    setUsers(response)
  })

  socket.on('userStatusChanged', () => {
    socket.emit('findAllUsers', {}, (response: Users[]) => {
      setUsers(response)
    })
  })
  const selectTabOne = () => {
    setActiveTab('tab1')
  }
  const selectTabTwo = () => {
    setActiveTab('tab2')
  }

  const mapUsers = () =>
    users.map((user) => (
      <UserCard
        key={user.id}
        fname={user.fname}
        lname={user.lname}
        userId={user.id}
        isCurrentlyActive={user.isCurrentlyActive}
      />
    ))

  return (
    <>
      <div className="Tabs">
        <div className="admin-header">
          <h1>{`${props.fname} ${props.lname}`}</h1>
          <br />
          <ul className="nav">
            <li className={activeTab === 'tab1' ? 'active' : ''} onClick={selectTabOne}>
              Current Users
            </li>
            <li className={activeTab === 'tab2' ? 'active' : ''} onClick={selectTabTwo}>
              Administration
            </li>
          </ul>
        </div>
        <div className="outlet">{activeTab === 'tab1' ? mapUsers() : <Reports />}</div>
      </div>
    </>
  )
}
