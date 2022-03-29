<template>
  <view v-if="user.id">
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <image w="100%" h="100%" :src="user.avatar"/>
      </view>
      <view toAround column ml12>
        <view flex>
          <view text="36">{{user.nickName}}</view>
          <view ml="16">
            <u-tag v-if="member.id" @click="handleClickMember" text="会员" type="warning" size="mini" shape="circle"></u-tag>
          </view>
        </view>
        <view v-if="user.mobile" color="#999999">{{user.mobile.substr(0, 3) + '****' + user.mobile.substr(7)}}</view>
      </view>
    </view>
    <view @click="handleClickAccessMember" bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/lock2.png" mode="heightFix"></image>
      </view>
      <view ml="16">
        {{accessMember.id ? '更新门禁资料' : '申请门禁'}}
      </view>
    </view>
    <navigator url="/pages/user-services/index" hover-class="none" bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/service2.png" mode="heightFix"></image>
      </view>
      <view ml="16">我申请的职工服务</view>
    </navigator>
  </view>
</template>

<script>
import $ from 'miaoxing';
import getUserProfile from '@/common/getUserProfile';

export default {
  data() {
    return {
      member: {},
      user: {},
      accessMember: {},
    };
  },
  onShow() {
    $.http({
      url: 'user',
    }).then(({ret}) => {
      this.user = ret.user;
      this.member = ret.member;
      this.accessMember = ret.accessMember;
    });
  },
  methods: {
    handleClickAccessMember() {
      getUserProfile(() => {
        uni.navigateTo({
          url: '/pages/access-member/apply',
        });
      });
    },
    
    handleClickMember() {
      uni.navigateTo({
        url: '/pages/members/new',
      });
    }
  }
};
</script>