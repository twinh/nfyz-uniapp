<template>
  <view>
    <mx-list
        ref="serviceList"
        url="admin-services"
    >
      <template v-slot="{data}">
        <navigator
            v-for="service in data"
            :url="'/pages/admin/user-services/index?serviceId=' + service.id"
            :key="service.id"
            m="20" py="40" px="30" bgWhite toBetween toCenterY rounded="16"
        >
          <view toBetween column>
            <view text="36">{{service.name}}</view>
            <view text="24" color="#999" mt2>
              <template v-if="service.startDate && service.endDate">
                {{ service.startDate }}至{{ service.endDate }}
              </template>
              <template v-else-if="service.startDate">
                {{ service.startDate }}开始
              </template>
              <template v-else-if="service.endDate">
                {{ service.endDate }}结束
              </template>
              <template v-else>
                时间不限
              </template>
            </view>
          </view>
          <view>
            <button class="btn-sm">已申请：{{service.applyCount}}</button>
          </view>
        </navigator>
      </template>
    </mx-list>
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
      this.$refs.serviceList && this.$refs.serviceList.reload();
    },
  },
};
</script>

<style scoped>

</style>