<script setup lang="ts">
import { onMounted } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'


</script>

<template lang="pug">
.main
  Sidebar
  Header
  .main__content
    .main__container
      slot
</template>
<style lang="less">
.main {
  &__content {
    margin-left: 250px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  &__container {
    width: 100%;
  }
}
</style>
