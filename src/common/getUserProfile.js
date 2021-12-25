import $ from 'miaoxing';

export default (next) => {
  uni.getUserProfile({
    desc: '用于完善会员资料',
    success: (res) => {
      $.http({
        url: 'wechat-mp/user',
        method: 'PATCH',
        data: res.userInfo,
        loading: true,
      }).then(({ret}) => {
        if (ret.isErr()) {
          $.ret(ret);
          return;
        }

        next();
      });
    },
  });
};