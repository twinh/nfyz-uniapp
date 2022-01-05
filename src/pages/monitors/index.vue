<template>
  <view>
    <view bgWhite m="20" rounded="16" pl8>
      <u-form label-width="80">
        <u-form-item
            label="街道驿站"
        >
          <picker mode="multiSelector" @change="handleChange" @columnchange="handleColumnChange"
              :value="[streetIndex, stationIndex]"
              :range="[streets, stations]"
              range-key="name"
          >
            <view class="picker">
              <view :style="{color: selectName ? '#000' : '#c0c4cc'}">
                {{ selectName ? selectName : '请选择' }}
              </view>
            </view>
          </picker>

        </u-form-item>
      </u-form>
    </view>

    <MxList
        ref="list"
        url="monitors"
        :query="{streetId, stationId}"
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
    selectName() {
      let name = '';
      if (this.streetIndex) {
        name += this.streets[this.streetIndex]?.name;
      }

      if (this.stationIndex) {
        name += '，' + this.streets[this.streetIndex].stations[this.stationIndex]?.name;
      }

      return name;
    },
  },
  data() {
    return {
      streetId: '',
      streetIndex: 0,
      streets: [],

      stationId: '',
      stationIndex: 0,
      stations: [],
    };
  },
  onShow() {
    this.getData();

    $.http({
      url: 'admin-streets',
    }).then(({ret}) => {
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }

      this.streets = [{id: 0, name: '全部', stations: []}].concat(ret.data.map(street => {
        street.stations.unshift({id: 0, name: '全部', stations: []});
        return street;
      }));
    });
  },
  methods: {
    handleChange: function (e) {
      this.streetIndex = e.detail.value[0];
      this.streetId = this.streets[this.streetIndex].id;
      
      this.stationIndex = e.detail.value[1];
      this.stationId = this.streets[this.streetIndex].stations[this.stationIndex]?.id;

      this.getData();
    },
    handleColumnChange: function (e) {
      if (e.detail.column === 0) {
        this.stations = this.streets[e.detail.value].stations;
      }
    },
    getData() {
      this.$refs.list.reload();
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