<template>
  <div id="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
#nav-bar {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  /* color: #fff; */
}
.left,
.right {
  width: 50px;
}
.center {
  flex: 1;
}
</style>