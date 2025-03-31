export interface Post {
  id: number
  title: string
  content: string
  image_url: string
}

// stores/usePostStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

interface PostState {
  post: Post | null
  loading: boolean
}

export const usePostStoreDetail = defineStore('post', {

  state: (): PostState => ({
    post: null,
    loading: true
  }),

  getters: {
    getPost: (state) => state.post,
    isLoading: (state) => state.loading,
  },

  actions: {

    async fetchPostDetail(slug: string | number) {
      const config = useRuntimeConfig();

      if(this.post) this.loading = false

      try {
        const { data } = await axios.get(`${config.public.apiBase}/post/${slug}`)
        this.post = data.data.item        
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        this.loading = false
      }
    },
  }
});