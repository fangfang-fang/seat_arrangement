<template>
<!--  <el-progress type="dashboard" :percentage="percentage" :width="80">-->
<!--    <template #default="{ percentage }">-->
<!--      <span class="percentage-value">{{ percentage }}%</span>-->
<!--    </template>-->
<!--  </el-progress>-->
<!--  <el-image style="width: 36px; height: 36px" src='../../assets/canzhuo.jpg' />-->
  <img src="../../assets/canzhuo.jpg"/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressNode',
  inject: ['getNode'],
  data() {
    return {
      percentage: 80,
    }
  },
  mounted() {
    const node = this.getNode()
  },
})
</script>
