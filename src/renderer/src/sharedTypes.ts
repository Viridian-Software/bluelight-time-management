type ProfileProps = {
  fname: string
  lname: string
  email: string
  loginTime: Date
  isAdmin: boolean
  id: number
}

type UserCardProps = {
  fname: string
  lname: string
  userId: number
}

type AdminProps = {
  fname: string
  lname: string
}

type Users = {
  id: number
  fname: string
  lname: string
  email: string
  isAdmin: boolean
}

type Sessions = {
  id: number
  loginTime: Date
  logoutTime: Date | null
  delta: number | null
  userID: number
}
