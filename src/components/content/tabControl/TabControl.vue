<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{ active: index === currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--color-tint);
}
.active span {
  border-bottom: 3px solid pink;
  padding: 3px 0;
}
</style>