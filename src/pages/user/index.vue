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
            <u-tag text="会员" type="warning" size="mini" shape="circle"></u-tag>  
          </view>
        </view>
        <view color="#999999">138****1231</view>
      </view>
    </view>
    <view bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/lock2.png" mode="heightFix"></image>
      </view>
      <view ml="16">门禁申请</view>
    </view>
    <view bgWhite m="20" p="32" rounded="16" flex toCenterY>
      <view toCenter w="48">
        <image h="36" src="/static/service2.png" mode="heightFix"></image>
      </view>
      <view ml="16">职工服务</view>
    </view>
  </view>
</template>

<script>
export default {};
</script>