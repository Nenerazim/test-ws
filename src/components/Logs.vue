<script lang="ts" setup>
import {IEventItems} from "../app/Interfaces/LoggerService";
import {l} from "vite/dist/node/types.d-aGj9QkWt";

defineProps<{logs: IEventItems[] | string}>();
</script>

<template>
  <div v-if="typeof logs !== 'string'" >
    <div v-if="logs.length" class="container">
      <div>Номер</div>
      <div>Уровень</div>
      <div>Сообщение</div>
      <div>Файл</div>
      <div>Дата</div>
    </div>
    <div v-for="(log, index) in logs" class="container">
      <div>{{index}}</div>
      <div>{{log.Level}}</div>
      <div>{{log.Message}}</div>
      <div>{{log.Source}}</div>
      <div>{{log.Timestamp}}</div>
    </div>
  </div>
  <h1 v-else>{{logs}}</h1>
</template>

<style scoped>
.container {
  display: flex;
  div {
    width: 100%;
  }
}
</style>