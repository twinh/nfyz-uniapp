<template>
  <view>
    <image block w="700" mt="230" mx="auto" src="http://dev.miaoxz.com/video.png" mode="widthFix"/>
    <view m="75">
      <button class="btn" @click="handleClick">返回</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleClick() {
      uni.navigateBack();
    }
  }
};
</script>

<style>
page {
  background: #000;
}
</style>