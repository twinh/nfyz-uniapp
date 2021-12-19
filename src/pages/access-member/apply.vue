<template>
  <view>
    <view bgWhite m="20" p="32" rounded="16" flex>
      <view w="144" h="144" rounded="100%" overflow="hidden">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view toCenterY ml12>
        <oepn-data type="userNickName">用户昵称</oepn-data>
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
          readonly
      >
        <image w="42" ml="20" mr="12" slot="prefix" src="/static/input-mobile.png" mode="widthFix"/>
        <button class="btn-none" slot="suffix" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" mr5
            color="#0091FF">
          一键获取
        </button>
      </u-input>
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
  </view>
</template>

<script>
import $ from 'miaoxing';

export default {
  data() {
    return {
      fileList1: [],
      data: {
        name: '',
        mobile: '',
        faceUrl: '',
      },
    };
  },
  mounted() {
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
    async handleClick() {
      const {ret} = await $.patch({
        url: 'access-member',
        data: this.data,
      });
      if (ret.isErr()) {
        $.ret(ret);
        return;
      }
      
      await $.ret(ret);
      uni.redirectTo({
        url: '/pages/index/index'
      });
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
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
        this.data.faceUrl = result;
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result,
        }));
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.uploadFile({
          url: getApp().globalData.baseApiUrl + 'access-member/face',
          header: {
            Authorization: 'Bearer ' + uni.getStorageSync('token'),
          },
          filePath: url,
          name: 'file',
          success(res) {
            const data = JSON.parse(res.data);
            resolve(data.data.url);
          },
        });
      });
    },
  },
};
</script>

<style lang="scss">
.u-upload {
  flex: none !important;
}

.u-upload__wrap__preview {
  margin: 0 !important;
}

.btn-none {
  background: none;

  &::after {
    border: 0;
  }
}
</style>