<script>
export default {
  onLaunch: function () {
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

<style>
	/*每个页面公共css */
</style>
