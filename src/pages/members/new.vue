<template>
  <view>
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view toCenterY ml12>
        <open-data type="userNickName"></open-data>
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
      <u-input
          placeholder="请授权您的手机号"
          border="none"
          v-model="data.mobile"
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-mobile.png" mode="widthFix"/>
        <button class="btn-none" slot="suffix" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" mr5
            color="#0091FF">
          一键获取
        </button>
      </u-input>
    </view>
    <view bgWhite m="20" h="98" toCenterY rounded="16">
      <u-input
          placeholder="请输入您的工号"
          border="none"
          v-model="data.no"
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-name.png" mode="widthFix"/>
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

      const next = $.req('next');
      if (next) {
        uni.redirectTo({
          url: next,
        });
      } else {
        uni.navigateBack();
      }
    },
  },
};
</script>

<style lang="scss">
.btn-none {
  background: none;

  &::after {
    border: 0;
  }
}
</style>