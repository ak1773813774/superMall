<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div class="active-icon" v-else>
      <slot name="active-icon"></slot>
    </div>
    <div class="item-text" :style="itemStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: false,
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    itemStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  height: 49px;
  flex: 1;
  text-align: center;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0 3px 0;
  vertical-align: middle;
}
</style>