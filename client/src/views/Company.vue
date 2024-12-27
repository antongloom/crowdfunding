<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CompanyBlock from '@/components/block/CompanyBlock.vue'
import { useRoute } from 'vue-router'
import { RouteNames } from '@/router'
import useCrowfunding from '@/store/crowfunding'


const crowfundingStore = useCrowfunding()
const route = useRoute()


// // Копирования

const address = ref<HTMLElement | null>(null)
const copied = ref(false)

const copyText = async () => {
  try {
    if (address.value) {
      const text = address.value.textContent || ''
      await navigator.clipboard.writeText(text)
      copied.value = true

      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

onMounted(() => {
  crowfundingStore.getCompanyData()
})

</script>

<template lang="pug">
.company
  h1(v-if="crowfundingStore.getCompany.length === 0") Нет новых компаний! Добавьте компанию.
  .company__content
    div(v-for="data in crowfundingStore.getCompany" :key="data.id")
      CompanyBlock(
        width="auto"
        :heightImage="180"
        :isActiveBlock="true"
        :data="data"
      )
</template>

<style lang="less" scoped>
.company {
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
}
</style>

