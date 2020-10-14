/**
 * @fileoverview Unified 3D Loader Worker
 */

//Imports
import {expose} from 'threads';
import {FileFormats, Unified3dLoader} from 'unified-3d-loader';
import {Observable} from 'observable-fns';

//Instance variables
let proxyObserver;

/**
 * Unified 3D Loader worker
 */
const worker = {
  /**
   * Observe the progress
   * @returns {Observable}
   */
  observeProgress: () => new Observable(observer =>
  {
    proxyObserver = observer;
  }),
  /**
   * Parse the file
   * @param file {ArrayBuffer}
   * @param format {String}
   * @returns {Promise<Array<Object>>}
   */
  parse: async (file, format) =>
  {
    //Convert file format
    const scopedFormat = Object.values(FileFormats).find(fileFormat => fileFormat.name == format.name);

    //Load and parse the file
    const loader = new Unified3dLoader();

    loader.on('progress', progress =>
    {
      proxyObserver.next(progress);
    });

    const files = await loader.load(file, scopedFormat, {
      index: {
        normals: false,
        vertices: false
      }
    });

    return files;
  }
}

//Expose
expose(worker);