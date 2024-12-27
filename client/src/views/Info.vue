<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useCrowfunding from '@/store/crowfunding'
import CompanyBlock from '@/components/block/CompanyBlock.vue'

const route = useRoute()
const crowfundingStore = useCrowfunding()


const data = computed(() => crowfundingStore.getOneCompany)

onMounted(() => {
  crowfundingStore.getOneCompanyData(Number(route?.params?.id))
})
</script>

<template lang="pug">
v-container
  CompanyBlock(
    width="auto"
    :heightImage="400"
    :isActiveBlock="false"
    :data="data"
  )
</template>

<style lang="less" scoped>

</style>

