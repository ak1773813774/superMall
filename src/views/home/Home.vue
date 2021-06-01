<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @itemClick="tabClick"
      class="fixed-tab-control"
      ref="control2"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      :probe-type="3"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners" @imageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @itemClick="tabClick"
        ref="control1"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top v-show="isShowBackTop" @topClick="topClick" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import { getMultiData, getHomeGoods } from "network/home";

import { debounce } from "common/utils";
import { imageLinstenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [imageLinstenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      saveY: 0,
      isTabFixed: false,
      tabOffsetTop: 0,
    };
  },
  created() {
    this.getMultiData();
    // 请求新款、流行、推荐数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scrollY();
    this.$bus.$off("imageLoad", this.itemImageListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件相关代码
     */
    topClick() {
      this.backTop();
    },
    contentScroll(position) {
      this.isTabFixed = -position.y > this.tabOffsetTop;
      this.showBackTop(position);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.control1.$el.offsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.control1.currentIndex = index;
      this.$refs.control2.currentIndex = index;
    },
    /**
     * 网络请求相关代码
     */
    // 请求的首页数据
    getMultiData() {
      getMultiData().then((res) => {
        // console.log(res);
        // 保存轮播图数据
        this.banners = res.data.banner.list;
        // 请求recommend数据
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
.fixed-tab-control {
  position: relative;
  z-index: 9;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>