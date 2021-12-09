import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUniverses } from '../features/universes/universesSlice';
import { useState, useEffect } from 'react';
import { fetchWorlds } from '../features/worlds/worldsSlice';
import { fetchGrids } from '../features/tiles/gridsSlice'
import { changeFocus, changeUserFocus, changeView } from '../features/viewport/viewSlice';
import { fetchShapeTypes } from '../features/shapes/shapeTypesSlice';
import Sidebar from './Sidebar'
import * as React from 'react';
import UniversePage from './UniversePage';
import FormDialog from './FormDialog';
import InfoBar from './InfoBar';

function AuthenticatedApp() {
    const [sidebarState, setSidebarState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setSidebarState({ ...sidebarState, [anchor]: open });
      };

      const [universeDialogueOpen, setUniverseDialogueOpen] = useState(false);

    const dispatch = useDispatch()
    const currentWorld = useSelector(state=>state.worlds.currentWorld)
    const history = useHistory()

    function loadWorld(id) {
        dispatch(fetchWorlds(id))
            .then(data=>{
                dispatch(changeView(data.payload.views[0]));
                dispatch(changeFocus({
                    x: data.payload.views[0].focus_x,
                    y: data.payload.views[0].focus_y,
                }));
                dispatch(changeUserFocus({
                    x: data.payload.views[0].focus_x,
                    y: data.payload.views[0].focus_y,
                }));
                // dispatch(fetchGrids(data.payload.views[0].tile_id))
                dispatch(fetchGrids(12));
                // .then(console.log)
            })
    }

    useEffect(() => {
        dispatch(fetchShapeTypes())
        .then(()=>{
            dispatch(fetchUniverses())
        .then(data=>{
            if (data.payload.length===0) {
                setUniverseDialogueOpen(true);
            } else {
                if (data.payload[0].worlds.length===0) {
                    history.push(`/universes/${data.payload[0].id}`)
                } else {
                    let worldIdToGet = currentWorld.title ? currentWorld.id : data.payload[0].worlds[0].id; 
                    loadWorld(worldIdToGet);
                }
            }
        })})
    }, [dispatch])

    return (
        <main>
            <Appbar 
                toggleDrawer={toggleDrawer}
            />
            <Sidebar 
                toggleDrawer={toggleDrawer}
                sidebarState={sidebarState}
                setUniverseDialogueOpen={setUniverseDialogueOpen}
                loadWorld={loadWorld}
            />
            <Switch>
                <Route path="/viewer">
                    <Viewport />
                    <InfoBar />
                </Route>
                <Route path="/universes/:id">
                    <UniversePage loadWorld={loadWorld}/>
                </Route>
                <Redirect to="/viewer" />
            </Switch>
            <FormDialog
                formDialogueOpen={universeDialogueOpen}
                setFormDialogueOpen={setUniverseDialogueOpen}
                formDialogueObject={{
                    item: "universe",
                    field: "title",
                    postConfig: {
                        title: ""
                    },
                    action: "postUniverse"
                }}
            />
        </main>
    )
}

export default AuthenticatedApp