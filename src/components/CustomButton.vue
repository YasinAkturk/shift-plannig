<template>
  <button :class="buttonType" class="button-custom" @click="handleButtonClick">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "success", "danger"].includes(value),
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleButtonClick() {
      this.$emit("onClick", this.buttonType);
    },
  },
};
</script>

<style scoped>
.button-custom {
  padding: 5px 40px;
  font-size: small;
  box-shadow: 0 1px #aeaeae;
}
.button-custom:hover {
  box-shadow: 2px 2px #ababab;
}

button:disabled,
button[disabled]{
    opacity: 0.50;
    box-shadow: none !important;
}

.primary {
  background-color: white;
  color: #41bdcf;
  border: 1px solid #41bdcf;
}

.success {
  background-color: #7ddcaf;
  color: #45b782;
  border: 1px solid #45b782;
}

.danger {
  background-color: #fddcdb;
  color: #ee827e;
  border: 1px solid #ee827e;
}
</style>
