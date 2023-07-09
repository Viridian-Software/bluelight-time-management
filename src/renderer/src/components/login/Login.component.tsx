import React, { useState } from 'react'

type LoginProps = {
  loginStatus: boolean
  loginFunction: React.Dispatch<React.SetStateAction<boolean>>
}

/* eslint-disable prettier/prettier */
export const Login = (props: LoginProps): JSX.Element => {
  const testLogin = {
    username: 'username',
    password: 'password'
  }
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  })

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setUserInput((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    const { username, password } = userInput
    if (username === testLogin.username && password === testLogin.password) {
      props.loginFunction(!props.loginStatus)
    }
    alert(`${username} ${password}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" value={userInput.username} onChange={handleUserInput} />
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
