<script>
export default {
  onLaunch: function () {
    // #ifndef APP-NVUE
    uni.requireNativePlugin = () => {};
    // #endif
    
    console.log("App Launch");
    const envVersion = __wxConfig.envVersion;
    let addr;
    if (envVersion === "release") {
      addr = "https://rabbit-seller-server.apkevery.com";
    } else {
      addr = "http://dev.miaoxz.com/m-api/";
    }
    this.globalData.envVersion = envVersion;
    this.globalData.addr = addr;
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
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
    width: 100%;
    height: 100%;
    background: #F5F5F5;
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
</style>
