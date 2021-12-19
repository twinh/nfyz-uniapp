import $, {Ret} from 'miaoxing';

const NOT_FOUND = 404;
const UNAUTHORIZED_CODE = 401;

/**
 * 1. 将 HTTP 状态错误转换为请求错误
 * 2. 默认增加 Accept 头，让接口优先返回 JSON 数据（同 axios）
 * 3. 增加 `loading` 选项，控制请求时是否显示加载中的提示 (H5 暂不支持)
 *
 * @param urlOrConfig
 * @param config
 * @returns {Promise<T>}
 */
$.http = async (urlOrConfig, config) => {
  let conf;
  if (typeof urlOrConfig === 'string') {
    conf = config || {};
    conf.url = urlOrConfig;
  } else {
    conf = urlOrConfig;
  }

  // @internal 用于发送请求前执行登录操作
  // if (conf.skipBeforeEvent !== true && onBeforeHttp) {
  //   await onBeforeHttp();
  // }

  const {header = {}, loading, complete, ignoreError, ...rest} = conf;

  // 小程序不支持 PATCH，通过 header 传输给后台
  if (rest.method?.toUpperCase() === 'PATCH') {
    rest.method = 'POST';
    header['X-HTTP-Method-Override'] = 'PATCH';
  }

  // 让接口优先返回 JSON 数据
  if (!header.Accept) {
    header.Accept = 'application/json, text/plain, */*';
  }

  // 如果有 token，附加到请求中
  const token = uni.getStorageSync('token');
  if (token) {
    header.Authorization = 'Bearer ' + token;
  }

  if (loading) {
    uni.showLoading();
  }

  uni.showNavigationBarLoading();

  return new Promise((resolve, reject) => {
    return uni
      .request({
        ...rest,
        header,
        success: res => {
          // 将 HTTP 状态错误转换为请求错误
          const isSuccess = res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 304;
          if (!isSuccess) {

            if (!ignoreError) {
              $.err(res.statusCode === NOT_FOUND ? '很抱歉，您访问的页面不存在，请检查后再试' : '很抱歉，请求出错，请稍后再试');
            }

            return reject({
              errMsg: res.statusCode,
              res: res,
            });
          }

          // 未登录，跳转到登录地址
          if (typeof res.data.code !== 'undefined' && res.data.code === UNAUTHORIZED_CODE) {
            uni.removeStorageSync('token');
          }

          res.ret = new Ret(res.data);

          resolve(res);
        },
        complete: () => {
          loading && uni.hideLoading();
          uni.hideNavigationBarLoading();
          complete && complete();
        },
      });
  });
};