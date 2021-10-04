function Tile({ direction, shapes, centerImageMCoord, tileWidthAtZoom, mapSettings}) {
    const coordinateOffsets = {
        northeast: {
            x: -tileWidthAtZoom,
            y: -tileWidthAtZoom
        },
        north: {
            x: 0,
            y: -tileWidthAtZoom
        },
        northwest: {
            x: tileWidthAtZoom,
            y: -tileWidthAtZoom
        },
        west: {
            x: -tileWidthAtZoom,
            y: 0
        },
        center: {
            x: 0,
            y: 0
        },
        east: {
            x: tileWidthAtZoom,
            y: 0
        },
        southwest: {
            x: -tileWidthAtZoom,
            y: tileWidthAtZoom
        },
        south: {
            x: 0,
            y: tileWidthAtZoom
        },
        southeast: {
            x: tileWidthAtZoom,
            y: tileWidthAtZoom
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