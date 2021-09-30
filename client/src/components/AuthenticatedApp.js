import Appbar from './Appbar';
import Viewport from '../features/viewport/Viewport';

function AuthenticatedApp() {
    // const handleLogout = () => {
    //     fetch(`/logout`, {
    //       method: 'DELETE'
    //     })
    //       .then(res => {
    //         if (res.ok) {
    //           setCurrentUser(null)
    //         }
    //       })
    //   }

    return (
        <main>
            <Appbar />
            <Viewport />
        </main>
    )
}

export default AuthenticatedApp