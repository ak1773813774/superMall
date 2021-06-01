<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  width: 200px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(100, 100, 100, 0.7);
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bolder;
}
</style>