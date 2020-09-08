/**
 * @fileoverview ThreeJS Scene Management
 */

//Imports
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import
{
  Color,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MOUSE,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  WebGLRenderer
} from 'three';
import state from './state';

//Resize event handler
const resize = () =>
{
  //Update renderer
  state.renderer.setSize(state.canvas.clientWidth, state.canvas.clientHeight);

  //Update camera aspect ratio
  state.camera.aspect = state.canvas.clientWidth / state.canvas.clientHeight;
  state.camera.updateProjectionMatrix();
};

//Export
export const setup = async (canvas, plane, theme) =>
{
  //Store variables
  state.canvas = canvas;

  //Scene
  state.scene = new Scene();
  state.scene.background = new Color(theme.background);

  //Light
  state.light = new HemisphereLight(0xffffff, 0x505050);
  state.light.position.set(0, 10, 0);
  state.scene.add(state.light);

  //Plane
  state.plane = new Mesh(new PlaneBufferGeometry(), new MeshBasicMaterial({
    color: new Color(theme.plane)
  }));
  state.plane.scale.set(plane.X, plane.Y, 1);
  state.plane.rotateX(-Math.PI / 2);
  state.scene.add(state.plane);

  //Renderer
  state.renderer = new WebGLRenderer({
    antialias: true
  });
  state.renderer.setPixelRatio(window.devicePixelRatio);
  state.renderer.setSize(state.canvas.clientWidth, state.canvas.clientHeight);
  state.canvas.appendChild(state.renderer.domElement);

  //Resize
  window.addEventListener('resize', resize);

  //Camera
  state.camera = new PerspectiveCamera(50, state.canvas.clientWidth / state.canvas.clientHeight, 0.1, 200);
  state.camera.position.set(0, plane.X / 2, -plane.Y);

  //Orbit controls
  state.controls = new OrbitControls(state.camera, state.canvas);
  state.controls.rotateSpeed = 0.7;
  state.controls.minDistance = 1;
  state.controls.maxDistance = 100;
  state.controls.minPolarAngle = 0;
  state.controls.maxPolarAngle = Math.PI;
  state.controls.mouseButtons = {
    LEFT: MOUSE.PAN,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.ROTATE
  };

  //Animation loop
  const animate = () =>
  {
    //Only recur if the viewer hasn't been destroyed
    if (!state.destroyed)
    {
      //Update orbit controls
      state.controls.update();

      //Render
      state.renderer.render(state.scene, state.camera);

      //Recur
      requestAnimationFrame(animate);
    }
  };
  animate();

  //Environment
  if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing')
  {
    window.getVue3dViewerState = () =>
    {
      return state;
    };
  }
};

//Export
export const teardown = () =>
{
  //Resize
  window.removeEventListener('resize', resize);

  //Cleanup scene
  for (const mesh of state.scene.children)
  {
    //Geometry
    if (mesh.geometry != null && typeof mesh.geometry.dispose == 'function')
    {
      mesh.geometry.dispose();
    }

    //Material
    if (mesh.material != null && typeof mesh.material.dispose == 'function')
    {
      mesh.material.dispose();
    }
  }

  //Stop animation loop
  state.destroyed = true;

  //Cleanup controls and renderer
  state.controls.dispose();
  state.renderer.dispose();
};