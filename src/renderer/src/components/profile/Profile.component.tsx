/* eslint-disable prettier/prettier */

export const Profile = (props: ProfileProps): JSX.Element => {
  return (
    <>
      <h1>{`${props.fname} ${props.lname}`}</h1>
      <h2>{`${props.email}`}</h2>
      <button>Lunch</button>
      <button>AFK</button>
    </>
  )
}
