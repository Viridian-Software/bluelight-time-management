type ProfileProps = {
  fname: string
  lname: string
  email: string
  loginTime: Date
  isAdmin: boolean
  id: number
  isCurrentlyActive: boolean
}

type UserCardProps = {
  fname: string
  lname: string
  userId: number
  isCurrentlyActive: boolean
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
  isCurrentlyActive: boolean
}

type Sessions = {
  id: number
  loginTime: Date
  logoutTime: Date | null
  delta: number | null
  userID: number
}
