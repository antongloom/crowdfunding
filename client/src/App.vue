<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Main from '@/views/Main.vue'
import DialogInfo from '@/components/modal/DialogInfo.vue'



</script>

<template lang="pug">
v-app
  Main
    router-view
  dialog-info
</template>

<style scoped>

</style>

