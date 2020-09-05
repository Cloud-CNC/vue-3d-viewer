<template>
  <v-card flat class="color-picker">
    <v-card-subtitle>{{label}}</v-card-subtitle>
    <v-card-text>
      <v-color-picker flat :data-e2e="dataE2e" @input="event => $emit('input', event)" :value="value" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    dataE2e: {
      default: undefined,
      type: String
    },
    label: {
      type: String
    },
    value: {
      required: true,
      type: String
    }
  }
};
</script>

<style>
.color-picker {
  margin: 10px;
}
</style>