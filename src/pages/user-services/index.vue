<template>
  <view>
    <MxList
        ref="list"
        url="user-services"
    >
      <template v-slot="{data}">
        <navigator
            :url="'/pages/services/detail?id=' + userService.service.id"
            v-for="userService in data"
            :key="userService.id"
            m="20" py="40" px="30" bgWhite toBetween toCenterY rounded="16"
        >
          <view toBetween column>
            <view text="36">{{userService.service.name}}</view>
            <view text="24" color="#999" mt2>申请时间 {{userService.createdAt}}</view>
          </view>
          <view>
            <button class="btn-sm">已申请</button>
          </view>
        </navigator>
      </template>
    </MxList>
  </view>
</template>

<script>
import MxList from '@/components/mx-list';

export default {
  components: {
    MxList,
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      this.$refs.list.reload();
    },
  },
};
</script>

<style scoped>

</style>