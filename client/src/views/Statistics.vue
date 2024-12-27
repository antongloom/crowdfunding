<script lang="ts" setup>
import { computed, reactive, onMounted } from 'vue'
import useCrowfunding from '@/store/crowfunding'
import { getCount } from '@/composables/count'

const crowfundingStore = useCrowfunding()

const headers = reactive([ 
  { title: 'Владелец', key: 'owner' },
  { title: 'Отправитель', key: 'donators' },
  { title: 'Количество', key: 'amount'}
])

const items = computed(() => {
  return crowfundingStore.getCompany?.map((item: any) => {
    return {
      currentid: item.currentid,
      title: item.title,
      data: item.donators ? item.donators : [],
      all: item?.donators && item?.donators.at(-1)?.amount / Math.pow(10, 18) || 0
    }
  })
})

onMounted(() => {
  crowfundingStore.getCompanyData()
})


</script>

<template lang="pug">
div(v-for="item in items")
  .mb-6
    h2.mb-4 {{ item.title }}
    .custom-table-journal
      v-data-table-virtual(
        fixed-header
        :headers="headers"
        :height="item.data?.length >= 9 ? 350: ''"
        :items="item.data"
        item-value="title"
        color="primary"
      )
        template(v-slot:item="{ item, index }")
          tr
            td.mt-2 {{ item.owner }}
            td.mt-2 {{ item.donators }}
            td.mt-2 {{ item.amount / Math.pow(10, 18) }} ETH
      .d-flex.mt-2
        v-spacer
        span.mr-2 Сумма из последней (сколько сейчас находится на счету):
        h4 {{ item.all }} ETH

</template>

<style lang="less">

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  height: 27px;
}

th.v-data-table__td.v-data-table-column--align-start.v-data-table__th.v-data-table__th--sortable {
  background-color: grey;
  color: #fff;
  height: 35px;
}

.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background-color: rgb(220,220,220);
}


.custom-table-journal {
  position: relative;
}

.custom-table-journal li.v-pagination__first {
  display: none;
}

.custom-table-journal li.v-pagination__last {
  display: none;
}

.custom-table-journal .v-table--fixed-header > .v-table__wrapper > table {
  margin-top: 35px;
}

.custom-table-journal .v-table--fixed-header > .v-table__wrapper > table > thead {
  position: absolute;
  width: 100%;
}

.custom-table-journal .v-table--fixed-header > .v-table__wrapper > table > thead tr {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.custom-table-journal .v-table--fixed-header > .v-table__wrapper > table > tbody tr {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.custom-table-journal .v-data-table-header__content {
  margin-top: 7px;
}

.custom-table-journal th.v-data-table__td.v-data-table-column--align-start.v-data-table__th.v-data-table__th--sortable {
  width: 100%;
  height: 35px;
}

.custom-table-journal .v-table--fixed-header > .v-table__wrapper > table > tbody {
  position: relative;
}

.custom-table-journal .v-data-table-footer__items-per-page {
  display: none;
}

.table-wrapper .v-table--fixed-header > .v-table__wrapper > table > tbody {
  position: relative;
}

.table-wrapper .v-table--fixed-header > .v-table__wrapper > table > thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>