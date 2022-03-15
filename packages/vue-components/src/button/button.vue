<script setup lang="ts">
import { buttonProps } from './button'

defineProps(buttonProps)
</script>

<template>
  <button class="el-button">
    <slot />
  </button>
</template>
