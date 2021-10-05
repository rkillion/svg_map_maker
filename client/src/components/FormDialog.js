import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ formDialogueOpen, setFormDialogueOpen, formDialogueObject }) {
    const { item } = formDialogueObject

  const handleClose = () => {
    setFormDialogueOpen(false);
  };

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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
