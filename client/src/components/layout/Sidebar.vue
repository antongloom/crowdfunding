<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouteNames } from '@/router'
const route = useRoute()

const itemsMenu = computed(() => {
  return [
    { icon: 'mdi-domain', title: 'Компании', route: RouteNames.COMPANY },
    { icon: 'mdi-chart-pie', title: 'Статистика', route: RouteNames.STATISTICS },
    // { icon: 'mdi-chart-pie', title: 'Test', route: RouteNames.TEST }
  ]
})

</script>

<template lang="pug">
v-navigation-drawer(color='primary' permanent width="250")
  template(v-slot:prepend)
    .d-flex.align-center.px-3.py-3
      .block-image
        img(src="@/assets/images/crowdfunding.webp" width="70" height="70" alt="Crowdfunding")
      h3.ml-2 Crowdfunding
  v-divider
  v-list
    v-list-item(
      v-for='(item, index) in itemsMenu'
      :key='index'
      :title="item.title"
      :prepend-icon='item.icon'
      :style="{'textTransform': 'uppercase'}"
      router :to="{name: item.route}"
    )
</template>

<style lang="less" scoped>
.block-image {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  overflow: hidden;
}
</style>