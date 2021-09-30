import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { mockGrid, mockSettings } from '../../scripts/mock-tile';
import Tile from '../tiles/Tile';

//the viewport has two measurements to its dimensions: units and pixels. The width in pixels is used to determine its visual width on the page. Its unit-width is the number of units across. These units are used to determine where and how big svg elements are drawn. For example, if the viewPortWidth width is 8px and the unit width is 4, that means that the units are each 2px across. At the smallest level, the number of units across is 64 (a somewhat arbitrary choice- it looked good enough and needed to be divisible by 4). The number of units is capped at 2048 (or 64*(2**5)), which is the size at the fifth level out of zoom from zero (width and height of units are doubled at each zoom). Again this was a choice just based on how it looked. the units were nearly invisible after that level because they were too small so I figured that would be good enough for most screens.

const viewPortWidth = 3000 //in pixels, height is half of this
const bvpuWidth = 64 //this is the Base ViewPort Unit Width, used to set the number of units wide the viewport is at zero level, height is half

function Viewport() {
  const [dimensions, setDimensions] = useState({ //the dimensions of the user's window
    height: window.innerHeight,
    width: window.innerWidth
  })
  const [mapSettings,setMapSettings] = useState(mockSettings);
  const [zoomLevel,setzoomLevel] = useState(5) //the zoom level, used to get svg elements and translate/build them to the correct scale
  const unitWidthAtZoom = bvpuWidth*(2**Math.min(5,zoomLevel)); //the number of units wide that the viewport should be at the current zoom level, 5 is the max
  const windowCenterUnit = { //the x,y coordinates in units that are at the center of the users window
    x: dimensions.width*.5*unitWidthAtZoom/viewPortWidth,
    y: dimensions.height*.5*unitWidthAtZoom/viewPortWidth
  }
  const [focalPoint,setFocalPoint] = useState({ //the x,y coordinates (in units) of the zero positioned image that should appear in the center of the user's window
      x: unitWidthAtZoom/4, //default start point is 
      y: unitWidthAtZoom/4
  })
  const centerImageMCoord = {
      x: windowCenterUnit.x - focalPoint.x,
      y: windowCenterUnit.y - focalPoint.y
  }
  const [tileGrid,setTiles] = useState(mockGrid)
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
  //get tiles will fetch the tiles, also it will set the zoom level based off the tiles

  

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
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 250)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)   
    }
  })

  //temporary formulas for testing
  const fillSquare = "h 1 v 1 h -1 v -1";
  const moveRight = "m 1 0"
  const nextRow = `m -${unitWidthAtZoom/2} 1`
  function generateUnitSVGCode(square=false) {
    let returnString = "";
    for (let h=1;h<=unitWidthAtZoom/2;h++) {
        for (let w=1;w<=unitWidthAtZoom/2;w++) {
            if (square) {
                returnString = (h===unitWidthAtZoom/4||h===(unitWidthAtZoom/4)+1)&&(w===unitWidthAtZoom/4||w===(unitWidthAtZoom/4)+1) ? returnString+` ${fillSquare}` : returnString;
            }
            returnString+=` ${moveRight}`
        }
        returnString = h===unitWidthAtZoom/2 ? returnString : returnString+` ${nextRow}`;
    }
    return returnString;
}

console.log();

return (
    <SVGCanvas viewBox={`0 0 ${unitWidthAtZoom} ${unitWidthAtZoom/2}`} xmlns="http://www.w3.org/2000/svg">
        {tileGrid.center&&Object.keys(tileGrid).map((direction)=><Tile 
            key={tileIds[direction]}
            direction={direction}
            shapes={mockGrid[direction].shapes}
            centerImageMCoord={centerImageMCoord}
            unitWidthAtZoom={unitWidthAtZoom}
            mapSettings={mapSettings}
        />)}
        {/* <path d={`M ${centerImageMCoord.x} ${centerImageMCoord.y} h 1024 v 1024 h -1024 v -1024`} fill="lightblue"/>
        <path d={`M ${centerImageMCoord.x} ${centerImageMCoord.y} ${generateUnitSVGCode(true)}`} onClick={e=>{console.log(e)}} fill="green"/> */}
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