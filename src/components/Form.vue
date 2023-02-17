

<template>
    <div :style="{ marginBottom: '20px' }">
      <a-select label-in-value v-model:value="option" :style="{ minWidth: '200px' }" :options="entities" placeholder="Не выбрано" allowClear/>
    </div>
    <div :style="{ marginBottom: '20px' }">
      <a-button :disabled="!option || !option.value" type="primary" :loading="loading" @click="createEntity">Создать</a-button>
    </div>
    <div>
        <ul>
            <li v-for="entity in list" :key="entity.id">{{ entity.id }} - {{ entity.name }}</li>
        </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios'
  import { useApiStore } from '../store/api';
  import { SelectValue } from 'ant-design-vue/lib/select';
  import { api_domain } from '../config';
import { notification } from 'ant-design-vue';

  type Entity = {
    id: number,
    name: string
  }

  const apiStore = useApiStore()
  
  const entities: SelectValue[] = [
    {
      label: 'Сделка',
      value: 'leads'
    },
    {
      label: 'Контакт',
      value: 'contacts'
    },
    {
      label: 'Компания',
      value: 'companies'
    },
  ]
  const option = ref({
    value: '',
    label: 'Не выбрано'
  })
  const loading = ref(false)
  const list = ref<Entity[]>([])
  const createEntity = ()=>{
    loading.value = true
    axios({
      method: 'POST',
      url: api_domain + '/entities/create/' + option.value.value,
      data: {
        domain: apiStore.domain,
        token: apiStore.token
      }
    }).then((response)=>{
        if(response.data.success){
            list.value.push({
                id: response.data.content._embedded[option.value.value][0].id,
                name: option.value.label,
            })
        } else {
            notification.error({
                message: response.data.title
            })
        }
      loading.value = false
    })
  }
  </script>
  
  <style scoped>
  
  </style>
  