<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useField, useForm } from 'vee-validate'
import useCrowfunding from '@/store/crowfunding'


const crowfundingStore = useCrowfunding()

const isDialogOpen = ref(false)

const openDialog = () => {
  isDialogOpen.value = true
}


const { resetForm } = useForm()

const { meta } = useForm({
  validationSchema: {
    title(value: string) {
      if (value?.length >= 2) return true
      return 'Введить данные'
    },
    description(value: string) {
      if (value?.length >= 2) return true
      return 'Введить данные'
    },
    target(value: string) {
      if (value?.length >= 1) return true
      return 'Введить данные'
    },
    deadline(value: string) {
      if (value?.length >= 2) return true
      return 'Введить данные'
    },
    image(value: string) {
      if (value?.length >= 2) return true
      return 'Введить данные'
    }
  }
})





const title = useField('title')
const description = useField('description')
const target = useField('target')
const deadline = useField('deadline')
const image = useField('image')

const closeDialog = () => {
  isDialogOpen.value = false
  title.resetField()
  description.resetField()
  target.resetField()
  deadline.resetField()
  image.resetField()
}



// Обработка дата пикер
const menu = ref(false);

const selectedDate = ref<string | null>(null);
// const formattedDate = ref<string>('')

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  deadline.value.value = formatter.format(new Date(date))
  menu.value = false
}

const timestamp = (time: any) => {
  const date = new Date(time).getTime()
  return date / 1000
}

const onSave = () => {
  if (meta.value.valid) {
    
    const data: any = {
      title: title.value.value,
      description: description.value.value,
      target: target.value.value,
      deadline: timestamp(selectedDate.value),
      image: image.value.value
    }

    crowfundingStore.conectWallet(data)

  }
  closeDialog()
}


</script>

<template lang="pug">
v-dialog(
  v-model="isDialogOpen"
  max-width='950'
)
  template(v-slot:activator='{ props: activatorProps }')
    v-btn(
      v-bind='activatorProps'
      text='Создать компанию'
      color="red"
      variant="flat"
      density="comfortable"
      @click="openDialog"
    )
  template(v-slot:default='{ isActive }')
    v-card(title='Создание компании')
      .icon-close
        v-btn(icon size="25" color="primary" @click="closeDialog")
          v-icon(size="20") mdi-close
      v-card-text
        v-text-field(
          v-model="title.value.value"
          density="comfortable"
          label="Заголовок"
          variant="outlined"
          :error-messages="title.errorMessage.value"
        )
        v-textarea.mb-2(
          v-model="description.value.value"
          density="comfortable"
          label="Описание"
          variant="outlined"
          :error-messages="description.errorMessage.value"
        )
        .d-flex.mb-2
          v-text-field.mr-2(
            v-model="target.value.value"
            density="comfortable"
            label="Целевая сумма"
            variant="outlined"
            :error-messages="target.errorMessage.value"
            width="300"
          )
          v-menu(
            v-model="menu"
            close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290"
          )
            template(v-slot:activator="{ props }")
              v-text-field(
                v-bind="props"
                :value="deadline.value.value"
                :label="deadline.value.value ? '' : 'Выберите дату окончания'"
                readonly
                density="comfortable"
                variant="outlined"
                :error-messages="deadline.errorMessage.value"
                width="300"
              )
            v-date-picker(
              v-model="selectedDate"
              locale="ru"
              @update:model-value="formatDate"
            )
        v-text-field(
          v-model="image.value.value"
          density="comfortable"
          label="Картинка компании (Укажите url картинки)"
          variant="outlined"
          :error-messages="image.errorMessage.value"
        )
      .custom-card-actions
        v-btn(
          text='Создать компанию'
          @click='onSave'
          :disabled="!meta.valid"
          color="primary"
          variant="flat"
        )
</template>

<style lang="less">
.custom-card-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.icon-close {
  position: absolute;
  right: 25px;
  top: 22px;
}
</style>