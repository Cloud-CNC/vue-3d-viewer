<template>
  <div id="canvas" ref="canvas" />
</template>

<script>
//Imports
import * as update from '@/lib/update';
import {setup, teardown} from '@/lib/scene';

export default {
  props: {
    file: {
      type: ArrayBuffer,
      required: true
    },
    extension: {
      type: String,
      required: true
    },
    plane : {
      default: () => ({
        X: 10,
        Y: 10
      }),
      type: Object
    },
    position: {
      default: () => ({
        X: 5,
        Y: 0,
        Z: -5
      }),
      type: Object
    },
    rotation: {
      default: () => ({
        X: -90,
        Y: 0,
        Z: 180
      }),
      type: Object
    },
    scale: {
      default: () => ({
        X: 0.1,
        Y: 0.1,
        Z: 0.1
      }),
      type: Object
    },
    theme: {
      default: () => ({
        background: '#dfe4ed',
        plane: '#586375',
        primary: '#4287f5',
        secondary: '#0a2f6b'
      }),
      type: Object
    },
  },
  mounted()
  {
    //Setup the scene
    setup(this.$refs.canvas, this.plane, this.theme);
  },
  beforeDestroy()
  {
    teardown();
  },
  watch: {
    file: async function(file)
    {
      await update.file(file, this.extension, this.theme);
      update.position(this.position);
      update.rotation(this.rotation);
      update.scale(this.scale);
    },
    plane: {
      deep: true,
      handler: update.plane
    },
    position: {
      deep: true,
      handler: update.position
    },
    rotation: {
      deep: true,
      handler: update.rotation
    },
    scale: {
      deep: true,
      handler: update.scale
    },
    theme: {
      deep: true,
      handler: update.theme
    }
  }
};
</script>

<style>
</style>