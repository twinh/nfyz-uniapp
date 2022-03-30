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

    <u-form
        labelWidth="64"
    >
      <view bgWhite m="20" rounded="16" pl8>
        <u-form-item
            label="姓名"
        >
          <u-input
              v-model="data.name"
              border="none"
              placeholder="请输入您的姓名"
          ></u-input>
        </u-form-item>
      </view>

      <view bgWhite m="20" rounded="16" pl8>
        <u-form-item
            label="手机号"
        >
          <button class="btn-none btn-input" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
              :style="{color: data.mobile ? '#303133' : '#c0c4cc'}"
          >
            {{ data.mobile || '请授权您的手机号' }}
          </button>
        </u-form-item>
      </view>

      <view bgWhite m="20" rounded="16" pl8>
        <u-form-item
            label="身份证"
        >
          <u-input
              type="idcard"
              v-model="data.idCard"
              border="none"
              placeholder="请输入您的身份证"
          ></u-input>
        </u-form-item>
      </view>

      <view @click="showJobType = true" bgWhite m="20" rounded="16" pl8>
        <u-form-item
            label="类别"
        >
          <view :style="{color: jobTypeName ? '#000' : '#c0c4cc'}">
            {{ jobTypeName || '请选择您的类别' }}
          </view>
        </u-form-item>
        <u-picker :show="showJobType" :columns="jobTypeColumns" keyName="name" closeOnClickOverlay
            @confirm="handleConfirmJobType" @cancel="showJobType = false" @close="showJobType = false">
        </u-picker>
      </view>

      <view v-if="data.jobType === 3" bgWhite m="20" rounded="16" pl8>
        <u-form-item
            label="职业"
        >
          <u-input
              placeholder="请输入您的职业"
              border="none"
              v-model="data.jobName"
          >
            <view slot="suffix" @click="showJobName = true" mr="20" color="#0091FF">
              选择
            </view>
          </u-input>
        </u-form-item>
        <u-picker
            :show="showJobName"
            :columns="jobNameColumns"
            closeOnClickOverlay
            @confirm="handleConfirmJobName"
            @cancel="showJobName = false"
            @close="showJobName = false">
        </u-picker>
      </view>

      <view m="20" flex>
        <view bgWhite rounded="16" flex="1" toCenter>
          <u-upload
              :fileList="fileList1"
              name="1"
              :maxCount="1"
              @afterRead="afterRead"
              @delete="deletePic"
              width="100"
              height="100"
          >
            <view toCenter column>
              <image w="61" src="/static/camera.png" mode="widthFix"/>
              <view mt="16" color="#ccc">点击上传照片</view>
            </view>
          </u-upload>
        </view>
        <view ml="20" bgWhite rounded="16" flex="1">
          <view p="32" toCenter column>
            <image w="116" src="/static/face.png" mode="widthFix"/>
            <view mt="16" text="24" color="#ccc">正确示例：五官清晰</view>
          </view>
        </view>
      </view>
      <view m="75">
        <button class="btn" @click="handleClick">提交</button>
      </view>
    </u-form>
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      fileList1: [],
      data: {
        stationId: '',
        name: '',
        mobile: '',
        faceUrl: '',
        idCard: '',
        jobType: '',
        jobName: '',
        user: {
          
        },
      },

      showJobType: false,
      jobTypeColumns: [
        [
          {
            name: '群众',
            value: 1,
          },
          {
            name: '工作人员',
            value: 2,
          },
          {
            name: '灵活就业人员',
            value: 3,
          },
        ],
      ],

      showJobName: false,
      jobNameColumns: [
        [
          '骑手',
          '快递员',
          '网约车司机',
          '环卫工人',
        ],
      ],
    };
  },
  computed: {
    jobTypeName() {
      const jobTypeColumn = this.jobTypeColumns[0].find(jobTypeColumn => {
        return jobTypeColumn.value === this.data.jobType;
      });
      return jobTypeColumn?.name;
    },
  },
  mounted() {
    this.data.stationId = uni.getStorageSync('stationId');

    $.http({
      url: 'access-member',
      loading: true,
    }).then(({ret}) => {
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }

      const user = ret.data.user;
      this.data.name = user.name;
      this.data.mobile = user.mobile;
      this.data.idCard = ret.data.idCard;
      this.data.jobType = ret.data.jobType;
      this.data.jobName = ret.data.jobName;
      this.data.user = ret.data.user;

      if (ret.data.faceUrl) {
        this.data.faceUrl = ret.data.faceUrl;
        this.fileList1.push({
          status: 'success',
          message: '',
          url: ret.data.faceUrl,
        });
      }
    });
  },
  methods: {
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
    handleConfirmJobType(e) {
      this.data.jobType = e.value[0].value;
      this.showJobType = false;
    },
    handleConfirmJobName(e) {
      this.data.jobName = e.value[0];
      this.showJobName = false;
    },
    async handleClick() {
      const {ret} = await $.patch({
        url: 'access-member',
        data: this.data,
        loading: true,
      });
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }

      await $.ret(ret);
      uni.redirectTo({
        url: '/pages/index/index',
      });
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
      this.data.faceUrl = '';
    },
    // 新增图片
    async afterRead(event) {
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].thumb);
        if (result) {
          this.data.faceUrl = result;
          let item = this[`fileList${event.name}`][fileListLen];
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result,
          }));
        } else {
          // 上传失败清空图片，方便重新上传
          this[`fileList${event.name}`] = [];
        }
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.showLoading();
        uni.uploadFile({
          url: getApp().globalData.baseApiUrl + 'access-member/face',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token'),
          },
          filePath: url,
          name: 'file',
          success(res) {
            const ret = JSON.parse(res.data);
            if (ret.code !== 0) {
              $.alert(ret.message);
              resolve('');
              return;
            }
            resolve(ret.data.url);
          },
          complete() {
            uni.hideLoading();
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.btn-input {
  margin: 0;
  line-height: 1;
  text-align: left;
}

.u-form-item__body {
  padding: 24rpx 0 !important;
}

.u-form-item__body__left__content__label {
  height: 24px;
}

.u-upload {
  flex: none !important;
}

.u-upload__wrap__preview {
  margin: 0 !important;
}
</style>
