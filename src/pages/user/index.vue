<template>
  <view>
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view toAround column ml12>
        <view flex>
          <oepn-data text="36" type="userNickName">用户昵称</oepn-data>
          <view ml="16">
            <u-tag v-if="member.id" text="会员" type="warning" size="mini" shape="circle"></u-tag>
          </view>
        </view>
        <view v-if="user.mobile" color="#999999">{{user.mobile.substr(0, 3) + '****' + user.mobile.substr(7)}}</view>
      </view>
    </view>
    <navigator url="/pages/access-member/apply" hover-class="none" bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/lock2.png" mode="heightFix"></image>
      </view>
      <view ml="16">
        {{accessMember.id ? '更新门禁资料' : '申请门禁'}}
      </view>
    </navigator>
    <navigator url="/pages/user-services/index" hover-class="none" bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/service2.png" mode="heightFix"></image>
      </view>
      <view ml="16">职工服务</view>
    </navigator>
  </view>
</template>

<script>
import $ from 'miaoxing';

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
};
</script>