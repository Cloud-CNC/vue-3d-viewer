# Vue 3D Viewer
![status](https://img.shields.io/badge/status-release-brightgreen)
[![npm](https://img.shields.io/npm/v/vue-3d-viewer)](https://npmjs.com/package/vue-3d-viewer)
[![tests](https://img.shields.io/github/workflow/status/Cloud-CNC/vue-3d-viewer/Tests?label=tests)](https://github.com/Cloud-CNC/vue-3d-viewer/actions)
[![issues](https://img.shields.io/github/issues/Cloud-CNC/vue-3d-viewer)](https://github.com/Cloud-CNC/vue-3d-viewer/issues)
[![last commit](https://img.shields.io/github/last-commit/Cloud-CNC/vue-3d-viewer)](https://github.com/Cloud-CNC/vue-3d-viewer/commits/master)

A Vue 3D file viewer via Three.JS and [Unified 3D Loader](https://github.com/Cloud-CNC/unified-3d-loader)

## Features
* Offloads parsing to a worker thread
* Fully reactive to props
* Moderately customizable with good defaults
* Relatively fast (Parsing and displaying)

## Documentation
### File Formats
Check out [Unified 3D Loader](https://github.com/Cloud-CNC/unified-3d-loader#file-formats) for a list of supported file types. This package also has a GCODE parser for GCODE file support.

### Events
Name | Arguments | Description
--- | --- | ---
`done` | N/A | Emitted when the viewer is done parsing the file
`progress` | `number` (Ranges from 0-100) | The progress of the file parsing

### Props
Name | Type | Description | Default
--- | --- | --- | ---
`file` | `ArrayBuffer` | The raw file | N/A
`extension` | `String` | The file extension (Used to identify the correct parser) | N/A
`plane` | `Object` | The plane/bed width and height | `{X: 10, Y:10}`
`position` | `Object` | The position of the object | `{X: 5, Y: 0, Z: -5}`
`rotation` | `Object` | The rotation of the object (Degrees) | `{X: -90, Y: 0, Z: 180}`
`scale` | `Object` | The scale of the object (Some file formats all specify units which will effect scale) | `{X: 0.1, Y: 0.1, Z: 0.1}`
`theme` | `Object` | The theme (colors) of the viewer. | `{background: "#dfe4ed", plane: "#586375", primary: "#4287f5", secondary: "#0a2f6b"}`
`transfer` | `Boolean` | Wether or not to transfer the ArrayBuffer to the worker (Prevents duplicating large amounts of memory but empties the ArrayBuffer on the main thread preventing other code from using the ArrayBuffer) | `true`
*All props should be fully reactive, so feel free to update them dynamically.*

### Examples
* [Demo](./src/demo)

### Reuse
If you're interested in reusing primarily the non-Vue code from this package, you may be interested in the [parsers directory](./src/parsers) and [Unified 3D Loader](https://github.com/Cloud-CNC/unified-3d-loader)