/**
 * @fileoverview File Parsers
 */

//Imports
import {FileFormats} from 'unified-3d-loader';
import gcodeParser from './gcode';
import unifiedParser from './unified';

//Export
export default async (file, extension, theme) =>
{
  //Check if unified-3d-loader can handle the file
  for (const format of Object.values(FileFormats))
  {
    //Check if extension matches format
    if (format.extensions.includes(extension))
    {
      //Load and parse the file; convert to ThreeJS mesh
      const meshes = await unifiedParser(file, format, theme);
      
      return meshes;
    }
  }

  //GCODE (Special case)
  if (extension == 'gcode')
  {
    //Load and parse the file; convert to ThreeJS lines
    const lines = await gcodeParser(file, theme);

    return lines;
  }
};