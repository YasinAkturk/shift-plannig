<template>
  <v-radio :value="item" :label="item.label" :style="radioStyle">
    <template v-slot:label="{ label }">
      <div style="display: flex; gap: 5px; align-items: center">
        <Light v-if="type === 'sabah'" />
        <Dark v-else-if="type === 'aksam'" />
        <LightAndDark v-else-if="type === 'tamgun'" />
        <Freeday v-else-if="type === 'izin'" />
        <Other v-else />
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <span
            style="font-size: small; font-weight: bold; line-height: normal"
            >{{ label }}</span
          >
          <span
            style="font-size: small; font-weight: bold; line-height: normal"
            >{{ item.timeLabel }}</span
          >
        </div>
      </div>
    </template>
  </v-radio>
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
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    radioStyle() {
      let backgroundColor, borderColor, color;

      switch (this.type) {
        case "sabah":
          backgroundColor = "#fff6cc";
          borderColor = "#ffd539";
          color = "#ffd539";
          break;
        case "aksam":
          backgroundColor = "#f1faff";
          borderColor = "#52c4d9";
          color = "#52c4d9";
          break;
        case "tamgun":
          backgroundColor = "#fddcdb";
          borderColor = "#f65f57";
          color = "#f65f57";
          break;
        case "izin":
          backgroundColor = "#e8fff3";
          borderColor = "#1fba7d";
          color = "#1fba7d";
          break;
        default:
          backgroundColor = "#d3d3d3";
          borderColor = "#55585a";
          color = "#55585a";
      }

      return {
        width: "200px",
        height: "45px",
        fontSize: "10px",
        border: `1px solid ${borderColor}`,
        backgroundColor,
        padding: "5px",
        color,
      };
    },
  },
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
