
const shapeClasses = [
    {
        id: 1,
        title: "geo",
        global: true
    },
    {
        id: 2,
        title: "geoNamed",
        global: false
    },
    {
        id: 3,
        title: "political",
        global: true
    },
    {
        id: 4,
        title: "politicalNamed",
        global: false
    }
]

const shapeTypes = [
    {
        id: 1,
        shape_class_id: 1,
        title: "sea"
        // custom: false,
        // creator_id: null
    },
    {
        id: 2,
        shape_class_id: 1,
        title: "land"
    }
]

//on backend, lookup settings and return this as the settings for this particular world
//two types of settings- global and local
//global settings load at the start
//local settings load with tiles

const mockSettings = {
    geo: {
        sea: "lightblue",
        land: "green"
    },
    geoNamed: {
        "Land Mass 1": "red",
        "Land Mass 2": "orange"
    },
    political: {
    },
    politicalNamed: {
    }
}

const mockShapes = [
    {
        id: 1,
        // shape_class_id: 1,
        // shape_type_id: 1, return these as strings
        shape_class: "geo",
        shape_type: "sea",
        path: "m 0 0 h 1024 v 1024 h -1024 v -1024"
    },
    {
        id: 2,
        shape_class: "geo",
        shape_type: "land",
        path: "m 496 496 h 32 v 32 h -32 v -32"
    }
]

const mockTile = {
    id: 1,
    zoomLevel: 5,
    // parent_tile_id: null,
    // parent_tile_quadrant: null,
    // north_tile_id: 1,
    // south_tile_id: 1,
    // east_tile_id: 1,
    // west_tile_id: 1,
    shapes: mockShapes
    // world_id
}

//making a call to the server to tiles/:id/grid should return an object with 9 tiles with the :id tile in the center and all the neighboring tiles around it
//making a call to the server to tiles/:id/:direction should return the three tiles in that direction, but I may not need that, I'll have to see what the loading time is like for the 

//example return for grid

const mockGrid = {
    center: mockTile,
    northwest: mockTile,
    north: mockTile,
    northeast: mockTile,
    east: mockTile,
    west: mockTile,
    southwest: mockTile,
    south: mockTile,
    southeast: mockTile
}

export {mockSettings,mockTile,mockShapes,mockGrid}