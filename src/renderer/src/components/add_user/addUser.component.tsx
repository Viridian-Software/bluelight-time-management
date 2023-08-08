import { socket } from '@renderer/context/websocketContext'
import { useState } from 'react'
import './addUser.styles.scss'
export const AddUser = () => {
  const [formState, setFormState] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  })
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormState((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    socket.emit('createUser', formState)
    setFormState({
      fname: '',
      lname: '',
      email: '',
      password: ''
    })
  }
  return (
    <div className="add-user-form">
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="fname" onChange={handleUserInput} value={formState.fname} />
        <label>Last Name</label>
        <input type="text" name="lname" onChange={handleUserInput} value={formState.lname} />
        <label>Email</label>
        <input type="text" name="email" onChange={handleUserInput} value={formState.email} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleUserInput} value={formState.password} />
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}
