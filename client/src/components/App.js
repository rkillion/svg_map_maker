import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    fetch('/me', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then((user) => {
            setCurrentUser(user)
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
      {currentUser ? (
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
