<template>
  <view class="content">
    <button @click="handleClick">授权</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    // 用户登陆
    uni.login({
      success: (res) => {
        this.$api({
          url: 'wechat-mp/login',
          method: 'POST',
          noToast: true,
          data: {
            code: res.code,
          },
        }).then((ret) => {
          console.log('ret', ret);
          uni.setStorageSync('token', ret.token);
        }).catch((e) => {
          console.log('e', e);
        });
      },
    });
  },
  methods: {
    handleClick() {
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          this.$api({
            url: 'wechat-mp/user',
            method: 'PATCH',
            data: res.userInfo,
          });
        },
      });
    },
  },
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
  background: #f0f3f9;
}
</style>
