import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Tile from '../tiles/Tile';
import { useDispatch, useSelector } from 'react-redux';
import { changeView, changeFocus, changeUserFocus } from './viewSlice';
import { addShape, changeShapeArray, fetchGrids } from '../tiles/gridsSlice';
import { changePath, generatePathArray } from '../shapes/pathFunctions';

const viewPortWidth = 2000 //in pixels, height is half of this

function Viewport() {
  const dispatch = useDispatch()
  const [dimensions, setDimensions] = useState({ //the dimensions of the user's window
    height: Math.min(window.innerHeight,viewPortWidth/2),
    width: Math.min(window.innerWidth,viewPortWidth)
  })
  const [dragPoint,setDragPoint] = useState({});
  const tileSettings = useSelector(state=>state.grids.primary.settings)
  const tiles = useSelector(state=>state.grids.primary.tiles)
  const currentView = useSelector(state=>state.view.current)
  const tileFocus = useSelector(state => state.view.tileFocus)
  const userFocus = useSelector(state => state.view.userFocus)
  const editingMode = useSelector(state=>state.grids.editingMode)
  const features = useSelector(state=>state.worlds.currentWorld.features)
  
  const windowCenterUnit = tileSettings ? { //the x,y coordinates in units that are at the center of the users window
    x: dimensions.width*tileSettings.tile_width_units/viewPortWidth,
    y: dimensions.height*tileSettings.tile_width_units/viewPortWidth
  } : null

  const centerImageMCoord = tileSettings ? {
      x: windowCenterUnit.x - userFocus.x,
      y: windowCenterUnit.y - userFocus.y
  } : null

const centerImageEdgeDistancesUnits = tileSettings ? {
  s: -tileSettings.tile_width_units+currentView.focus_y,
  n: currentView.focus_y,
  e: -tileSettings.tile_width_units+currentView.focus_x,
  w: currentView.focus_x,
} : null

  const tileIds = {
    northwest: 1,
    north: 2,
    northeast: 3,
    west: 4,
    center: 5,
    east: 6,
    southwest: 7,
    south: 8,
    southeast: 9
  }

  function debounce(fn, ms) { //a function for clearing and applying a timer- used to reset the variable in state for the window size
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  useEffect(() => { //the function for resetting the (window) dimensions variable in state, used in Effect to support a cleanup function
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: Math.min(window.innerHeight,viewPortWidth/2),
        width: Math.min(window.innerWidth,viewPortWidth)
      })
    }, 250)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)   
    }
  })

  function manageReload() {
    let displacement = {
      x: currentView.focus_x-userFocus.x,
      y: currentView.focus_y-userFocus.y
    }
    let newTile;
    let newCoordinates = {};
    if (displacement.y>centerImageEdgeDistancesUnits.n) {
      newCoordinates.y = tileSettings.tile_width_units-(displacement.y-currentView.focus_y)
      if (displacement.x>centerImageEdgeDistancesUnits.w) {
        newTile = "northwest"
        newCoordinates.x = tileSettings.tile_width_units-(displacement.x-currentView.focus_x)
      }
      else if (displacement.x<centerImageEdgeDistancesUnits.e) {
        newTile = "northeast"
        newCoordinates.x = (displacement.x*-1)-(tileSettings.tile_width_units-currentView.focus_x)
      } else {
        newTile = "north"
        newCoordinates.x = currentView.focus_x-displacement.x
      }
    } else if (displacement.y<centerImageEdgeDistancesUnits.s) {
      newCoordinates.y = (displacement.y*-1)-(tileSettings.tile_width_units-currentView.focus_y)
      if (displacement.x>centerImageEdgeDistancesUnits.w) {
        newTile = "southwest"
        newCoordinates.x = tileSettings.tile_width_units-(displacement.x-currentView.focus_x)
      }
      else if (displacement.x<centerImageEdgeDistancesUnits.e) {
        newTile = "southeast"
        newCoordinates.x = (displacement.x*-1)-(tileSettings.tile_width_units-currentView.focus_x)
      } else {
        newTile = "south"
        newCoordinates.x = currentView.focus_x-displacement.x
      }
    } else if (displacement.x>centerImageEdgeDistancesUnits.w) {
      newTile = "west"
      newCoordinates.x = tileSettings.tile_width_units-(displacement.x-currentView.focus_x)
      newCoordinates.y = currentView.focus_y-displacement.y
    }
    else if (displacement.x<centerImageEdgeDistancesUnits.e) {
      newTile = "east"
      newCoordinates.x = (displacement.x*-1)-(tileSettings.tile_width_units-currentView.focus_x)
      newCoordinates.y = currentView.focus_y-displacement.y
    }
    if (newTile) {
      let tile_to_get = tiles[newTile].id
      dispatch(fetchGrids(tile_to_get))
      .then(()=>{
        dispatch(changeView({
          focus_x: newCoordinates.x,
          focus_y: newCoordinates.y
        }));
        dispatch(changeFocus({
            x: newCoordinates.x,
            y: newCoordinates.y
        }));
        dispatch(changeUserFocus({
            x: newCoordinates.x,
            y: newCoordinates.y
        }))
      })
    }
  }

  const viewportData = {
    dragPoint: dragPoint,
    tileSettings: tileSettings,
    tiles: tiles,
    currentView: currentView,
    tileFocus: tileFocus,
    userFocus: userFocus,
    windowCenterUnit: windowCenterUnit,
    centerImageMCoord: centerImageMCoord,
    centerImageEdgeDistancesUnits: centerImageEdgeDistancesUnits,
    viewPortWidth: viewPortWidth,
    dimensions: dimensions
}

  function checkMaxHeight(newFocus) {
    let extraTileNorth = tiles.north ? tileSettings.tile_width_units : 0;
    let extraTileSouth = tiles.south ? tileSettings.tile_width_units : 0;
    let adjustedFocus = {
      x: newFocus.x,
      y: newFocus.y
    }
    if ((windowCenterUnit.y-newFocus.y)>0+extraTileNorth) {
      adjustedFocus.y=windowCenterUnit.y-extraTileNorth
    }
    if ((windowCenterUnit.y-newFocus.y)<((windowCenterUnit.y*2)-tileSettings.tile_width_units-extraTileSouth)) {
      adjustedFocus.y=tileSettings.tile_width_units-(windowCenterUnit.y)+extraTileSouth;
    }
    return adjustedFocus;
  }

  function handleMouseDown(e) {
    setDragPoint({
      x: e.clientX,
      y: e.clientY
    })
  }

  function handleMouseMove(e) {
    if(dragPoint.x&&!editingMode.mode) {
      let initialFocus = tileFocus;
      let newFocus = {
          x: initialFocus.x+((dragPoint.x-e.clientX)*2*tileSettings.tile_width_units/viewPortWidth),
          y: initialFocus.y+((dragPoint.y-e.clientY)*2*tileSettings.tile_width_units/viewPortWidth)
      }
      let adjustedFocus = checkMaxHeight(newFocus);
      // let adjustedFocus = newFocus;
      dispatch(changeUserFocus(adjustedFocus))
    }
  }

  console.log(tiles);

  function handleMouseUp(e,direction) { 
    setDragPoint({})
    if(tileFocus.x===userFocus.x&&tileFocus.y===userFocus.y) {
      if(editingMode.mode) {
        let feature = features.find(feature=>feature.title===editingMode.featureTitle)
        console.log(feature)
        let route = changePath(viewportData,e,direction,tiles[direction]);
        console.log(route);
        let shape = tiles[direction].shapes.find(shape=>shape.feature.title===editingMode.featureTitle)
        if(!shape) {
          dispatch(addShape({direction: direction,shape: {
            shape_class: feature.shape_class_id,
            shape_type: feature.shape_type_id,
            feature: feature,
            pathArray: generatePathArray([],route,tileSettings.tile_width_units,true) 
          }}));
        } else {
          dispatch(changeShapeArray({
            direction: direction,
            feature: editingMode.featureTitle,
            pathArray: generatePathArray(shape.pathArray,route,tileSettings.tile_width_units,true)
          }))
        }
      }
    } else {
      dispatch(changeFocus(userFocus));
      manageReload()
    }
  }

if (!tileSettings){
  return null
}

return (
    <SVGCanvas viewBox={`0 0 ${tileSettings.tile_width_units*2} ${tileSettings.tile_width_units}`} xmlns="http://www.w3.org/2000/svg">
        {tiles&&Object.keys(tiles).map((direction)=><Tile 
            key={tileIds[direction]}
            direction={direction}
            tile = {tiles[direction]}
            centerImageMCoord={centerImageMCoord}
            handleMouseDown={handleMouseDown}
            handleMouseUp={e=>{handleMouseUp(e,direction)}}
            handleMouseMove={handleMouseMove}
            onClick={console.log}
        />)}
    </SVGCanvas>
)
}

const SVGCanvas = styled.svg`
  width: ${viewPortWidth}px;
  height: ${viewPortWidth/2}px;
  position: fixed;
  background: black;
`
export default Viewport;