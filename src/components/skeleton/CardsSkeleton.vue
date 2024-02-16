<template>
  <el-skeleton :loading="loading" animated :count="skeletonItemsCount" :throttle="throttle">
    <template #template>
      <div
        v-for="(item, index) in skeletonItems"
        :key="index"
        :style="item.style"
        class="skeleton-item"
      >
        <el-skeleton-item :variant="item.variant" />
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['loading', 'skeletonItems', 'skeletonItemsCount', 'throttle'])

const defaultSkeletonItems = [
  { variant: 'image', style: { width: '100%', height: '240px' } },
  { variant: 'h3', style: { width: '50%' } },
  { variant: 'text', style: { marginRight: '16px' } },
  { variant: 'text', style: { width: '30%' } }
]

const loading = ref(props.loading !== undefined ? props.loading : true)
const skeletonItems = props.skeletonItems !== undefined ? props.skeletonItems : defaultSkeletonItems
const skeletonItemsCount = props.skeletonItemsCount !== undefined ? props.skeletonItemsCount : 12
const throttle = props.throttle !== undefined ? props.throttle : 500
</script>

<style scoped lang="scss">
.skeleton-item {
  margin-top: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
}
</style>
