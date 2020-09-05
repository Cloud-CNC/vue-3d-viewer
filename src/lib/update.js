/**
 * @fileoverview State Updater
 */

//Imports
import parser from '../parsers';
import state from './state';

export const file = async (file, extension, theme) =>
{
  //Remove existing meshes
  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      state.scene.remove(mesh);
    }
  }

  //Parse and load
  const meshes = await parser(file, extension, theme);

  //Save for later manipulation
  state.meshes = meshes;

  //Add to scene
  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      state.scene.add(mesh);
    }
  }
};

export const plane = (X, Y) =>
{
  state.plane.scale.set(X, Y, 1);
};

export const position = vector =>
{
  const {X, Y, Z} = vector;

  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      mesh.position.set(X, Y, Z);
    }
  }
};

export const rotation = vector =>
{
  let {X, Y, Z} = vector;

  //Convert to radians
  const scalar = Math.PI / 180;
  X *= scalar;
  Y *= scalar;
  Z *= scalar;

  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      mesh.rotation.set(X, Y, Z);
    }
  }
};

export const scale = vector =>
{
  const {X, Y, Z} = vector;
  
  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      mesh.scale.set(X, Y, Z);
    }
  }
};
export const theme = () =>
{
  //Update background
  state.scene.background.set(theme.background);

  //Update plane
  state.plane.material.color.set(theme.plane);

  //Update meshes
  if (state.meshes != null)
  {
    for (const mesh of state.meshes)
    {
      mesh.material.color.set(theme.primary);
    }
  }
};
