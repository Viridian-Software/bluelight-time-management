import { useState } from 'react'
import { Login } from './components/login/Login.component'
import { Profile } from './components/profile/Profile.component'
import { WebSocketProvider, socket } from './context/websocketContext'

function App(): JSX.Element {
  const [loginStatus, setLoginStatus] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    loginTime: new Date(),
    isAdmin: false
  })
  return (
    <WebSocketProvider value={socket}>
      <div className="container">
        {!loginStatus && (
          <Login
            loginStatus={loginStatus}
            loginFunction={setLoginStatus}
            updateUserInfoFunction={setUserInfo}
          />
        )}
        {loginStatus && <Profile {...userInfo} />}
      </div>
    </WebSocketProvider>
  )
}

export default App
