<template>
  <view>
    <u-form
        labelPosition="left"
        :model="data"
        ref="form"
    >
      <view m="20" px="20" py="6" bgWhite rounded="16">
        <u-form-item
            label="姓名"
            prop="name"
            ref="item1"
        >
          <u-input
              v-model="data.name"
              border="none"
              placeholder="请输入姓名"
          ></u-input>
        </u-form-item>
      </view>

      <view m="20" px="20" py="6" bgWhite rounded="16">
        <u-form-item
            label="申请理由"
            prop="name2"
            ref="item1"
        >
          <u-textarea v-model="data.name2" placeholder="请输入申请理由" border="none" disableDefaultPadding></u-textarea>
        </u-form-item>
      </view>

      <view m="20" px="20" py="6" bgWhite rounded="16">
        <u-form-item
            label="是否携带家属"
            labelWidth="250"
            prop="name2"
            ref="item1"
        >
          <view toRight>
            <u-checkbox-group activeColor="black">
              <u-checkbox>是</u-checkbox>
            </u-checkbox-group>
          </view>
        </u-form-item>
      </view>

      <view m="20" px="20" py="6" bgWhite rounded="16">
        <view mb="10">
          <u-form-item
              labelWidth="250"
              label="请选择携带家属人数"
              prop="name2"
              ref="item1"
          ></u-form-item>
        </view>
        <u-radio-group
            v-model="value"
            placement="column"
            borderBottom
            activeColor="black"
        >
          <view pb="20">
            <u-radio label="1人"></u-radio>
          </view>
          <view pb="20">
            <u-radio label="2人"></u-radio>
          </view>
          <view pb="20">
            <u-radio label="3人"></u-radio>
          </view>
          <view pb="20">
            <u-radio label="超过3人"></u-radio>
          </view>
        </u-radio-group>
      </view>
      <view m="75">
        <button class="btn" style="opacity: .3">开发中</button>
      </view>
    </u-form>
  </view>
</template>

<script>
export default {
  name: "new",
  data() {
    return {
      data: {},
    };
  },
};
</script>

<style scoped>

</style>