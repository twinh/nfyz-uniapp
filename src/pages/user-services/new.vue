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
                border="none"
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
          </u-form-item>
        </view>

        <view v-else-if="question.type === 6" m="20" px="20" py="6" bgWhite rounded="16">
          <u-form-item
              :label="question.title"
              :required="question.isRequired"
          >
            <view mt="20">
              <u-radio-group
                  v-model="answers[question.id]"
                  placement="column"
                  activeColor="black"
                  @change="handleGroupChange"
              >
                <view v-for="street in streets" pb="24" :key="street.id">
                  <u-radio :label="street.name" :name="street.name"></u-radio>
                </view>
              </u-radio-group>
            </view>
          </u-form-item>
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
      streets: [],
      streetId: 0,
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      $.http({
        url: 'services/' + ($.req('serviceId') || '42788380612723258'),
      }).then(({ret}) => {
        if (ret.isErr()) {
          $.ret(ret);
          return;
        }

        this.data = ret.data;
        
        for (const question of this.data.questions) {
          if (question.type !== 6) {
            continue;
          }
          $.http({
            url: 'streets',
          }).then(({ret}) => {
            if (ret.isErr()) {
              $.ret(ret);
              return;
            }
            this.streets = ret.data;
          });
          break;
        }
      });
    },
    
    handleGroupChange(streetName) {
      this.streetId = this.streets.find(street => street.name === streetName).id;
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

      uni.requestSubscribeMessage({
        tmplIds: [this.data.subscribeMessageTmplId],
        complete: () => {
          $.post({
            url: 'user-services',
            loading: true,
            data: {
              serviceId: this.data.id,
              streetId: this.streetId,
              answers: this.answers
            },
          }).then(({ret}) => {
            $.ret(ret).suc(() => {
              uni.navigateBack();
            });
          });
        }
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