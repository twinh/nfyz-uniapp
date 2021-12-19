<template>
  <view>
    <MxList
        ref="list"
        url="monitors"
    >
      <template v-slot="{data}">
        <navigator
            :url="'/pages/monitors/detail?id=' + monitor.id"
            v-for="monitor in data"
            :key="monitor.id"
            m="20" h="386" relative bgWhite rounded="22" overflow="hidden" class="monitor-item"
        >
          <view absolute bottom="0" right="0" left="0" bg="rgba(0, 0, 0, 0.28)" toBetween toCenterY px="40" py="20">
            <view white>{{monitor.name}}</view>
            <button class="btn-sm">查看监控</button>
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
  }
};
</script>

<style lang="scss">
.monitor-item {
  background: url("http://dev.miaoxz.com/monitor-preiview.png");
  background-size: cover;
}
</style>