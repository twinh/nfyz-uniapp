<template>
  <title-one :conf="titleConf" @titleIcon="handleClickIcon"></title-one>
</template>

<script>
import TitleOne from "@/components/title-one";

export default {
  components: {
    TitleOne,
  },
  props: {
    title: String,
    bg: {
      type: Boolean,
      default: true,
    },
    useConfigTitle: {
      type: Boolean,
      default: false,
    },
    conf: {
      type: Object,
    },
  },
  data() {
    return {
      configTitle: '',
    }
  },
  computed: {
    titleConf() {
      const isBack = getCurrentPages().length > 1;
      return {
        //icon: isBack ? '/static/icon/back.png' : '/static/icon/home2.png',
        iconStyle: isBack ? {width: '14rpx', height: '25rpx', marginLeft: 0} : {marginLeft: 0},
        title: this.title || this.configTitle,
        place: true,
        scrollTop: 0,
        scope: 30,
        method: true,
        defaultStyle: this.bg ? {
          background: 'url("https://cdn-rabbit-file.apkevery.com/up/16357314442f1e43a2446dd0369321.jpg")',
          backgroundSize: 'cover',
          color: '#fff',
        } : {
          background: '#F8B500',
          color: '#fff',
        },
        ...this.conf,
      };
    },
  },
  created() {
    if (this.useConfigTitle) {
      this.$app_api({
        url: 'mallConfig',
      }).then(res => {
        this.configTitle = res.name;
      });
    }
  },
  methods: {
    handleClickIcon() {
      if (getCurrentPages().length > 1) {
        uni.navigateBack();
      } else {
        uni.navigateTo({
          url: '/pages/index/index',
        });
      }
    },
  },
};
</script>