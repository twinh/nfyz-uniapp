<template>
  <view>
    <imou-player
        v-if="src"
        :src="src"
        :kitToken="data.kitToken"
        autoplay="true"
        controls="true"
        poster="https://image-10001577.image.myqcloud.com/uploads/10/20211219/16399198233467.png"
    >
    </imou-player>
<!--    <image block w="700" mt="230" mx="auto" src="https://image-10001577.image.myqcloud.com/uploads/10/20211219/16399198233467.png" mode="widthFix"/>-->
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
      src: '',
      data: {
      },
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

        // https://open.imoulife.com/book/zh/light/sdk.html
        this.src = `imou://open.lechange.com/${ret.data.outId}/0/1?streamId=0`;
        this.data = ret.data;

        //this.src = 'imou://open.lechange.com/5A05BD4PAJE237E/0/1?streamId=1';
        //this.data.kitToken = 'Kt_54f8452ce4e14795b98b965ac11d728d';
      });
    },
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
