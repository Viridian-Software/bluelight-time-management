import { socket } from '@renderer/context/websocketContext'
import { UserCard } from '../userCard/userCard.component'
import { useState } from 'react'
import './admin.styles.scss'
import { Reports } from '../reports/reports.component'
import { AddUser } from '../add_user/addUser.component'

export const Admin = (props: AdminProps): JSX.Element => {
  const [users, setUsers] = useState<Users[]>([])
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
  const [activeTab, setActiveTab] = useState({ tab: 'tab2', display: <Reports /> })
  socket.emit('findAllUsers', {}, (response: Users[]) => {
    setUsers(response)
  })

  socket.on('userStatusChanged', () => {
    socket.emit('findAllUsers', {}, (response: Users[]) => {
      setUsers(response)
    })
  })
  const selectTabOne = () => {
    setActiveTab({ tab: 'tab1', display: mapUsers() })
  }
  const selectTabTwo = () => {
    setActiveTab({ tab: 'tab2', display: <Reports /> })
  }

  const selectTabThree = () => {
    setActiveTab({ tab: 'tab3', display: <AddUser /> })
  }

  return (
    <>
      <div className="Tabs">
        <div className="admin-header">
          <h1>{`${props.fname} ${props.lname}`}</h1>
          <br />
          <ul className="nav">
            <li className={activeTab.tab === 'tab1' ? 'active' : ''} onClick={selectTabOne}>
              Current Users
            </li>
            <li className={activeTab.tab === 'tab2' ? 'active' : ''} onClick={selectTabTwo}>
              Reports
            </li>
            <li className={activeTab.tab === 'tab3' ? 'active' : ''} onClick={selectTabThree}>
              Add Users
            </li>
          </ul>
        </div>
        <div className="outlet">{activeTab.display}</div>
      </div>
    </>
  )
}
