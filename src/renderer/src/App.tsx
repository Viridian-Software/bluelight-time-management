import { useState } from 'react'
import { Login } from './components/login/Login.component'

function App(): JSX.Element {
  const [loginStatus, setLoginStatus] = useState(false)
  return (
    <div className="container">
      {!loginStatus && <Login loginStatus={loginStatus} loginFunction={setLoginStatus} />}
    </div>
  )
}

export default App
