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
import {spawn, Thread, Transfer, Worker} from 'threads';

//Export
export default async (file, theme) =>
{
  //Spawn the worker
  const worker = await spawn(new Worker('./gcode.worker'));

  //Create the transferable file
  const transferable = Transfer(file);

  //Parse
  const {primaryVertices, secondaryVertices} = await worker(transferable);

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

  //Cleanup
  primaryGeometry.dispose();
  secondaryGeometry.dispose();
  primaryMaterial.dispose();
  secondaryMaterial.dispose();

  return [primaryLine, secondaryLine];
};