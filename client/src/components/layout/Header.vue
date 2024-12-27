<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouteNames } from '@/router'
import ModalCompany from '@/components/modal/ModalCompany.vue'


const route = useRoute()
const router = useRouter()

const mapRouterArrow: string[] = [RouteNames.INFO]
const isArrow = computed(() => typeof route.name === 'string' && mapRouterArrow.includes(route.name))
const goBack = () => (router.go(-1))

const getHeaderTitle = (routeName: RouteNames): string => {
  switch (routeName) {
    case RouteNames.COMPANY:
      return 'Компании'
    case RouteNames.STATISTICS:
      return 'Статистика'
    case RouteNames.INFO:
      return 'Информация о компании'
    default:
      return ''
  }
}

const createCompany = () => {
  console.log('dsfsdf')
}

</script>

<template lang="pug">
.header
  v-toolbar(
    color="primary"
    permanent
    fixed 
    app
    density="compact"
    :style="{'left': '250px'}"
  )
    v-toolbar-title
      .header__title
        .d-flex.align-center
          v-btn.mr-4(
            v-if="isArrow"
            density="comfortable"
            icon="mdi-arrow-left-thick"
            @click="goBack"
          )
          h3 {{ getHeaderTitle(route.name) }}
        v-spacer
        .mr-6
          modal-company
        
</template>
<style lang="less" scoped>
.header {
  &__title {
    margin-right: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>