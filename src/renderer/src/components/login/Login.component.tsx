import React, { useState } from 'react'
import { WebSocketContext } from '@renderer/context/websocketContext'
import { useContext, useEffect } from 'react'

type LoginProps = {
  loginStatus: boolean
  loginFunction: React.Dispatch<React.SetStateAction<boolean>>
  updateUserInfoFunction: React.Dispatch<React.SetStateAction<ProfileProps>>
}

/* eslint-disable prettier/prettier */
export const Login = (props: LoginProps): JSX.Element => {
  const socket = useContext(WebSocketContext)
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket Connected')
    })
    return () => {
      console.log('Unregistering Events')
      socket.off('connect')
    }
  }, [])

  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  })

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setUserInput((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    const { email, password } = userInput
    socket.emit(
      'loginUser',
      { email: email, password: password },
      (response: ProfileProps | boolean) => {
        if (typeof response === 'boolean') {
          return
        }
        props.updateUserInfoFunction({
          fname: response.fname,
          lname: response.lname,
          email: response.email,
          loginTime: new Date(),
          isAdmin: response.isAdmin
        })
        props.loginFunction(true)
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input type="text" name="email" value={userInput.email} onChange={handleUserInput} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInput.password}
          onChange={handleUserInput}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
