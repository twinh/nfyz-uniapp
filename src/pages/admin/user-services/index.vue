<template>
  <view>
    <view bgWhite>
      <u-tabs :list="list" @click="handleClickTab" lineColor="#F8B500" :current="current"></u-tabs>
    </view>

    <view v-if="hasStreet" @click="showStreet = true" bgWhite m="20" rounded="16" pl8>
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
    
    <mx-list
        ref="userServiceList"
        url="admin-user-services"
        :query="{serviceId, status, streetId}"
    >
      <template v-slot="{data}">
        <view
            v-for="userService in data"
            :key="userService.id"
            m="20" py="40" px="30" bgWhite rounded="16"
        >
          <view mb="40">申请内容</view>
          <view v-if="userService.answers.length === 0" pb="40" color="#666">无</view>
          <view
              v-for="(answer, index) in userService.answers"
              :key="answer.id"
          >
            <view v-if="answer.question" pb="40" flex color="#666">
              <view w="45">
                {{ index + 1 }}.
              </view>
              <view>
                <view mb2>
                  {{ answer.question.title }}
                </view>
                <view color="#000">
                  {{ answer.answer }}
                </view>
              </view>
            </view>
          </view>

          <view mb="40">
            <u-line></u-line>
          </view>

          <view color="#666">
            <view text="24" mt2>申请状态：{{ userService.statusName }}</view>
            <view v-if="userService.street" text="24" mt2>所属街道：{{ userService.street.name }}</view>
            <view text="24" mt2>申请时间：{{ userService.createdAt }}</view>
            <view text="24" mt2>完成时间：{{ userService.processedAt || '-' }}</view>
          </view>

          <template v-if="userService.status === 1 || userService.status === 2">
            <view my="40">
              <u-line></u-line>
            </view>
            <view class="btn-group">
              <button v-if="userService.status === 1" @click="handleClickProcessing(userService.id)" class="btn">
                处理中
              </button>
              <button v-if="userService.status === 1 || userService.status === 2" @click="handleClickProcessed(userService.id)" class="btn btn-danger">
                已完成
              </button>
            </view>
          </template>
        </view>
      </template>
    </mx-list>
  </view>
</template>

<script>
import $ from 'miaoxing';
import MxList from '@/components/mx-list';

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
      status: '',
      current: 0,
      serviceId: '',
      list: [{
        status: '',
        name: '全部',
      }, {
        status: 1,
        name: '待处理',
      }, {
        status: 2,
        name: '处理中',
      }, {
        status: 3,
        name: '已完成',
      }],

      hasStreet: false,
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
    };
  },
  onShow() {
    this.serviceId = $.req('serviceId') || '42777373875445967';
    this.getData();
    
    $.http({
      url: 'services/' + this.serviceId,
    }).then(({ret}) => {
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }
      
      this.hasStreet = ret.data.hasStreet;
      if (ret.data.hasStreet) {
        $.http({
          url: 'streets',
        }).then(({ret}) => {
          if (ret.isErr()) {
            $.ret(ret);
            return;
          }
          this.streetColumns[0] = this.streetColumns[0].concat(ret.data);
        });
      }
    });
  },
  methods: {
    getData() {
      this.$refs.userServiceList && this.$refs.userServiceList.reload();
    }, 
    handleClickTab(item) {
      this.status = item.status;
      this.current = item.index;
      this.getData();
    },
    handleConfirmStreet(e) {
      this.streetId = e.value[0].id;
      this.showStreet = false;
      this.getData();
    },
    handleClickProcessing(id) {
      $.post({
        url: 'admin-user-services/' + id + '/processing',
        loading: true,
      }).then(({ret}) => {
        $.ret(ret).suc(() => {
          this.getData();
        });
      });
    },
    handleClickProcessed(id) {
      $.post({
        url: 'admin-user-services/' + id + '/processed',
        loading: true,
      }).then(({ret}) => {
        $.ret(ret).suc(() => {
          this.getData();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>