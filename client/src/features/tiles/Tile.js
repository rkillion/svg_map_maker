import { useSelector } from 'react-redux';


function Tile({ direction, tile, centerImageMCoord, handleMouseDown, handleMouseUp, handleMouseMove}) {
    const tileSettings = useSelector(state=>state.grids.primary.settings)
    const coordinateOffsets = {
        northeast: {
            x: -tileSettings.tile_width_units,
            y: -tileSettings.tile_width_units
        },
        north: {
            x: 0,
            y: -tileSettings.tile_width_units
        },
        northwest: {
            x: tileSettings.tile_width_units,
            y: -tileSettings.tile_width_units
        },
        west: {
            x: -tileSettings.tile_width_units,
            y: 0
        },
        center: {
            x: 0,
            y: 0
        },
        east: {
            x: tileSettings.tile_width_units,
            y: 0
        },
        southwest: {
            x: -tileSettings.tile_width_units,
            y: tileSettings.tile_width_units
        },
        south: {
            x: 0,
            y: tileSettings.tile_width_units
        },
        southeast: {
            x: tileSettings.tile_width_units,
            y: tileSettings.tile_width_units
        }
    }
    const shapeTypes = useSelector(state => state.shapeTypes.entities)

    if (!tile) {
        return null
    }

    function parsePath(shape) {
        return `M ${centerImageMCoord.x+coordinateOffsets[direction].x} ${centerImageMCoord.y+coordinateOffsets[direction].y} ${shape.path_zero} ${shape.path_one} ${shape.path_two} ${shape.path_three}`
    }

    function getColor(shape) {
        return shapeTypes.find(shapeClass=>shapeClass.id===shape.shape_class).shape_types.find(type=>type.id===shape.shape_type).color
    }

    return (
        <g>
            {tile.shapes.map(shape=><path
                key={shape.id} 
                d={parsePath(shape)}
                fill={getColor(shape)}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />)}
        </g>
    )
}

export default Tile;