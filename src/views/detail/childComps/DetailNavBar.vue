<template>
  <div class="detail-nav-bar">
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" v-for="(item, index) in title" class="center">
      <div
        :class="{ active: currentIndex === index }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-nav-bar {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
}
.center {
  flex: 1;
  font-size: 15px;
}
.left img {
  margin: 12px 12px 12px 5px;
}
.active {
  color: var(--color-tint);
}
</style>