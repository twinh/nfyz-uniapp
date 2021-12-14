export const api = (options) => {
  const addr = getApp().globalData.addr;
  const url = options.url;

  const {header = {}} = options;

  // 小程序不支持 PATCH，通过 header 传输给后台
  if (options.method?.toUpperCase() === 'PATCH') {
    options.method = 'POST';
    header['X-HTTP-Method-Override'] = 'PATCH';
  }

  // 如果有 token，附加到请求中
  const token = uni.getStorageSync('token');
  if (token) {
    header.Authorization = 'Bearer ' + token;
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: addr + url,
      method: options.method || 'GET',
      data: options.data,
      header,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
        if (!options.noToast) {
          uni.showToast({
            icon: 'none',
            title: '请求错误',
            duration: 2000,
          });
        }
      },
    });
  });
};