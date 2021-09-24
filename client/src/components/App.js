import styled from 'styled-components';
import Appbar from './Appbar';

const SVGCanvas = styled.svg`
  width: 100%;
  height: 100%;
  position: fixed;
`

const AppWindow = styled.div`
  height: 100%;
  width: 100%
`

function App() {

  const fillSquare = "h 1 v 1 h -1 v -1";
  const moveRight = "m 1 0"
  const nextRow = "m -32 1"
  function generateUnitSVGCode(square=false) {
    let returnString = "";
    for (let h=1;h<=32;h++) {
        for (let w=1;w<=64/2;w++) {
            if (square) {
                returnString = (h===16||h==17)&&(w===16||w===17) ? returnString+` ${fillSquare}` : returnString;
            }
            returnString+=` ${moveRight}`
        }
        returnString = h===32 ? returnString : returnString+` ${nextRow}`;
    }
    return returnString;
}

  return (
    <AppWindow className="App">
      <Appbar />
      <SVGCanvas viewBox="-16 0 64 32" xmlns="http://www.w3.org/2000/svg" style={{background: "black"}} onClick={e=>console.log(e)}>
        <path d="M -16 0 h 32 v 32 h -32 v -32" fill="lightblue"/>
        <path d="M 16 0 h 32 v 32 h -32 v -32" fill="lightblue"/>
        <path d={`M 0 0 ${generateUnitSVGCode(true)}`} onClick={e=>{console.log(e)}} fill="green"/>
      </SVGCanvas>
    </AppWindow>
  );
}

export default App;
