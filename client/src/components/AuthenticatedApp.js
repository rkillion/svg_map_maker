import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUniverses } from '../features/universes/universesSlice';
import { useEffect } from 'react';
import { fetchWorlds } from '../features/worlds/worldsSlice';
import { fetchGrids } from '../features/tiles/gridsSlice'

function AuthenticatedApp() {
    const dispatch = useDispatch()
    const universes = useSelector(state=>state.universes.entities)
    const currentWorld = useSelector(state=>state.worlds.currentWorld)
    const universeStatus = useSelector(state=>state.universes.status)

    useEffect(() => {
        dispatch(fetchUniverses())
        .then(data=>{
            dispatch(fetchWorlds(data.payload[0].worlds[0].id))
            .then(data=>{
                dispatch(fetchGrids(data.payload.views[0].tile_id))
                .then(console.log)
            })
        })
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