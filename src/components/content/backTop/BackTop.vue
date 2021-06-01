<template>
  <div class="back-top" @click="topClick">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    topClick() {
      this.$emit("topClick");
    },
  },
};
</script>

<style>
.back-top {
  position: fixed;
  bottom: 55px;
  right: 15px;
}
.back-top img {
  width: 55px;
  height: 55px;
}
</style>