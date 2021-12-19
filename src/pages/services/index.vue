<template>
  <view>
    <MxList
        ref="mxList"
        url="services"
    >
      <template v-slot="{data}">
        <navigator
            :url="'/pages/services/detail?id=' + service.id"
            v-for="service in data"
            :key="service.id"
            m="20" relative bgWhite rounded="16" overflow="hidden"
        >
          <image w="100%" :src="service.cover" mode="widthFix"/>
          <view py4 px2>
            <view v-if="service.isMember" mr2 inlineBlock>
              <u-tag type="warning" shape="circle" plain plainFill size="mini" text="会员专属"></u-tag>
            </view>
            {{service.name}}
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
      this.$refs.mxList.reload();
    },
  }
};
</script>

<style lang="scss">

</style>