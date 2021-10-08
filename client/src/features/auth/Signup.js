import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userUpdate } from './userSlice'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormDialog from '../../components/FormDialog';

function Signup({ setCurrentUser }) {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            dispatch(userUpdate(user))
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
  }
  return (
    <div className="authForm">
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '10px',
        width: 'auto',
        margin: 'auto',
        '& > :not(style)': {
          m: 1,
          // width: 128,
          // height: 128,
        },
      }}
      width="auto"
    >
      <Paper 
        elevation={3}
        sx={{padding: '10px'}}
        >
      <FormControl onSubmit={handleSubmit}>
          <FormLabel 
            htmlFor="username"
            sx={{margin: '10px'}}
          >
            Login
          </FormLabel>
          <TextField id="outlined-basic" label="Username" variant="outlined"
          sx={{margin: '10px'}}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
          <TextField id="outlined-basic" label="Password" variant="outlined"
          sx={{margin: '10px'}}
          type="password"
          name=""
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
          <TextField id="outlined-basic" label="Retype Password" variant="outlined"
          sx={{margin: '10px'}}
          type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} />
          <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <p><Link to="/login">Login</Link></p>
      </FormControl>
      </Paper>
    </Box>
    </div>
  )
}

export default Signup