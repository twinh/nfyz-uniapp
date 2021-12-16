<template>
  <view>
    <view class="title" :style="[zdy]">
      <view :style="{height:statusBarHeight+'px'}"></view>
      <view :style="{height:titleBarHeight+'px'}" class="main">
        <view class="text">{{conf.title}}</view>
        <view class="icon">
          <view class="icon_box" @click="iconTap">
            <image class="icon_img" :src="conf.icon" :style="[conf.iconStyle]" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>
    <view class="title_bottom" v-if="conf.place">
      <view :style="{height:statusBarHeight+'px'}"></view>
      <view :style="{height:titleBarHeight+'px'}"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    conf: {
      type: Object,
      default: {
        icon: "", // 图标
        iconStyle: null, // 图标样式
        method: false, // 图标是否有特殊方法
        title: "", // 标题
        place: true, // 是否占位
        scrollTop: 0, // 滚动条距离位置
        scope: 20, // 滚动的距离
        style: null, // 滚动后样式
        defaultStyle: null, // 默认样式
      },
    },
  },
  data() {
    return {
      statusBarHeight: 0,
      titleBarHeight: 40,
    };
  },
  created() {
    const { statusBarHeight } = uni.getSystemInfoSync();
    const { bottom, top } = uni.getMenuButtonBoundingClientRect();
    const titleBarHeight = bottom + top - statusBarHeight * 2;
    this.statusBarHeight = statusBarHeight;
    this.titleBarHeight = titleBarHeight;
  },
  methods: {
    iconTap() {
      if (this.conf.method) {
        this.$emit("titleIcon");
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
  },
  computed: {
    zdy() {
      const num = this.conf.scrollTop - this.conf.scope;
      let style;
      if (num > 0) {
        if (this.conf.style) {
          style = this.conf.style;
        } else {
          style = {
            background: "#ffffff",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          };
        }
      } else {
        style = "";
      }
      return {...this.conf.defaultStyle, ...style};
    },
  },
};
</script>

<style scoped>
.title {
  width: 750rpx;
  position: fixed;
  top: 0;
  z-index: 100;
  font-size: 16px;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
}

.main {
  width: 100%;
  position: relative;
}

.text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.icon_box {
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 40px;
  justify-content: center;
}

.icon_img {
  width: 21px;
  height: 21px;
  margin-left: 51rpx;
}

.title_bottom {
  width: 750rpx;
  background: #ffffff;
}
</style>
