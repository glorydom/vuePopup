<template>
  <div>
   <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <div>
    <span>
      <date></date>
    </span>
  </div>
  </div>
</template>

<script>
import date from './Date'
export default {
  name: "myheader",
  components: {
    date
  },
  data() {
    return {
      NavicatorList: ["home", "About", "Services", "Contact"]
    };
  }
};
</script>

<style>

</style>
