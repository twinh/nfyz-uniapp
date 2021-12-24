<template>
  <view pb="132">
    <view>
      <image w="100%" :src="data.cover" mode="widthFix"/>
    </view>
    <view relative m="20" bgWhite rounded="40" mt="-100" px="30" py="25">
      <view text="40" py="20">
        <view v-if="data.isMember" mr4 inlineBlock>
          <u-tag type="warning" shape="circle" plain plainFill text="会员专属"></u-tag>
        </view>
        {{ data.name || '' }}
      </view>
      <view v-if="data.startDate && data.endDate" flex py="25" toCenterY class="u-border-bottom">
        <image w="36" src="/static/time.png" mode="widthFix"/>
        <view color="#999" ml="8">服务时间</view>
        <view ml="32">
          <template v-if="data.startDate && data.endDate">
            {{ data.startDate }}至{{ data.endDate }}
          </template>
          <template v-else-if="data.startDate">
            {{ data.startDate }}开始
          </template>
          <template v-else>
            {{ data.endDate }}结束
          </template>
        </view>
      </view>
      <view v-if="data.address" flex py="25" toCenterY class="u-border-bottom">
        <image w="36" src="/static/address.png" mode="widthFix"/>
        <view color="#999" ml="8">服务地点</view>
        <view ml="32">{{ data.address }}</view>
      </view>
      <view v-if="data.phone" flex py="25" toCenterY>
        <image w="36" src="/static/phone.png" mode="widthFix"/>
        <view color="#999" ml="8">联系电话</view>
        <view ml="32">{{ data.phone }}</view>
      </view>
    </view>

    <view v-if="userService.id" m="20" bgWhite rounded="16" color="#999" p="40" pb0>
      <view mb="40">申请内容</view>
      <view>
        <view 
            v-for="(answer, index) in userService.answers" 
            :key="answer.id"
            pb="40"
            flex
            color="#666"
        >
          <view v-if="answer.question" w="45">
            {{index + 1}}.
          </view>
          <view>
            <view mb2>
              {{answer.question.title}}
            </view>
            <view color="#000">
              {{Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer}}
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view m="20" bgWhite rounded="16" color="#999" p="40">
      <view mb="40">服务详情</view>
      <u-parse :content="data.description"></u-parse>
    </view>
    <view fixed bottom="0" w="100%" bgWhite class="footer">
      <button v-if="data.apply.code === 0" @click="handleClick" class="btn" my="20" mx="75">我要申请</button>
      <button v-else class="btn" my="20" mx="75" disabled>{{data.apply.shortMessage}}</button>
    </view>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      data: {
        apply: {},
      },
      userService: {},
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      const id = $.req('id') || '40758145248178372';
      
      $.http({
        url: 'services/' + id,
      }).then(({ret}) => {
        if (ret.isErr()) {
          $.ret(ret);
          return;
        }

        this.data = ret.data;
      });
      
      $.http({
        url: 'user-service?serviceId=' + id,
      }).then(({ret}) => {
        this.userService = ret.data;
      });
      
      $.post({
        url: 'services/' + id + '/view'
      });
    },
    handleClick() {
      if (this.data.type === 1) {
        uni.navigateTo({
          url: '/pages/user-services/new?serviceId=' + this.data.id,
        });
        return;
      }

      uni.navigateToMiniProgram({
        appId: this.data.navigateAppId,
        path: this.data.navigatePath,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  box-shadow: 8rpx -2rpx 10rpx 0 rgba(112, 112, 112, 0.50);
}
</style>