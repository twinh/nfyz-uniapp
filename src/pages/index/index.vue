<template>
  <view>
    <view toCenterX column bg="#F8B500" h="852" class="top">
      <image w="388" h="388" mt="165" :src="isAdmin ? '/static/monitor.png' : '/static/lock.png'"/>
      
      <button w="454" my="105" class="main-btn" @click="handleClick">
        <template v-if="isAdmin">实时监控</template>
        <template v-else-if="isMember">欢迎进入</template>
        <template v-else>门禁申请</template>
      </button>
    </view>
    <view toAround mt="72">
      <navigator toCenter column url="/pages/services/index" hover-class="none">
        <image w="144" h="144" mb2 src="/static/service.png"/>
        <view color="#999999" textCenter text="30">职工服务</view>
      </navigator>
      <navigator v-if="isAdmin" toCenter column url="/pages/admin/services/index" hover-class="none">
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
          loading: true,
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
        url: 'index',
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

      if (this.isMember) {
        uni.navigateTo({
          url: '/pages/access-member/apply',
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
            loading: true,
          }).then(({ret}) => {
            if (ret.isErr()) {
              $.ret(ret);
              return;
            }

            uni.navigateTo({
              url: '/pages/access-member/apply',
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
  background: url('https://image-10001577.image.myqcloud.com/uploads/10/20211219/16399197688524.png');
  background-size: cover;
}
.main-btn {
  background: #FFFFFF;
  box-shadow: 4rpx 5rpx 10rpx 0 #E0A403;
  border-radius: 55rpx;
  font-size: 36rpx;
  color: #F8B500;
  text-align: center;
  
  &::after {
    border: 0;
  }
}
</style>
