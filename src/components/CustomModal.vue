<template>
  <v-alert :text="text" type="info"></v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
