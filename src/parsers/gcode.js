/**
 * @fileoverview GCODE Parser
 * Based on https://github.com/mrdoob/three.js/blob/dev/examples/js/loaders/GCodeLoader.js
 * @author tentone
 * @author joewalnes
 * @author wakeful-cloud
 */

import
{
  LineBasicMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  Line
} from 'three';
import {BlobWorker, spawn, Thread, Transfer} from 'threads';
import WorkerText from './gcode.worker';

//Export
export default async (file, transfer, theme, progress) =>
{
  //Spawn the worker
  const worker = await spawn(BlobWorker.fromText(WorkerText));

  //Observe progress
  worker.observeProgress().subscribe(progress);

  //If the transfer option is true, convert the model to a ThreadJS transferable otherwise have ThreadsJS clone the arraybuffer
  const bytes = transfer ? Transfer(file) : file;

  //Parse
  const {primaryVertices, secondaryVertices} = await worker.parse(bytes);

  //Kill the worker
  Thread.terminate(worker);

  //Theming
  const primaryMaterial = new LineBasicMaterial({color: theme.primary});
  const secondaryMaterial = new LineBasicMaterial({color: theme.secondary});

  //Line generation
  const primaryGeometry = new BufferGeometry();
  const secondaryGeometry = new BufferGeometry();

  primaryGeometry.setAttribute(
    'position',
    new Float32BufferAttribute(primaryVertices, 3)
  );
  secondaryGeometry.setAttribute(
    'position',
    new Float32BufferAttribute(secondaryVertices, 3)
  );

  const primaryLine = new Line(primaryGeometry, primaryMaterial);
  const secondaryLine = new Line(secondaryGeometry, secondaryMaterial);

  //Metadata
  primaryLine.metadata = {...primaryLine.metadata, color: 'primary'};
  secondaryLine.metadata = {...secondaryLine.metadata, color: 'secondary'};

  //Cleanup
  primaryGeometry.dispose();
  secondaryGeometry.dispose();
  primaryMaterial.dispose();
  secondaryMaterial.dispose();

  return [primaryLine, secondaryLine];
};