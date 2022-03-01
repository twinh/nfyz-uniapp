<script>
export default {
  onLaunch: function () {
    // #ifndef APP-NVUE
    uni.requireNativePlugin = () => {};
    // #endif
    
    const envVersion = __wxConfig.envVersion;
    let baseApiUrl;
    if (envVersion === "develop") {
      baseApiUrl = "http://p.miaoxingyun.com/m-api/";
    } else {
      baseApiUrl = "https://nfyz.miaoxingyun.com/m-api/";
    }
    this.globalData.envVersion = envVersion;
    this.globalData.baseApiUrl = baseApiUrl;
  },
  onShow: function () {
  },
  onHide: function () {
  },
  globalData: {
    envVersion: "",
    addr: "",
  },
  methods: {},
};
</script>

<style lang="scss">
  @import "uview-ui/index.scss";

	/*每个页面公共css */
  view {
    font-size: 30rpx;
  }
  
  page {
    background: #F5F5F5;
  }

  /* 覆盖默认240px，避免拉伸后缩小 */
  image[mode=widthFix] {
    height: auto;
  }

  .btn {
    background: #f8b500;
    border-radius: 50rpx;
    font-size: 36rpx;
    color: #ffffff;
    text-align: center;

    &::after {
      border: 0;
    }
  }
  
  .btn-danger {
    background: #f56c6c;
  }

  .btn-sm {
    background: #F8B500;
    border-radius: 22rpx;
    font-size: 24rpx;
    color: #FFFFFF;
    padding: 5rpx 18rpx;
    line-height: normal;
    margin: 0;
    
    &::after {
      border: 0;
    }
  }

  .btn-group {
    display: flex;

    > .btn {
      flex: 1;
    }

    & > .btn:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    & > .btn:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .btn-none {
    background: none;

    &::after {
      border: 0;
    }
  }

  .btn-input {
    margin-left: 8rpx;
    margin-right: 0;
    padding: 0;
    font-size: 15px;
  }
</style>
