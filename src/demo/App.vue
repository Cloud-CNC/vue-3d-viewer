<template>
  <v-app>
    <v-navigation-drawer
      temporary
      data-e2e="menu"
      v-model="drawer"
      width="400"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Plane</v-list-item-title>
            <v-list-item-action-text>
              <slider
                data-e2e="plane-x"
                label="X"
                value="viewer.plane.X"
                v-model="viewer.plane.X"
              />
              <slider
                data-e2e="plane-y"
                label="Y"
                value="viewer.plane.Y"
                v-model="viewer.plane.Y"
              />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Position</v-list-item-title>
            <v-list-item-action-text>
              <slider
                data-e2e="position-x"
                label="X"
                :min="-20"
                :max="20"
                value="viewer.position.X"
                v-model="viewer.position.X"
              />
              <slider
                data-e2e="position-y"
                label="Y"
                :min="-20"
                :max="20"
                value="viewer.position.Y"
                v-model="viewer.position.Y"
              />
              <slider
                data-e2e="position-z"
                label="Z"
                :min="-20"
                :max="20"
                value="viewer.position.Z"
                v-model="viewer.position.Z"
              />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Rotation</v-list-item-title>
            <v-list-item-action-text>
              <slider
                data-e2e="rotation-x"
                label="X"
                :min="-180"
                :max="180"
                value="viewer.rotation.X"
                v-model="viewer.rotation.X"
              />
              <slider
                data-e2e="rotation-y"
                label="Y"
                :min="-180"
                :max="180"
                value="viewer.rotation.Y"
                v-model="viewer.rotation.Y"
              />
              <slider
                data-e2e="rotation-z"
                label="Z"
                :min="-180"
                :max="180"
                value="viewer.rotation.Z"
                v-model="viewer.rotation.Z"
              />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Scale</v-list-item-title>
            <v-list-item-action-text>
              <slider
                data-e2e="scale-x"
                label="X"
                :min="0"
                :max="10"
                value="viewer.scale.X"
                v-model="viewer.scale.X"
              />
              <slider
                data-e2e="scale-y"
                label="Y"
                :min="0"
                :max="10"
                value="viewer.scale.Y"
                v-model="viewer.scale.Y"
              />
              <slider
                data-e2e="scale-z"
                label="Z"
                :min="0"
                :max="10"
                value="viewer.scale.Z"
                v-model="viewer.scale.Z"
              />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Theme</v-list-item-title>

            <v-list-item-action-text>
              <color-picker
                data-e2e="background-color"
                label="Background Color"
                v-model="viewer.theme.background"
              />
            </v-list-item-action-text>

            <v-list-item-action-text>
              <color-picker
                data-e2e="plane-color"
                label="Plane Color"
                v-model="viewer.theme.plane"
              />
            </v-list-item-action-text>

            <v-list-item-action-text>
              <color-picker
                data-e2e="primary-color"
                label="Primary Color"
                v-model="viewer.theme.primary"
              />
            </v-list-item-action-text>
            <v-list-item-action-text>
              <color-picker
                data-e2e="secondary-color"
                label="Secondary Color"
                v-model="viewer.theme.secondary"
              />
            </v-list-item-action-text>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog persistent v-model="progress.visible">
      <v-card>
        <v-card-title class="headline">Progress</v-card-title>
        <v-card-text>
          <v-progress-linear
            stream
            color="primary"
            :buffer-value="progress.value"
            :value="progress.value"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-btn
      icon
      class="menu-icon"
      @click="drawer = !drawer"
      data-e2e="toggle-menu"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-snackbar :value="true" timeout="-1">
      <v-file-input
        :accept="accepts"
        @change="upload"
        data-e2e="file-input"
        label="File"
      />
    </v-snackbar>

    <three-d-viewer
      :extension="viewer.extension"
      :file="viewer.file"
      :plane="viewer.plane"
      :position="viewer.position"
      :rotation="viewer.rotation"
      :scale="viewer.scale"
      :theme="viewer.theme"
      @done="done"
      @progress="update"
      class="emulate-root"
      data-e2e="three-d-viewer"
    />
  </v-app>
</template>

<script>
//Imports
import colorPicker from './color-picker';
import slider from './slider.vue';
import {FileFormats} from 'unified-3d-loader';

//Compute accepted extensions and mime types
const accepts = Object.values(FileFormats).map(format => format.extensions.map(extension => '.' + extension).join(',') + ',' + format.mimes.join(',')).join(',') + ',.gcode';

export default {
  data: () => ({
    accepts,
    drawer: false,
    progress: {
      value: 0,
      visible: false
    },
    viewer: {
      plane: {
        X: 10,
        Y: 10
      },
      extension: '',
      file: new ArrayBuffer(0),
      position: {
        X: 5,
        Y: 0,
        Z: -5
      },
      rotation: {
        X: -90,
        Y: 0,
        Z: 180
      },
      scale: {
        X: 0.1,
        Y: 0.1,
        Z: 0.1
      },
      theme: {
        background: '#dfe4ed',
        plane: '#586375',
        primary: '#4287f5',
        secondary: '#0a2f6b'
      }
    }
  }),
  components: {
    'color-picker': colorPicker,
    slider
  },
  methods: {
    done()
    {
      this.progress.visible = false;
    },
    update(progress)
    {
      this.progress.value = progress;
    },
    async upload(file)
    {
      //Reset progress bar and display it
      this.progress.value = 0;
      this.progress.visible = true;

      //Set extension
      this.viewer.extension = file.name.split('.').pop();

      //Get the array buffer
      this.viewer.file = await file.arrayBuffer();
    }
  }
};
</script>

<style>
:root {
  overflow-y: auto;
}

.emulate-root {
  background: var(--foreground);
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.menu-icon {
  left: 5px;
  position: absolute !important;
  top: 5px;
  z-index: 5;
}

.v-list {
  max-height: 80vh;
}

.v-navigation-drawer {
  z-index: 10;
}
</style>