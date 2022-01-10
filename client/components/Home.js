// import React from 'react'
// import {connect} from 'react-redux';


// /**
//  * COMPONENT
//  */
// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)


import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const { username } = useSelector(state => state.auth);
  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  )
}

export default Home

