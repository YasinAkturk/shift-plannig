<template>
  <div
    style="cursor: pointer"
    @click="$emit('handleDayClick', item, index, columnName)"
    v-if="Object.keys(item).length != 0 && item.value != 0"
  >
    <div class="d-flex flex-column justify-center align-center">
      <Light v-if="item.value === 1" />
      <Dark v-else-if="item.value === 2" />
      <LightAndDark v-else-if="item.value === 3" />
      <Freeday v-else-if="item.value === 4" />
      <Other v-else />
      <span style="margin-top: 5px; font-size: 10px; font-weight: 500">{{
        item.label
      }}</span>
      <span style="font-size: 10px; font-weight: 500">{{
        item.timeLabel
      }}</span>
    </div>
  </div>
  <v-btn
    v-else
    @click="$emit('handleDayClick', item, index, columnName)"
    variant="text"
    class="plus-button"
  >
    +
  </v-btn>
</template>

<script>
import Light from "../assets/svg/light.svg";
import Dark from "../assets/svg/dark.svg";
import LightAndDark from "../assets/svg/light-and-dark.svg";
import Freeday from "../assets/svg/freeday.svg";
import Other from "../assets/svg/other.svg";
export default {
  components: {
    Light,
    Dark,
    LightAndDark,
    Freeday,
    Other,
  },
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
    columnName: {
      type: Array,
    },
  },
  methods: {
    submit() {
      this.$emit("handleDayClick", item, index, columnName);
    },
  },
};
</script>

<style lang="scss" scoped></style>
