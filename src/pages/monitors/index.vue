<template>
  <view>
    <view m="20" h="386" relative bgWhite rounded="22" overflow="hidden" class="monitor-item">
      <view absolute bottom="0" right="0" left="0" bg="rgba(0, 0, 0, 0.28)" toBetween toCenterY px="40" py="20">
        <view white>暖蜂驿站1号站</view>
        <button class="btn-sm">查看监控</button>
      </view>
    </view>
    <view m="20" h="386" relative bgWhite rounded="22" overflow="hidden" class="monitor-item">
      <view absolute bottom="0" right="0" left="0" bg="rgba(0, 0, 0, 0.28)" toBetween toCenterY px="40" py="20">
        <view white>暖蜂驿站1号站</view>
        <button class="btn-sm">查看监控</button>
      </view>
    </view>
    <view m="20" h="386" relative bgWhite rounded="22" overflow="hidden" class="monitor-item">
      <view absolute bottom="0" right="0" left="0" bg="rgba(0, 0, 0, 0.28)" toBetween toCenterY px="40" py="20">
        <view white>暖蜂驿站1号站</view>
        <button class="btn-sm">查看监控</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
};
</script>

<style lang="scss">
.monitor-item {
  background: url("http://dev.miaoxz.com/monitor-preiview.png");
  background-size: cover;
}

.btn-sm {
  background: #F8B500;
  border-radius: 22rpx;
  font-size: 24rpx;
  color: #FFFFFF;
  padding: 5rpx 18rpx;
  line-height: normal;
  margin: 0;

  
  &::after {
    border: 0;
  }
}
</style>