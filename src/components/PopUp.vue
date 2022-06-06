<template>
   <b-alert
      :show="popUpShow"
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      v-text="popUpText"
    >
    </b-alert>
</template>

<script>
export default {
  name: "PopUpComponent",
  props:{
    visible: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      popUpShow: this.visible,
      popUpText: this.text
    };
  },
  watch: {
    visible() {
      this.visible ? this.popUpShow = 2 : this.popUpShow = 0;
    },
    text() {
      this.popUpText = this.text
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style>
</style>