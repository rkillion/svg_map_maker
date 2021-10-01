import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate } from '../features/auth/userSlice.js'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const user = useSelector((state)=>state.user.current)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/me', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then((user) => {
            dispatch(userUpdate(user))
            setAuthChecked(true)
          })
        } else {
          setAuthChecked(true)
        }
      })
  }, [])

  if(!authChecked) { return <div></div>}
  return (
    <AppWindow className="App">
      {user.id ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp 
          setCurrentUser={setCurrentUser}
        />
      )}
    </AppWindow>
  );
}

const AppWindow = styled.div`
  height: 100%;
  width: 100%
`

export default App;
