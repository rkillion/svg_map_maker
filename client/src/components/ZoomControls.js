import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchGrids } from '../features/tiles/gridsSlice';
import { changeView, changeFocus, changeUserFocus } from '../features/viewport/viewSlice';

// Temporarily putting zoom controls in the infobar to avoid having to right align

export default function ZoomControls() {
    const viewSettings = useSelector(state=>state.grids.primary.settings)
    const centerTile = useSelector(state=>state.grids.primary.tiles&&state.grids.primary.tiles.center)
    const tileFocus = useSelector(state=>state.view.tileFocus)
    const dispatch = useDispatch();

    //create a function that will zoom in or zoom out
    function zoom(zoomIn) { //set true for zoom in and false for zoom out
        //find the parent tile (zoom out) or child tile (zoom in) to request
        //also, set the new coordinates based on the parent or child tile
        let tileIdToRequest;
        let center = viewSettings.tile_width_units/2
        let quadrant;
        let [x,y] = [tileFocus.x,tileFocus.y];
        let newCoordinates = {x: x,y: y};
        if (zoomIn) {
            newCoordinates.x = newCoordinates.x*2;
            newCoordinates.y = newCoordinates.y*2;
            if (x<center) {
                if (y<center) {
                    quadrant = 0;
                } else {
                    quadrant = 2;
                    newCoordinates.y = newCoordinates.y-(center*2);
                }
            } else {
                if (y<center) {
                    quadrant = 1;
                    newCoordinates.x = newCoordinates.x-(center*2);
                } else {
                    quadrant = 3;
                    newCoordinates.x = newCoordinates.x-(center*2);
                    newCoordinates.y = newCoordinates.y-(center*2);
                }
            }
            tileIdToRequest = centerTile.subtiles[quadrant];
        } else {
            tileIdToRequest = centerTile.parent.id;
            if (tileIdToRequest) {
                quadrant = centerTile.parent.quadrant;
                newCoordinates.x = newCoordinates.x/2;
                newCoordinates.y = newCoordinates.y/2;
                switch (quadrant) {
                    case 1 :
                        newCoordinates.x = newCoordinates.x+center;
                        break;
                    case 2 :
                        newCoordinates.y = newCoordinates.y+center;
                        break;
                    case 3 :
                        newCoordinates.x = newCoordinates.x+center;
                        newCoordinates.y = newCoordinates.y+center;
                        break;
                    default :
                }
            }
        }
        //make a fetch request for a new grid for the correct tile
        if (tileIdToRequest) {
            dispatch(fetchGrids(tileIdToRequest))
            .then(()=>{
                dispatch(changeView({
                focus_x: newCoordinates.x,
                focus_y: newCoordinates.y,
                }));
                dispatch(changeFocus({
                    x: newCoordinates.x,
                    y: newCoordinates.y
                }));
                dispatch(changeUserFocus({
                    x: newCoordinates.x,
                    y: newCoordinates.y
                }));
            }) 
        }
    }

    return (
        <ZoomControlBox>
            <button onClick={()=>zoom(false)}>-</button>
            <span>Zoom Level: {viewSettings&&viewSettings.zoom_level}</span>
            <button onClick={()=>zoom(true)}>+</button>
        </ZoomControlBox>
    )
}

const ZoomControlBox = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between
`