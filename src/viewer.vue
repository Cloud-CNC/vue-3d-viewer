<template>
  <div class="vue-3d-viewer" ref="canvas" />
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
    transfer: {
      default: true,
      type: Boolean
    }
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
      await update.file(file, this.extension, this.transfer, this.theme, percent =>
      {
        this.$emit('progress', percent);
      });
      update.position(this.position);
      update.rotation(this.rotation);
      update.scale(this.scale);

      this.$emit('done');
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
.vue-3d-viewer {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>