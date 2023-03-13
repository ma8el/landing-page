import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: import.meta.env.VITE_JWT_TOKEN || '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
})