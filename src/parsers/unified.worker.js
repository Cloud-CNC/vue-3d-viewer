/**
 * @fileoverview Unified File Parser Worker
 */

//Imports
import {expose} from 'threads';
import {FileFormats, Unified3dLoader} from 'unified-3d-loader';

//Parse the file
const parse = async (file, format) =>
{
  //Convert file format
  const scopedFormat = Object.values(FileFormats).find(fileFormat => fileFormat.name == format.name);

  //Load and parse the file
  const loader = new Unified3dLoader();
  const files = await loader.load(file, scopedFormat, {
    index: {
      normals: false,
      vertices: false
    }
  });

  return files;
};

//Export
expose(parse);