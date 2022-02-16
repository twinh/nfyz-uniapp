<template>
  <view>
    <view mt="75" rounded="22" h="396" overflow="hidden">
      <imou-player
          v-if="data.src"
          :src="data.src"
          :kitToken="data.kitToken"
          autoplay="true"
          controls="true"
      >
      </imou-player>
    </view>
    <view m="75">
      <button class="btn" @click="handleClick">返回</button>
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      data: {},
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      const id = $.req('id') || '45235547678162484';

      $.http({
        url: 'monitors/' + id,
      }).then(({ret}) => {
        if (ret.isErr()) {
          $.ret(ret);
          return;
        }

        this.data = ret.data;
      });
    },
    handleClick() {
      uni.navigateBack();
    },
  },
};
</script>

<style>
page {
  background: #000;
}
</style>
