<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImage">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  props: {
    topImage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    SwiperItem,
    Swiper,
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>