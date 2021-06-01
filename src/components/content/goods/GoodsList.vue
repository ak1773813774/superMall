<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goods-item="item" />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "Goods",
  components: {
    GoodsItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>