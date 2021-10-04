import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Tile from '../tiles/Tile';
import { useDispatch, useSelector } from 'react-redux';
import { changeFocus, changeUserFocus } from './viewSlice';

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
  const tileFocus = useSelector(state => state.view.tileFocus)
  const userFocus = useSelector(state => state.view.userFocus)
  
  const windowCenterUnit = tileSettings ? { //the x,y coordinates in units that are at the center of the users window
    x: dimensions.width*tileSettings.tile_width_units/viewPortWidth,
    y: dimensions.height*tileSettings.tile_width_units/viewPortWidth
  } : null

  const centerImageMCoord = tileSettings ? {
      x: windowCenterUnit.x - userFocus.x,
      y: windowCenterUnit.y - userFocus.y
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

  function handleMouseDown(e) {
    setDragPoint({
      x: e.clientX,
      y: e.clientY
    })
  }

  

  function handleMouseMove(e) {
    if(dragPoint.x) {
      let initialFocus = tileFocus;
      let initialDragPoint = dragPoint
      // let moveTimer;
      // clearTimeout(moveTimer);
      // let newFocus;
      // moveTimer = setTimeout(() => {
      //   moveTimer = null;
      //   newFocus = {
      //       x: initialFocus.x+dragPoint.x-e.clientX,
      //       y: initialFocus.y+dragPoint.y-e.clientY
      //   }
      //   dispatch(changeFocus(newFocus))
      // }, 0)
      let newFocus = {
          x: initialFocus.x+((dragPoint.x-e.clientX)*2*tileSettings.tile_width_units/viewPortWidth),
          y: initialFocus.y+((dragPoint.y-e.clientY)*2*tileSettings.tile_width_units/viewPortWidth)
      }
      dispatch(changeUserFocus(newFocus))
      // setUserFocus(newFocus)
      // dispatch(changeFocus(newFocus))
      // setDragPoint({
      //   x: initialDragPoint.x-e.clientX,
      //   y: initialDragPoint.y-e.clientY
      // });
    }
  }

  function handleMouseUp(e) {
    setDragPoint({})
    console.log("Start focus:",tileFocus,"End focus:",userFocus);
    dispatch(changeFocus(userFocus))
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
            handleMouseUp={handleMouseUp}
            handleMouseMove={handleMouseMove}
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