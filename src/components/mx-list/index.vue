<template>
  <view>
    <slot :data="data"/>
    <u-loadmore
        v-if="data.length || loadStatus === 'loading'"
        :status="loadStatus"
        @loadmore="loadMore"
        margin-top="30"
        margin-bottom="30"
    ></u-loadmore>
    <view v-else class="list-empty">
      暂无数据
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  props: {
    url: String,
    query: {
      type: Object,
    },
    limit: {
      type: [String, Number],
      default: 10,
    },
    load: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      data: [],
      page: 0,
      loadStatus: 'loading',
    };
  },
  mounted() {
    this.load && this.loadMore();
  },
  methods: {
    loadMore() {
      this.page = this.page + 1;
      $.http({
        url: this.url,
        data: {page: this.page, limit: this.limit, ...this.query},
      }).then(({ret}) => {
        this.data = this.data.concat(ret.data);
        this.total = ret.total;

        if (this.isLastPage(ret)) {
          this.loadStatus = 'nomore';
        } else {
          this.loadStatus = 'loadmore';
        }

        this.$emit('loaded', ret);
      });
    },
    reload() {
      this.loadStatus = 'loading';
      this.page = 0;
      this.data = [];
      // 等待外部变量设置后再更新
      this.$nextTick(function () {
        this.loadMore();
      });
    },
    reachBottom() {
      if (this.loadStatus !== 'loadmore') {
        return;
      }

      this.loadStatus = 'loading';
      this.loadMore();
    },
    isLastPage: function (ret) {
      return (this.page - 1) * this.limit + ret.data.length === ret.total;
    },
  },
};
</script>

<style scoped lang="scss">
.list-empty {
  color: #5e5e5e;
  padding: 60rpx 0;
  text-align: center;
}
</style>