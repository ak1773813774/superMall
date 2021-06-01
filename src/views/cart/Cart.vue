<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list />
    <cart-buttom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartButtomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,
  },
  computed: {
    // ...mapGetters(["cartLength"]),
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
#cart {
  width: 375px;
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>