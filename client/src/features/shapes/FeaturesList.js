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
import { shapeClassToggle, shapeTypeToggle } from './shapeTypesSlice';
import WaterIcon from '@mui/icons-material/Water';
import GrassIcon from '@mui/icons-material/Grass';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import NewFeatureDialogue from './NewFeatureDialogue';
import { useState } from 'react';
import { changeEditingMode, changeHighlightFeature, postMapEdits } from '../tiles/gridsSlice';
import { Button } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function FeaturesList() {
    const shapeTypes = useSelector(state=>state.shapeTypes.entities)
    const world = useSelector(state=>state.worlds.currentWorld)
    const features = useSelector(state=>state.worlds.currentWorld.features)
    const editingMode = useSelector(state=>state.grids.editingMode)
    const pendingChanges = useSelector(state=>state.grids.pendingChanges)
    const dispatch = useDispatch();
    const [formDialogueOpen, setFormDialogueOpen] = useState(false);
    const [featureStarterData,setFeatureStarterData] = useState({})

    const openNewFeatureDialogue = (shapeClassId,shapeTypeId) => {
        let starterData = {
            shape_class_id: shapeClassId,
            shape_type_id: shapeTypeId,
            world_id: world.id,
            title: "",
            color: ""
        }
        setFeatureStarterData(starterData);
        setFormDialogueOpen(true);
    };

  function ClassIcon({ classTitle }) {
      if (classTitle === "Geographical"||classTitle==="Mountain") {
          return (
            <ListItemIcon key={classTitle}>
                <LandscapeIcon style={{color: "purple"}}/>
            </ListItemIcon>
            )
      }
      else if (classTitle === "Political") {
        return (
          <ListItemIcon key={classTitle}>
              <AccountBalanceIcon style={{color: "red"}}/>
          </ListItemIcon>
          )
    } else if (classTitle === "Sea") {
        return (
          <ListItemIcon key={classTitle}>
              <WaterIcon style={{color: "blue"}}/>
          </ListItemIcon>
          )
    } else if (classTitle === "Land") {
        return (
          <ListItemIcon key={classTitle}>
              <GrassIcon style={{color: "green"}}/>
          </ListItemIcon>
          )
    } else if (classTitle === "Forest") {
        return (
          <ListItemIcon key={classTitle}>
              <NatureIcon style={{color: "darkgreen"}}/>
          </ListItemIcon>
          )
    } else if (classTitle === "City") {
        return (
          <ListItemIcon key={classTitle}>
              <LocationCityIcon style={{color: "orange"}}/>
          </ListItemIcon>
          )
    } else {
        return (
          <ListItemIcon key={classTitle}>
              <LanguageIcon style={{color: "yellow"}}/>
          </ListItemIcon>
          )
    } 
  }

  return ( <>
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
                            return (<>
                                <ListItem key={shapeType.id}>
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=>dispatch(shapeTypeToggle({shape_class: shapeClass.id,id: shapeType.id}))}>
                                        <ClassIcon classTitle={shapeType.title} />
                                        <ListItemText primary={shapeType.title} />
                                        {shapeType.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Tooltip title="Add">
                                        <IconButton onClick={()=>openNewFeatureDialogue(shapeClass.id,shapeType.id)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                                <Collapse key={`${shapeType.id}collapse`} in={shapeType.open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {!features ? null : features.filter(feature=>feature.shape_class_id===shapeClass.id&&feature.shape_type_id===shapeType.id).map(feature=>{
                                            return (
                                                <ListItem key={feature.id}>
                                                    <ListItemButton 
                                                        sx={{ pl: 8 }}
                                                        onMouseOver={()=>dispatch(changeHighlightFeature(feature.id))}
                                                        onMouseOut={()=>dispatch(changeHighlightFeature(null))}
                                                        >
                                                        <ListItemText primary={feature.title} />
                                                    </ListItemButton>
                                                    <Tooltip title="Add To">
                                                        <IconButton
                                                            onClick={()=>dispatch(changeEditingMode({
                                                                mode: "draw",
                                                                featureTitle: feature.title
                                                            }))}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Remove From">
                                                        <IconButton
                                                            onClick={()=>dispatch(changeEditingMode({
                                                                mode: "erase",
                                                                featureTitle: feature.title
                                                            }))}
                                                        >
                                                            <EditOffIcon />
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
                </Collapse>
                </>
            )
        })}
        {editingMode.mode ? <Button variant="contained" onClick={()=>{
            dispatch(changeEditingMode({
                mode: null,
                featureTitle: null
            }));
            dispatch(postMapEdits(pendingChanges));
        }}>Save Changes</Button> : null}
    </List>
    <NewFeatureDialogue 
        formDialogueOpen={formDialogueOpen}
        setFormDialogueOpen={setFormDialogueOpen}
        featureStarterData={featureStarterData}
        setFeatureStarterData={setFeatureStarterData}
    />
    </>
  );
}
