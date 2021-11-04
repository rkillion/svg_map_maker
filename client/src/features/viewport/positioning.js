export function getQuadrantRoute(targetXY,tileSize) {
    let route = [];
    let target = {...targetXY};
    // console.log(target);
    while (route.length<5) {
        let compare = tileSize/(2**(route.length+1));
        if (target.x>=compare) {
            if (target.y>=compare) {
                route.push(3);
                target.y=target.y-compare;
            } else {
                route.push(1)
            }
            target.x=target.x-compare;
        } else {
            if (target.y>=compare) {
                route.push(2);
                target.y=target.y-compare;
            } else {
                route.push(0)
            }
        }
    }
    // console.log(tileSize/(2**(route.length+1)))
    return route;
}

//given the tileFocus and client coordinates (and directional tile which we can get from the target shape clicked), targetPoint can return the targetXYcoordinates in units

export function targetPoint(viewportData,event,direction) {
    const {tile_width_units} = viewportData.tileSettings;
    let unitXY = clientXYtoUnitXY(viewportData,event)
    let relativeXY = {};
    if (direction==="center"||(direction==="north"||direction==="south")) {
        relativeXY.x = unitXY.x
    }
    if (direction==="center"||(direction==="east"||direction==="west")) {
        relativeXY.y = unitXY.y
    }
    if ((direction==="north"||direction==="northeast")||direction==="northwest") {
        relativeXY.y = tile_width_units+unitXY.y;
    }
    if ((direction==="south"||direction==="southeast")||direction==="southwest") {
        relativeXY.y = unitXY.y-tile_width_units;
    }
    if ((direction==="east"||direction==="southeast")||direction==="northeast") {
        relativeXY.x = unitXY.x-tile_width_units;
    }
    if ((direction==="west"||direction==="southwest")||direction==="northwest") {
        relativeXY.x = tile_width_units+unitXY.x;
    }
    return relativeXY;
}

function clientXYtoUnitXY(viewportData,event) {
    const {tileFocus,dimensions,tileSettings,viewPortWidth} = viewportData
    return {
        x: tileFocus.x-(((dimensions.width/2)-event.clientX)*2*tileSettings.tile_width_units/viewPortWidth),
        y: tileFocus.y-(((dimensions.height/2)-event.clientY)*2*tileSettings.tile_width_units/viewPortWidth)
    }
}