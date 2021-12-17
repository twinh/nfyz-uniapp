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
            label="姓名"
            prop="name2"
            ref="item1"
        >
          <u-textarea v-model="data.name2" placeholder="请输入内容" border="none" disableDefaultPadding></u-textarea>
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
            <u-checkbox-group>
              <u-checkbox>红色</u-checkbox>
            </u-checkbox-group>
          </view>
        </u-form-item>
      </view>

      <view m="20" px="20" py="6" bgWhite rounded="16">
        <view mb="10">
          <u-form-item
              labelWidth="250"
              label="是否携带家属"
              prop="name2"
              ref="item1"
          ></u-form-item>
        </view>
        <u-radio-group
            v-model="value"
            placement="column"
            borderBottom
        >
          <view pb="20">
            <u-radio label="思悠悠，恨悠悠，恨到归时方始休"></u-radio>
          </view>
          <view pb="20">
            <u-radio label="思悠悠，恨悠悠，恨到归时方始休"></u-radio>
          </view>
          <view pb="20">
            <u-radio label="思悠悠，恨悠悠，恨到归时方始休"></u-radio>
          </view>
        </u-radio-group>
      </view>
      <view m="75">
        <button class="btn">提交</button>
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