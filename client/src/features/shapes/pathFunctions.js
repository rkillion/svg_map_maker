import { getQuadrantRoute, targetPoint } from "../viewport/positioning";

export function changePath(viewportData,event,direction,tile) {
    const { tile_width_units } = viewportData.tileSettings
    // console.log(viewportData);
    let point = targetPoint(viewportData,event,direction)
    let route = getQuadrantRoute(point,tile_width_units);
    // let pathArray = generatePathArray([],route,tile_width_units,true);
    // console.log(route);
    // console.log(pathArray);
    // console.log(joinPath(pathArray,tile_width_units));
    // console.log(joinPath(pathCopy,tile_width_units,["a","b","c","d","e"]));
    return route;
}

//joining the path involves iterating through and joining with a "m distance distance" at the end of each one that is an array. the distance is the tile_width/2**how-many-arrays-deep you are starting at 1

export function joinPath(pathArray,tileWidth,joinStrings=[" "," "," "," "," "]) {
    let returnArray = JSON.parse(JSON.stringify(pathArray));
    let joins = [...joinStrings];
    function joinLevel(theArray,distance,separators,q="") {
        // debugger;
        let pathStart = [
            "m 0 0",
            `m ${distance} 0`,
            `m ${-distance} ${distance}`,
            `m ${distance} 0`
          ];
        let pathEnd = `m ${-distance/2} ${-distance/2}`;
        for (let i=0;i<4;i++) {
            // debugger;
            if (typeof theArray[i]!=="string") {
                theArray[i] = joinLevel(theArray[i],distance/2,separators.slice(1),i)
            }  
        }
        let output
        if (typeof q!=="number") {
            output = theArray.join(separators[0]);
        } else {
            output = `${pathStart[q]} ${theArray.join(separators[0])} ${pathEnd}`
        }
        // debugger;
        return output;
    }
    let returnValue = joinLevel(returnArray,tileWidth,joins)
    // debugger;
    return returnValue;
}

export function generatePathArray(originalArray,route,width,fill) {
    let newArray = JSON.parse(JSON.stringify(originalArray));
    if (newArray.length===0) {
        newArray = splitPath("",width)
    }
    function traversePathArray(array,adjRoute) {
        let thisWidth = width/(2**(6-adjRoute.length))
        if (adjRoute.length===1) {
            array[adjRoute[0]] = genUnitPath(adjRoute[0],fill,thisWidth*2)
        } else {
            if (typeof array[adjRoute[0]]==="string") {
                array[adjRoute[0]] = splitPath(array[adjRoute[0]],thisWidth)
            }
            traversePathArray(array[adjRoute[0]],adjRoute.slice(1))
        }
    }
    traversePathArray(newArray,route);
    return newArray;
}

export function splitPath(path,width) {
    const regex = new RegExp('h')
    const fill = regex.test(path);
    return [
        genUnitPath(0,fill,width),
        genUnitPath(1,fill,width),
        genUnitPath(2,fill,width),
        genUnitPath(3,fill,width)
    ]
}

function genUnitPath(quadrant,fill=false,width) {
    let distance = width/2
    let pathM = [
      "m 0 0",
      `m ${distance} 0`,
      `m ${-distance} ${distance}`,
      `m ${distance} 0`
    ]
    let pathR=""
    if (fill) {
        pathR=` h ${distance} v ${distance} h ${-distance} v ${-distance}`
    }
    return `${pathM[quadrant]}${pathR}`
}

//ex. path string "Q1....Q2Q1...Q2Q2...Q2Q3...Q2Q4....Q3....Q4"