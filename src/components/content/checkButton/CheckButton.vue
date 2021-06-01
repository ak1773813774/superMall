<template>
  <div class="check-button">
    <img
      src="~assets/img/cart/tick.svg"
      alt=""
      :class="{ active: isChecked }"
    />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button img {
  width: 24px;
  height: 24px;
  border: 2px solid #aaa;
  border-radius: 50%;
}
.active {
  background-color: #f00;
  border-color: #f00;
}
</style>