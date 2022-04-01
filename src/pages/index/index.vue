<template>
  <view>
    <view toCenterX column bg="#F8B500" h="852" class="top">
      <image w="388" h="388" mt="165" :src="isAdmin ? '/static/monitor.png' : '/static/lock.png'"/>
      <button w="454" my="105" class="main-btn" @click="handleClick">
        {{entry.text || ''}}
      </button>
    </view>
    <view toAround mt="72">
      <navigator v-if="entry.url && entry.url !== '/pages/services/index'" toCenter column url="/pages/services/index" 
          hover-class="none">
        <image w="144" h="144" mb2 src="/static/service.png"/>
        <view color="#999999" textCenter text="30">职工服务</view>
      </navigator>
      <navigator v-if="isAdmin" toCenter column url="/pages/admin/services/index" hover-class="none">
        <image w="144" h="144" mb2 src="/static/service-manage.png"/>
        <view color="#999999" textCenter text="30">职工服务管理</view>
      </navigator>
      <navigator v-else toCenter column target="miniProgram" app-id="wxb7a23c5650537af6" hover-class="none">
        <image w="144" h="144" mb2 src="/static/apply.png"/>
        <view color="#999999" textCenter text="30">申请入会</view>
      </navigator>
      <view @click="handleClickUser" toCenter column>
        <image w="144" h="144" mb2 src="/static/me.png"/>
        <view color="#999999" textCenter text="30">个人中心</view>
      </view>
    </view>
    <view my="100" toCenter>
      <image w="360" src="/static/logo.png" mode="widthFix"/>
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';
import getUserProfile from '@/common/getUserProfile';

export default {
  data() {
    return {
      isAdmin: false,
      user: {},
      entry: {},
      getUserProfile: false,
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

    const stationId = this.getStationId();
    if (stationId) {
      uni.setStorageSync('stationId', stationId);
    }
  },
  onShareAppMessage() {
    return {
      title: '暖蜂驿站',
      path: '/pages/index/index?scene=' + this.user.source,
    };
  },
  methods: {
    getStationId() {
      const scene = $.req('scene');
      if (scene && scene.startsWith('stationId:')) {
        return scene.split(':')[1];
      }
      return null;
    },
    getData() {
      $.http({
        url: 'index',
        data: {
          scene: $.req('scene') || '',
        },
      }).then(({data}) => {
        this.isAdmin = data.isAdmin;
        this.user = data.user;
        this.entry = data.entry;
      });
    },
    goToEntry() {
      uni.navigateTo({
        url: this.entry.url,
      });
    },
    handleClick() {
      if (this.entry.requireAuth) {
        getUserProfile(this.goToEntry);
      } else {
        this.goToEntry();
      }
    },

    handleClickUser() {
      const next = () => {
        uni.navigateTo({
          url: '/pages/user/index',
        });
      };

      if (this.user.avatar || this.getUserProfile) {
        return next();
      } else {
        
        getUserProfile(() => {
          this.getUserProfile = true;
          next();
        });
      }
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
