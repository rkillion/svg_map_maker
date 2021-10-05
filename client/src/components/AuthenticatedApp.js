import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
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

    const handleUniverseFormOpen = () => {
        setUniverseDialogueOpen(true);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchShapeTypes())
        .then(()=>{
            dispatch(fetchUniverses())
        .then(data=>{
            dispatch(fetchWorlds(data.payload[0].worlds[0].id))
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
                dispatch(fetchGrids(data.payload.views[0].tile_id))
                // .then(console.log)
            })
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
            />
            <Switch>
                <Route path="/viewer">
                    <Viewport />
                </Route>
                <Route path="/universes/:id">
                    <UniversePage />
                </Route>
                <Redirect to="/viewer" />
            </Switch>
            <FormDialog
                formDialogueOpen={universeDialogueOpen}
                setFormDialogueOpen={setUniverseDialogueOpen}
                formDialogueObject={{
                    item: "universe"
                }}
            />
        </main>
    )
}

export default AuthenticatedApp