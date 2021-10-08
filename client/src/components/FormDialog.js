import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { postUniverse } from '../features/universes/universesSlice';
import { postWorld } from '../features/worlds/worldsSlice';
import { useHistory } from 'react-router';

export default function FormDialog({ formDialogueOpen, setFormDialogueOpen, formDialogueObject }) {
    const { item, field, postConfig, action } = formDialogueObject
    const dispatch = useDispatch();
    const history = useHistory();
  
    const [formData,setFormData] = useState(postConfig)

  const handleClose = () => {
    setFormDialogueOpen(false);
  };

  const handleChange = e => {
    let newData = JSON.parse(JSON.stringify(formData));
    newData[e.target.name] = e.target.value;
    setFormData(newData);
  }

  const handleSubmit = () => {
    if (action==="postUniverse") {
      dispatch(postUniverse(formData))
    .then(()=>setFormDialogueOpen(false));
    }
    if (action==="postWorld") {
      dispatch(postWorld(formData))
      .then(()=>{
        setFormDialogueOpen(false);
        window.location.reload()
        // history.push("/viewer");
      });
    }
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={formDialogueOpen} onClose={handleClose}>
        <DialogTitle>{`New ${item[0].toUpperCase()+item.slice(1)}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Enter a name for your new ${item}.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`${item[0].toUpperCase()+item.slice(1)} Name`}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name={field}
            value={formData[field]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
