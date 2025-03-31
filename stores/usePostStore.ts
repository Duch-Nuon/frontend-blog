import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
  // Add other properties based on your API response
}

interface ApiResponse {
  data: {
    items: Post[];
    meta: {
      last_page: number;
      current_page: number;
    };
  };
}

export const usePostStore = defineStore('postStore', () => {
  // Main state
  const posts = ref<Post[]>([]);
  const lastPage = ref<number>(0);
  const isLoading = ref<boolean>(true);
  const currentPage = ref<number>(1);
  const is_error = ref<boolean>(false);
  const errors = ref<unknown>();

  const config = useRuntimeConfig();

  // Fetch paginated posts
  async function fetchPosts(page: number = 1): Promise<void> {
    if (page > 1) {
      isLoading.value = false;
    }

    try {
      const { data } = await axios.get<ApiResponse>(`${config.public.apiBase}/posts`, {
        params: {
          per_page: 9,
          page: page,
        },
      });

      posts.value = data.data.items;
      lastPage.value = data.data.meta.last_page;
      currentPage.value = data.data.meta.current_page;
    } catch (error) {
      is_error.value = true;
      errors.value = error;
      isLoading.value = false;
      console.error('Failed to fetch posts:', error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    posts,
    currentPage,
    lastPage,
    isLoading,
    fetchPosts,
    is_error,
    errors,
  };
});
