import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchUniverses } from '../features/universes/universesSlice';
import { useEffect } from 'react';
import { fetchWorlds } from '../features/worlds/worldsSlice';
import { fetchGrids } from '../features/tiles/gridsSlice'
import { changeFocus, changeUserFocus, changeView } from '../features/viewport/viewSlice';
import { fetchShapeTypes } from '../features/shapes/shapeTypesSlice';

function AuthenticatedApp() {
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
                }))
                dispatch(fetchGrids(data.payload.views[0].tile_id))
                // .then(console.log)
            })
        })})
    }, [dispatch])

    return (
        <main>
            <Appbar />
            <Switch>
                <Route path="/viewer">
                    <Viewport />
                </Route>
                <Redirect to="/viewer" />
            </Switch>
        </main>
    )
}

export default AuthenticatedApp