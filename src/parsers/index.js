/**
 * @fileoverview File Parsers
 */

//Imports
import {FileFormats} from 'unified-3d-loader';
import gcodeParser from './gcode-parser';
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

      //Materials
      for (const mesh of meshes)
      {
        mesh.material.color.set(theme.primary);
      }

      return meshes;
    }
  }

  //GCODE (Special case)
  if (extension == 'gcode')
  {
    //Load and parse the file; convert to ThreeJS mesh
    const parser = new gcodeParser(theme);
    const string = new TextDecoder().decode(file);
    const mesh = await parser.parse(string);

    return [mesh];
  }
};