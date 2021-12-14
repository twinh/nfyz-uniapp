const msg = {};

msg.err = (msg) => {
  uni.showToast({
    title: msg,
    duration: 3000,
    icon: 'none',
  });
};

msg.suc = (msg) => {
  uni.showToast({
    title: msg,
    duration: 3000,
    icon: 'none',
  });
};

export default msg;