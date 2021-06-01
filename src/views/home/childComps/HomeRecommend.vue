<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  background-color: #fff;
  border-bottom: 8px solid #eee;
  margin: 5px 0 30px;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend img {
  width: 55px;
  height: 55px;
  margin-bottom: 10px;
  margin-top: 5px;
}
</style>