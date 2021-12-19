<template>
  <view>
    <image block w="700" mt="230" mx="auto" src="https://image-10001577.image.myqcloud.com/uploads/10/20211219/16399198233467.png" mode="widthFix"/>
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