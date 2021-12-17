<template>
  <view>
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view toCenterY ml12>
        <oepn-data type="userNickName">用户昵称</oepn-data>
      </view>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <u-input
          placeholder="请输入申请人姓名"
          border="none"
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-name.png" mode="widthFix"/>
      </u-input>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <u-input
          placeholder="请输入手机号"
          border="none"
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-mobile.png" mode="widthFix"/>
        <view slot="suffix" mr5 color="#0091FF">一键获取</view>
      </u-input>
    </view>
    <view m="20" flex>
      <view bgWhite p="32" rounded="16" flex="1" toCenter column>
        <image w="61" src="/static/camera.png" mode="widthFix"/>
        <view mt="16" color="#ccc">点击上传照片</view>
      </view>
      <view ml="20" bgWhite p="32" rounded="16" flex="1" toCenter column>
        <image w="116" src="/static/face.png" mode="widthFix"/>
        <view mt="16" text="24" color="#ccc">正确示例：五官清晰</view>
      </view>
    </view>
    <view m="75">
      <button class="btn">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  
};
</script>

<style lang="scss">
.btn {
  background: #F8B500;
  border-radius: 50rpx;
  font-size: 36rpx;
  color: #FFFFFF;
  text-align: center;
  
  &::after {
    border: 0;
  }
}
</style>