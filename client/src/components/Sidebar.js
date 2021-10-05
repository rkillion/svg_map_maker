import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import PublicIcon from '@mui/icons-material/Public';
import { useHistory } from 'react-router';

export default function TemporaryDrawer({ toggleDrawer, sidebarState, setUniverseDialogueOpen, loadWorld }) {
    const universes = useSelector(state=>state.universes.entities)
    const history = useHistory()


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      {universes.map(universe=>{
          return ( <>
          <List key={universe.id}>
              <ListItem button 
                onClick={()=>history.push(`/universes/${universe.id}`)}
              >
                <ListItemIcon >
                    <AllInclusiveIcon />
                </ListItemIcon>
                <ListItemText primary={universe.title} />
              </ListItem>
              {universe.worlds.map(world=>(
                <ListItem button 
                    key={world.id}
                    onClick={()=>{
                      loadWorld(world.id);
                      history.push(`/viewer`);
                    }}
                >
                  <ListItemIcon >
                      <PublicIcon />
                  </ListItemIcon>
                  <ListItemText primary={world.title} />
                </ListItem>
              ))}
          </List>
          <Divider key={`divider${universe.id}`}/>
          </>
      )
      })      
      }
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button onClick={()=>setUniverseDialogueOpen(true)}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="New Universe" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={sidebarState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}