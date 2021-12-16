<template>
  <view class="content">
    <MxTitle title="暖蜂驿站" :bg="false"></MxTitle>
    <view toCenter column bg="#F8B500" h="852" class="top">
      <image w="388" h="388" mt="165" src="/static/lock.png"/>
      <button w="454" my="105" class="main-btn" @click="handleClick">门禁申请</button>
    </view>
    <view toAround mt="72">
      <view>
        <image w="144" h="144" src="/static/me.png"/>
        <view color="#999999">职工服务</view>
      </view>
      <view>
        <image w="144" h="144" src="/static/service.png"/>
        <view color="#999999">个人中心</view>
      </view>
    </view>
    <view my="100" toCenter>
      <image w="360" src="/static/logo.png" mode="widthFix"/>
    </view>
  </view>
</template>

<script>
import MxTitle from '@/components/mx-title';

export default {
  components: {
    MxTitle
  },
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

<style lang="scss">
.top {
  background: url('http://dev.miaoxz.com/bg.png');
  background-size: cover;
}
.main-btn {
  background: #FFFFFF;
  box-shadow: 4rpx 5rpx 10px 0 #E0A403;
  border-radius: 55rpx;
  font-size: 36rpx;
  color: #F8B500;
  letter-spacing: 0;
  text-align: center;
  
  &::after {
    border: 0;
  }
}
</style>
