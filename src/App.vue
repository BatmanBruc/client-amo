

<template>
  <Auth v-if="!isAuth"/>
  <Form v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Auth from './components/Auth.vue';
import Form from './components/Form.vue';
import { useApiStore } from './store/api';

const apiStore = useApiStore()

const isAuth = computed(() => {
  return apiStore.domain && apiStore.token;
})

</script>

<style scoped>

</style>
