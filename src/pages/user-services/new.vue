<template>
  <view>
    <u-form
        labelPosition="top"
        labelWidth="auto"
        :model="answers"
        ref="form"
    >
      <view v-for="question in data.questions" :key="question.id">
        <view v-if="question.type === 1" m="20" px="20" py="6" bgWhite rounded="16">
          <u-form-item
              :label="question.title"
              :required="question.isRequired"
          >
            <u-input
                v-model="answers[question.id]"
                border="none"
                placeholder="请输入"
            ></u-input>
          </u-form-item>
        </view>

        <view v-else-if="question.type === 2" m="20" px="20" py="6" bgWhite rounded="16">
          <u-form-item
              :label="question.title"
              :required="question.isRequired"
          >
            <u-textarea
                v-model="answers[question.id]"
                border="none"U
                disableDefaultPadding
                placeholder="请输入"
            ></u-textarea>
          </u-form-item>
        </view>

        <view v-else-if="question.type === 3" m="20" px="20" py="6" bgWhite rounded="16">
          <u-form-item
              :label="question.title"
              :required="question.isRequired"
          >
            <view mt="20">
              <u-radio-group
                  v-model="answers[question.id]"
                  placement="column"
                  activeColor="black"
              >
                <view v-for="option in question.options" pb="24" :key="option.label">
                  <u-radio :label="option.label" :name="option.label"></u-radio>
                </view>
              </u-radio-group>
            </view>
          </u-form-item>
        </view>

        <view v-else-if="question.type === 4" m="20" px="20" py="6" bgWhite rounded="16">
          <u-form-item
              :label="question.title"
              :required="question.isRequired"
          >
            <view mt="20">
              <u-checkbox-group
                  v-model="answers[question.id]"
                  placement="column"
                  activeColor="black"
              >
                <view v-for="option in question.options" pb="24" :key="option.label">
                  <u-checkbox :label="option.label" :name="option.label"></u-checkbox>
                </view>
              </u-checkbox-group>
            </view>
        </view>
      </view>
      <view m="75">
        <button class="btn" @click="handleClick">提交申请</button>
      </view>
    </u-form>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      data: {
        questions: [],
      },
      answers: {},
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      $.http({
        url: 'services/' + ($.req('id') || '40758145248178372'),
      }).then(({ret}) => {
        if (ret.isErr()) {
          $.ret(ret);
          return;
        }

        this.data = ret.data;
      });
    },
    handleClick() {
      for (const i in this.data.questions) {
        const question = this.data.questions[i];
        if (question.isRequired
            && (!this.answers[question.id] || this.answers[question.id].length === 0)
        ) {
          $.err(`请填写"${question.title}"`);
          return;
        }
      }
      
      $.post({
        url: 'user-services',
        data: {
          serviceId: this.data.id,
          answers: this.answers
        },
      }).then(({ret}) => {
        $.ret(ret).suc(() => {
          uni.navigateBack();
        });
      });
    },
  },
};
</script>

<style lang="scss">
.u-textarea {
  padding: 0 !important;
}

.u-form-item__body__left__content__required {
  position: static !important;
  font-size: 32rpx !important;
  padding-right: 4px;
}
</style>