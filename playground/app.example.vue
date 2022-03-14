<template>
  <div class="play-container">
    <h1>Hello, Element Plus! <ElementPlus class="icon" /></h1>
  </div>
</template>

<script setup lang="ts">
import { ElementPlus } from '@element-plus/icons-vue'
// code here
</script>

<style lang="scss" scoped>
.play-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  color: #409eff;
}
</style>
