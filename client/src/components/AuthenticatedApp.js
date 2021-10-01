import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';
import { Switch, Route } from 'react-router-dom';

function AuthenticatedApp() {

    return (
        <main>
            <Appbar />
            <Switch>
                <Route path="/viewer">
                    <Viewport />
                </Route>
                {/* <Redirect to="/newUniverse" /> */}
            </Switch>
        </main>
    )
}

export default AuthenticatedApp