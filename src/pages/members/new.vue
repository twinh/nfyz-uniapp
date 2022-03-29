<template>
  <view>
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <image w="100%" h="100%" :src="data.user.avatar"/>
      </view>
      <view toCenterY ml12>
        <view text="36">{{data.user.nickName}}</view>
      </view>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <u-input
          placeholder="请输入您的姓名"
          border="none"
          v-model="data.name"
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-name.png" mode="widthFix"/>
      </u-input>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-mobile.png" mode="widthFix"/>
      <button class="btn-none btn-input" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
          :style="{color: data.mobile ? '#303133' : '#c0c4cc'}"
      >
        {{data.mobile || '请授权您的手机号'}}
      </button>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <u-input
          placeholder="请输入您的工号"
          border="none"
          v-model="data.no"
      >
        <image w="42" ml="22" mr="12" slot="prefix" src="/static/input-no.png" mode="widthFix"/>
        <view @click="handleClickTag" slot="suffix" mr5 color="#f56c6c">
          加入工会享受福利
        </view>
      </u-input>
    </view>
    <view m="75">
      <button class="btn" @click="handleClick">提交</button>
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      data: {
        name: '',
        no: '',
        user: {
          avatar: '',
          nickName: '',
        },
      },
    };
  },
  mounted() {
    $.http({
      url: 'member',
      loading: true,
    }).then(({ret}) => {
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }

      ret.data.id && uni.setNavigationBarTitle({title: '更新会员资料'});
      this.data = ret.data;
    });
  },
  methods: {
    handleClickTag() {
      uni.navigateToMiniProgram({
        appId: 'wxb7a23c5650537af6',
      });
    },

    async getPhoneNumber(e) {
      if (!e.detail.iv) {
        return;
      }

      const {ret} = await $.patch({
        url: 'wechat-mp-mobile',
        data: e.detail,
      });
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }
      this.data.mobile = ret.mobile;
    },
    async handleClick() {
      const {ret} = await $.patch({
        url: 'member',
        loading: true,
        data: this.data,
      });
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }

      await $.ret(ret);

      if ($.req('fromService')) {
        uni.setStorageSync('fromMember', '1');
      }
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
</style>