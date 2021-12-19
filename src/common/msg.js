import $ from 'miaoxing';

$.alert = (message, fn) => {
  return uni.showModal({
    content: message,
    showCancel: false,
    success: function () {
      fn && fn();
    },
  });
};

$.confirm = (message, fn) => {
  return uni.showModal({
    content: message,
    success: function (result) {
      fn && fn(result.confirm);
    },
  });
};

$.ret = (ret, duration = 3000, callback) => {
  uni.showToast({
    title: ret.message,
    icon: 'none',
    duration,
    success: callback,
  });

  let suc;
  let err;

  const result = new Promise(resolve => setTimeout(() => {
    if (ret.code === 0 && suc) {
      suc();
    }
    if (ret.code !== 0 && err) {
      err();
    }
    resolve();
  }, duration));

  result.suc = fn => {
    suc = fn;
    return result;
  };

  result.err = fn => {
    err = fn;
    return result;
  };

  return result;
};

$.suc = (message, duration, callback) => {
  return $.ret({code: 0, message}, duration, callback);
};

$.err = (message, duration, callback) => {
  return $.ret({code: 1, message}, duration, callback);
};

$.loading = (options = 'show') => {
  switch (options) {
    case 'show':
      return uni.showLoading({
        title: '加载中',
      });

    case 'hide':
      return uni.hideLoading();

    default:
      return uni.showLoading(options);
  }
};
