<template>
    
    <div :style="{ marginBottom: '20px' }">
        <a-input placeholder="id" v-model:value="id" />
    </div>
    <div>
        <a-button @click="join" :loading="loading">Войти</a-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';
import { useApiStore } from '../store/api';
import { api_domain } from '../config';

const apiStore = useApiStore()

const id = ref('')
const loading = ref(false)
const join = () => {
    loading.value = true 
    axios({
        method: 'POST',
        url: api_domain + '/auth/get_api',
        data: { id: id.value },
        validateStatus: () => true
    }).then((response) => {
        if(response.data.success){
            apiStore.token = response.data.content.access_token;
            apiStore.domain = response.data.content.base_domain;
        } else {
            notification.error({
                message:  response.data.title
            })
        }
        loading.value = false 
    })
}
</script>

<style lang="scss">


</style>