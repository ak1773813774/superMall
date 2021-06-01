<template>
  <div id="detail">
    <detail-nav-bar @itemClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      @scroll="contentScroll"
      :probeType="3"
    >
      <detail-swiper :topImage="topImage" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="detailImageLoad"
      />
      <detail-param-info ref="params" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <!-- <detail-recommend-info :recommend-list="recommend" /> -->
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShowBackTop" @topClick="topClick" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { imageLinstenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    // DetailRecommendInfo,
  },
  mixins: [imageLinstenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopOffsetYs: [],
      themeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求详情页数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 获取轮播图数据
      this.topImage = data.itemInfo.topImages;
      // 请求商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 请求店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品信息
      this.detailInfo = data.detailInfo;
      // 请求参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 请求评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
    this.themeTopY = debounce(() => {
      this.themeTopOffsetYs = [];
      this.themeTopOffsetYs.push(0);
      this.themeTopOffsetYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopOffsetYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopOffsetYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopOffsetYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopOffsetYs);
    }, 200);
  },
  destroyed() {
    this.$bus.$off("imageLoad", this.itemImageListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    detailImageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh(), 200);
      refresh();
      this.themeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopOffsetYs[index], 500);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopOffsetYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopOffsetYs[i] &&
          positionY < this.themeTopOffsetYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        this.showBackTop(position);
        // 原始写法
        // if (
        //   (this.currentIndex !== i &&
        //     i < length - 1 &&
        //     positionY >= this.themeTopOffsetYs[i] &&
        //     positionY < this.themeTopOffsetYs[i + 1]) ||
        //   (i === length - 1 && positionY >= this.themeTopOffsetYs[i])
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    topClick() {
      this.backTop();
    },
    addToCart() {
      const product = {};
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;

      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
        // console.log(res);
      });

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  overflow: hidden;
}
</style>