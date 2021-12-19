<template>
  <view>
    <MxTitle title="暖蜂驿站" :bg="false"></MxTitle>
    <view toCenter column bg="#F8B500" h="852" class="top">
      <image w="388" h="388" mt="165" :src="isAdmin ? '/static/monitor.png' : '/static/lock.png'"/>
      <button w="454" my="105" class="main-btn" @click="handleClick">
        {{isAdmin ? '实时监控' : '门禁申请'}}
      </button>
    </view>
    <view toAround mt="72">
      <navigator toCenter column url="/pages/services/index" hover-class="none">
        <image w="144" h="144" mb2 src="/static/service.png"/>
        <view color="#999999" textCenter text="30">职工服务</view>
      </navigator>
      <navigator v-if="isAdmin" toCenter column url="/pages/admin-services/index">
        <image w="144" h="144" mb2 src="/static/service-manage.png"/>
        <view color="#999999" textCenter text="30">职工服务管理</view>
      </navigator>
      <navigator toCenter column url="/pages/user/index" hover-class="none">
        <image w="144" h="144" mb2 src="/static/me.png"/>
        <view color="#999999" textCenter text="30">个人中心</view>
      </navigator>
    </view>
    <view my="100" toCenter>
      <image w="360" src="/static/logo.png" mode="widthFix"/>
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';
import MxTitle from '@/components/mx-title';

export default {
  components: {
    MxTitle
  },
  data() {
    return {
      isAdmin: false,
      isMember: false,
    };
  },
  onLoad() {
    // 用户登陆
    uni.login({
      success: (res) => {
        $.http({
          url: 'wechat-mp/login',
          method: 'POST',
          noToast: true,
          data: {
            code: res.code,
          },
        }).then((res) => {
          uni.setStorageSync('token', res.data.token);
          this.getData();
        }).catch((e) => {
          console.log('e', e);
        });
      },
    });
  },
  methods: {
    getData() {
      $.http({
        url: 'user',
      }).then(({data}) => {
        this.isAdmin = data.isAdmin;
        this.isMember = data.isMember;
      });
    },
    handleClick() {
      if (this.isAdmin) {
        uni.navigateTo({
          url: '/pages/monitors/index'
        });
        return;
      }
      
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          $.http({
            url: 'wechat-mp/user',
            method: 'PATCH',
            data: res.userInfo,
          }).then(({ret}) => {
            if (ret.isErr()) {
              $.ret(ret);
              return;
            }

            uni.navigateTo({
              url: '/pages/access-members/apply',
            });
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
  box-shadow: 4rpx 5rpx 10rpx 0 #E0A403;
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
