import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";
export const imageLinstenerMixin = {
    data() {
        return {
            itemImageListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh(), 200);
        this.itemImageListener = () => {
            refresh();
        };
        this.$bus.$on("imageLoad", this.itemImageListener);
    },
}

export const backTopMixin = {
    components: {
        BackTop,
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        showBackTop(position) {
            this.isShowBackTop = -position.y > 1000;
        }
    }
}