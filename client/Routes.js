// import React, {Component } from 'react'
// import {connect} from 'react-redux'
// import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
// import { Login, Signup } from './components/AuthForm';
// import AuthForm from './components/AuthForm';
// import Home from './components/Home';
// import {me} from './store'

// /**
//  * COMPONENT
//  */
// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData()
//   }

//   render() {
//     const {isLoggedIn} = this.props

//     return (
//       <div>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path="/home" component={Home} />
//             <Redirect to="/home" />
//           </Switch>
//         ) : (
//           <Switch>
//             {/* <Route path='/' exact component={ Login } /> */}
//             <Redirect exact from='/' to='/login'/>
//             <Route path="/login" component={AuthForm} />
//             <Route path="/signup" component={AuthForm} />
//           </Switch>
//         )}
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))


import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import { useSelector, useDispatch } from 'react-redux';

const Routes = () => {
  const { isLoggedIn } = useSelector(state => {
    return {
      isLoggedIn: !!state.auth.id
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [])

  return (
    <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <Route path="/login"><AuthForm formName="login" /> </Route>
            <Route path="/signup"><AuthForm formName="signup" /></Route>
          </Switch>
        )}
      </div>
  )
}

export default Routes

