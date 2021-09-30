function Tile({ direction, shapes, centerImageMCoord, unitWidthAtZoom, mapSettings}) {
    const coordinateOffsets = {
        northeast: {
            x: -unitWidthAtZoom,
            y: -unitWidthAtZoom
        },
        north: {
            x: 0,
            y: -unitWidthAtZoom
        },
        northwest: {
            x: unitWidthAtZoom,
            y: -unitWidthAtZoom
        },
        west: {
            x: -unitWidthAtZoom,
            y: 0
        },
        center: {
            x: 0,
            y: 0
        },
        east: {
            x: unitWidthAtZoom,
            y: 0
        },
        southwest: {
            x: -unitWidthAtZoom,
            y: unitWidthAtZoom
        },
        south: {
            x: 0,
            y: unitWidthAtZoom
        },
        southeast: {
            x: unitWidthAtZoom,
            y: unitWidthAtZoom
        }
    }

    return (
        <g>
            {shapes.map(shape=><path
                key={shape.id} 
                d={`M ${centerImageMCoord.x+coordinateOffsets[direction].x} ${centerImageMCoord.y+coordinateOffsets[direction].y} ${shape.path}`}
                fill={mapSettings[shape.shape_class][shape.shape_type]}
            />)}
        </g>
    )
}

export default Tile;