<template>
  <div class="app-container">
    <div class="warn-content">
      <div class="box">
        <img :src="img_guide" alt="">
      </div>

      <p class="text_box">
        {{$t('guide.description')}}
        <a href="https://github.com/kamranahmedse/driver.js" target="_blank">
        </a>
      </p>

      <div class="box"><el-button icon='el-icon-question' type="primary" @click.prevent.stop="guide">{{$t('guide.button')}}</el-button></div>
    </div>

  </div>
</template>

<script>
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'
import img_guide from '@/assets/guide_images/guide.gif'

export default {
  name: 'guide',
  data() {
    return {
      driver: null,
      img_guide
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    background-color: #e3e3e3;
    height:calc(100vh - 50px);
  }
  .box img{
    max-width: 100%;
  }


  .box{
      width: 70%;
      text-align: center;
      margin: 0 auto;
  }

  .text_box{
    text-align: center;
  }

</style>
