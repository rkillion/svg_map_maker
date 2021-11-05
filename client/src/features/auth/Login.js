import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory, Link } from 'react-router-dom'
import { userUpdate } from './userSlice'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Login() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            dispatch(userUpdate(user))
            history.push('/viewer')
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
  }
  return (
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
      <Redirect to="/" />
      <Paper 
        elevation={3}
        sx={{padding: '10px'}}
        >
          <Typography>SVG Fantasy Mapmaker</Typography>
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
          <Button variant="contained" onClick={handleSubmit}>Log In</Button>
        <p><Link to="/signup">Sign Up</Link></p>
      </FormControl>
      </Paper>
    </Box>
  )
}

export default Login