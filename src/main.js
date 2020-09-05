/**
 * @fileoverview Vue 3D Viewer
 */

//Imports
import viewer from './viewer.vue';

//Export
export default {
  /**
   * @function Install Vue 3D Viewer
   * @param vue Vue instance
   */
  install: vue =>
  {
    //Register component
    vue.mixin({
      components: {
        '3d-viewer': viewer
      }
    });
  }
};