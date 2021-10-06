import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanguageIcon from '@mui/icons-material/Language';
import { shapeClassToggle } from './shapeTypesSlice';
import WaterIcon from '@mui/icons-material/Water';
import GrassIcon from '@mui/icons-material/Grass';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

export default function FeaturesList() {
    const shapeTypes = useSelector(state=>state.shapeTypes.entities)
    console.log(shapeTypes)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  function ClassIcon({ classTitle }) {
      if (classTitle === "Geographical") {
          return (
            <ListItemIcon>
                <LandscapeIcon />
            </ListItemIcon>
            )
      }
      else if (classTitle === "Political") {
        return (
          <ListItemIcon>
              <AccountBalanceIcon />
          </ListItemIcon>
          )
    } else if (classTitle === "Sea") {
        return (
          <ListItemIcon>
              <WaterIcon />
          </ListItemIcon>
          )
    } else if (classTitle === "Land") {
        return (
          <ListItemIcon>
              <GrassIcon />
          </ListItemIcon>
          )
    } else {
        return (
          <ListItemIcon>
              <LanguageIcon />
          </ListItemIcon>
          )
    } 
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Features
        </ListSubheader>
      }
    >
        {shapeTypes.map(shapeClass=>{
            return (<>
                <ListItemButton key={shapeClass.id} onClick={()=>dispatch(shapeClassToggle(shapeClass.id))}>
                    <ClassIcon classTitle={shapeClass.title}/>
                    <ListItemText primary={shapeClass.title} />
                    {shapeClass.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse key={`${shapeClass.id}collapse`} in={shapeClass.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {shapeClass.shape_types.map(shapeType=>{
                            return (
                                <ListItem>
                                    <ListItemButton key={shapeType.id} sx={{ pl: 4 }}>
                                        <ClassIcon classTitle={shapeType.title}/>
                                        <ListItemText primary={shapeType.title} />
                                    </ListItemButton>
                                    <Tooltip title="Add">
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            )
                        })}
                    </List>
                </Collapse>
                </>
            )
        })}
    </List>
  );
}
