import { defineStore } from 'pinia'
import axios from 'axios'

interface Setting {
  key: string
  value: string
}

interface ApiResponse {
  data: {
    items: Setting[];
  };
}

export const useSettingsStore = defineStore('settings', {

  state: () => ({
    settings: [] as Setting[],
    isLoading: true,
    error: null as string | null
  }),

  actions: {

    async fetchAllSettings() {

      const config = useRuntimeConfig();

      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get<ApiResponse>(`${config.public.apiBase}/settings`); // Adjust to match your API
        this.settings = response.data.data.items
      } catch (err) {
        this.error = 'Failed to fetch settings'
      } finally {
        this.isLoading = false
      }
    },

    getSettingByKey(key: string): Setting | null {
      return this.settings.find((setting) => setting.key === key) || null
    }
  }
})
