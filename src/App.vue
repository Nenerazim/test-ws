<script setup lang="ts">
import Logs from './components/Logs.vue';
import {LoggerService} from './app/services/LoggerService.ts';
const webSocket = new LoggerService;
</script>

<template>
  <div>
    <button v-if="!webSocket.auf.value" @click="webSocket.login('enter', 'A505a')">Вход</button>
    <button v-if="webSocket.auf.value" @click="webSocket.logout('enter', 'A505a')">Выход</button>
  </div>
  <div>
    <button v-if="!webSocket.sub.value" @click="webSocket.subscribe()">Получтиь логи</button>
    <button v-if="webSocket.sub.value" @click="webSocket.unSubscribe()">Перестать получать логи</button>
  </div>
  <Logs :logs="webSocket.eventData.value" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
