import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
    state: () => ({
        domain: '',
        token: ''
    })
})