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
import { useHistory } from 'react-router';
import { addFeatureToWorld } from '../worlds/worldsSlice';

export default function NewFeatureDialogue({ formDialogueOpen, setFormDialogueOpen, featureStarterData, setFeatureStarterData }) {
    const dispatch = useDispatch();
    const history = useHistory();

  const handleClose = () => {
    setFormDialogueOpen(false);
  };

  const handleChange = e => {
    let newData = JSON.parse(JSON.stringify(featureStarterData));
    newData[e.target.name] = e.target.value;
    setFeatureStarterData(newData);
  }

  const handleSubmit = () => {
        fetch("/features",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(featureStarterData)
          })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addFeatureToWorld(data));
                setFormDialogueOpen(false);
            });
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={formDialogueOpen} onClose={handleClose}>
        <DialogTitle>{"New Feature"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Enter a name for your new feature.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`Feature Name`}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name="title"
            value={featureStarterData.title}
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
