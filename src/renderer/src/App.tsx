import { useState } from 'react'
import { Login } from './components/login/Login.component'
import { Admin } from './components/admin/admin.component'
import { Profile } from './components/profile/Profile.component'

function App(): JSX.Element {
  const [loginStatus, setLoginStatus] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    loginTime: new Date(),
    isAdmin: false,
    id: 0,
    isCurrentlyActive: false
  })
  // const socket = useContext(WebSocketContext)
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Socket Connected')
  //   })
  //   return () => {
  //     console.log('Unregistering Events')
  //     socket.off('connect')
  //   }
  // }, [])
  const displayComponent = () => {
    if (!loginStatus) {
      return
    }
    if (userInfo.isAdmin) {
      return <Admin {...userInfo} />
    } else {
      return <Profile {...userInfo} />
    }
  }
  return (
    //<WebSocketProvider value={socket}>
    <div className="container">
      {!loginStatus && (
        <Login
          loginStatus={loginStatus}
          loginFunction={setLoginStatus}
          updateUserInfoFunction={setUserInfo}
        />
      )}
      {displayComponent()}
    </div>
    //</WebSocketProvider>
  )
}

export default App
