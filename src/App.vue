<template>
  <main>
      <BaseTable/>
  </main>
</template>

<script setup lang="ts">
import BaseTable from "@/components/BaseTable.vue";
import { useTableStore } from "@/stores/table";
import {onBeforeMount, onMounted} from "vue";

const tableStore = useTableStore();
onBeforeMount(() => tableStore.checkUrl())
onMounted(() => {
    tableStore.fetchData()
})
</script>

<style scoped>
</style>
