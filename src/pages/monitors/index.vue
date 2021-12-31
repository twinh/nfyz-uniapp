<template>
  <view>
    <view @click="showStreet = true" bgWhite m="20" rounded="16" pl8>
      <u-form
          labelWidth="80"
      >
        <u-form-item
            label="选择街道"
        >
          <view :style="{color: streetId ? '#000' : '#c0c4cc'}">
            {{ streetId ? streetName : '请选择街道' }}
          </view>
        </u-form-item>
        <u-picker :show="showStreet" :columns="streetColumns" keyName="name" closeOnClickOverlay
            @confirm="handleConfirmStreet" @cancel="showStreet = false" @close="showStreet = false">
        </u-picker>
      </u-form>
    </view>
    
    <MxList
        ref="list"
        url="monitors"
        :query="{streetId}"
    >
      <template v-slot="{data}">
        <navigator
            :url="'/pages/monitors/detail?id=' + monitor.id"
            v-for="monitor in data"
            :key="monitor.id"
            m="20" h="386" relative bgWhite rounded="22" overflow="hidden" class="monitor-item"
        >
          <view absolute bottom="0" right="0" left="0" bg="rgba(0, 0, 0, 0.28)" toBetween toCenterY px="40" py="20">
            <view white>{{ monitor.name }}</view>
            <button class="btn-sm">查看监控</button>
          </view>
        </navigator>
      </template>
    </MxList>
  </view>
</template>

<script>
import MxList from '@/components/mx-list';
import $ from 'miaoxing';

export default {
  components: {
    MxList,
  },
  computed: {
    streetName() {
      const streetColumn = this.streetColumns[0].find(streetColumn => {
        return streetColumn.id === this.streetId;
      });
      return streetColumn?.name;
    },
  },
  data() {
    return { 
      streetId: '',
      showStreet: false,
      streetColumns: [
        [
          {
            id: '',
            name: '全部',
          },
        ],
      ],
    }
  },
  onShow() {
    this.getData();

    $.http({
      url: 'streets',
    }).then(({ret}) => {
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }
      this.streetColumns[0] = this.streetColumns[0].concat(ret.data);
    });
  },
  methods: {
    getData() {
      this.$refs.list.reload();
    },
    handleConfirmStreet(e) {
      this.streetId = e.value[0].id;
      this.showStreet = false;
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.monitor-item {
  background: url("https://image-10001577.image.myqcloud.com/uploads/10/20211219/16399198001857.png");
  background-size: cover;
}
</style>