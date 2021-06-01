<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">价格:{{ totalPrice }}</div>
    <div class="account" @click="accountClick">
      去结算({{ cartListLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    cartListLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    accountClick() {
      if (!this.isSelectAll) {
        this.$toast.show("没有商品被选中", 2000);
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  width: 100%;
  height: 49px;
  background-color: #eee;
  display: flex;
  align-items: center;
}
.check-content {
  width: 60px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.price {
  flex: 1;
  text-align: center;
  font-weight: bolder;
}
.account {
  width: 90px;
  height: 49px;
  background-color: #f00;
  color: #fff;
  line-height: 49px;
  text-align: center;
}
</style>