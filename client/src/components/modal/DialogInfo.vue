<script lang="ts" setup>
import { ref, computed } from 'vue'
import useDialogStore from '../../store/dialog'

const dialogStore = useDialogStore()


const data = computed(() => dialogStore.getDialog)
const dialog = computed(() => data.value?.form)
const closeDialog = () => { dialogStore.closeDialog() }



// const dialog = computed(() => true)

</script>

<template lang="pug">
.text-center.pa-4
  v-dialog(v-model='dialog' width='auto')
    v-card(width='500')
      template(v-slot:title)
        .d-flex
          v-progress-circular(
            indeterminate
            :size="30"
            :width="3"
            color="primary"
            v-if="data.loader"
          )
          v-icon(
            v-else
            left
            :color="data.color"
          ) {{ data.icon }}
          h4.ml-2 {{ data.title }}
      template(v-slot:text)
        .ml-10 {{ data.text }}
      template(v-slot:actions v-if="data.btnClose")
        v-btn(
          text='Закрыть'
          color="primary"
          @click='closeDialog'
        )
</template>