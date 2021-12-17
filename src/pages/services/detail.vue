<template>
  <view pb="132">
    <view>
      <image w="100%" src="http://dev.miaoxz.com/bg2.png" mode="widthFix"/>
    </view>
    <view relative m="20" bgWhite rounded="40" mt="-100" px="30" py="25">
      <view text="40" py="20">
        周末嘉年华
      </view>
      <view flex py="25" toCenterY class="u-border-bottom">
        <image w="36" src="/static/time.png" mode="widthFix"/>
        <view color="#999" ml="8">活动时间</view>
        <view ml="32">2021-12-08至2021-12-30</view>
      </view>
      <view flex py="25" toCenterY class="u-border-bottom">
        <image w="36" src="/static/address.png" mode="widthFix"/>
        <view color="#999" ml="8">活动地点</view>
        <view ml="32">暖蜂驿站</view>
      </view>
      <view flex py="25" toCenterY>
        <image w="36" src="/static/phone.png" mode="widthFix"/>
        <view color="#999" ml="8">联系电话</view>
        <view ml="32">13800138000</view>
      </view>
    </view>
    <view m="20" bgWhite rounded="16" color="#999" p="40">
      <view mb="40">活动详情</view>
      <view>
        详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细
        详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细
        详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细
        详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细
        详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细详细介绍纤细
      </view>
    </view>
    <view fixed bottom="0" w="100%" bgWhite class="footer">
      <button class="btn" my="20" mx="75">我要报名</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
};
</script>

<style scoped lang="scss">
.footer {
  box-shadow: 8rpx -2rpx 10rpx 0 rgba(112,112,112,0.50);
}
</style>