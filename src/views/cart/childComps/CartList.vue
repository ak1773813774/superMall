<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  width: 100%;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 98px;
  left: 0;
  overflow: hidden;
}
</style>