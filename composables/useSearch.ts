import axios from 'axios';
import { ref, watch } from 'vue';

let typingTimer: ReturnType<typeof setTimeout>;
const typingDelay: number = 300; // 300ms delay after user stops typing

interface ApiResponse {
  data: {
    items: any[];
    meta: {
      current_page: number;
      last_page: number;
    };
  };
}

export const useSearch = () => {

  const results = ref<any[]>([]);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const loading = ref<boolean>(false);
  const keyWord = ref<string>('');

  const searchPosts = async (perPage: number = 12, page: number = 1): Promise<void> => {
    const config = useRuntimeConfig();

    try {
      loading.value = true;
      const response = await axios.get<ApiResponse>(`${config.public.apiBase}/search`, {
        params: { key_word: keyWord.value, per_page: perPage, page }
      });

      if (page === 1) {
        results.value = response.data.data.items;
      } else {
        results.value = [...results.value, ...response.data.data.items];
      }
      currentPage.value = response.data.data.meta.current_page;
      lastPage.value = response.data.data.meta.last_page;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      loading.value = false;
    }
  };

  const loadMore = (perPage: number = 12): void => {
    if (currentPage.value < lastPage.value) {
      searchPosts(perPage, currentPage.value + 1);
    }
  };

  // New function to reset search state
  const resetSearch = (): void => {
    keyWord.value = '';
    results.value = [];
    currentPage.value = 1;
    lastPage.value = 1;    
  };

  watch(keyWord, () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => searchPosts(), typingDelay);
  });

  return { keyWord, results, currentPage, lastPage, loading, searchPosts, loadMore, resetSearch };
};