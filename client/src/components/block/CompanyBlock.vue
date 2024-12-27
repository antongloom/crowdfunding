<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { getDedline } from '@/composables/time.ts'
import { useRouter } from 'vue-router';
import { RouteNames } from '../../router'
import { getCount } from '@/composables/count'
import useCrowfunding from '@/store/crowfunding'




type TProps = {
  width?: number,
  heightImage?: number,
  isActiveBlock: boolean,
  data: any
}

const props = defineProps<TProps>()
const router = useRouter()
const crowfundingStore = useCrowfunding()


const handleClick = () => {
  if (props.isActiveBlock) {
    router.push({ name: RouteNames.INFO, params: { id: props?.data?.id } })
  }
}

// Копирования

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

const money = ref()
const sendMoney = () => {
  crowfundingStore.sendMoney(props?.data?.currentid, `${money.value}`)
  money.value = ''
}

const toEth = (donators: any) => {
  return donators && getCount(donators)
}


</script>


<template lang="pug">
v-card.mb-4(
  :width="props?.width"
)
  div(
    @click="handleClick"
    :style="{'cursor': props.isActiveBlock ? 'pointer' : 'default'}"
  )
    v-img(
      :aspect-ratio="1"
      :height="props.heightImage"
      cover
      :src="props?.data?.image"
    )
    v-card-title {{ props?.data?.title }}
    v-card-text {{ props?.data?.description }}
    .d-flex.py-3.justify-space-between
      div
        v-list-item {{ props?.data?.donators ? toEth(props?.data?.donators) : 0 }} ETH
          v-list-item-subtitle Необходимое кол-во: {{ props?.data?.target }} ETH
      div
        v-list-item {{ getDedline(props?.data?.deadline) }}
          v-list-item-subtitle Дествительно до даты
    div(v-if="!props.isActiveBlock")
      v-divider
      v-card-actions
        .d-flex.align-center
          v-text-field.mt-4.ml-2(
            width="350"
            v-model="money"
            label="Отправить деньги (Пример: 0.00001 ETH)"
            density="compact"
            variant="outlined"
          )
          v-btn.ml-3.mb-1(
            @click="sendMoney"
            variant="flat"
            color="primary"
            height="39"
            :disabled="!money"
          ) Отправить
</template>

<style lang="less" scoped>
.owner-text {
  font-size: 12px;
}
</style>