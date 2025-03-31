<template>
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="flex items-center justify-between w-full py-2 px-3 text-black bg-black-700 rounded-sm md:bg-transparent md:text-black-700 md:p-0 md:dark:text-black-500" type="button">
      {{ selectedOption || 'Category' }}
      <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
  
    <!-- Dropdown menu -->
    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="category in categories" :key="category.id">
          <NuxtLink 
            :to="`/category/${category.slug}`"
            @click="selectOption(category)" replace
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            {{ category.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  
  interface Category {
    id: number;
    name: string;
    slug: string;
  }
  
  interface ApiResponse {
    data: {
      items: Category[];
    };
  }
  
  const config = useRuntimeConfig();
  const categories = ref<Category[]>([]);
  const selectedOption = ref<string>('');
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const paramSlug = useRoute().params.slug as string;
  
  const selectOption = (category: Category): void => {
    selectedOption.value = category.slug;

    if(!category.slug) selectedOption.value = paramSlug;

    emit('category-selected', category);
  };
  
  // Create axios instance
  const apiClient = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // API call using axios
  const getListCategory = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      const response = await apiClient.get<ApiResponse>('/categories');
      categories.value = response.data.data.items;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching categories:', err);
    } finally {
      loading.value = false;
    }
  };
  
  // Fetch categories on mount
  onMounted(async () => {
    await getListCategory();
    if(!selectedOption.value) selectedOption.value = paramSlug;

  });
  
  // Define emits
  const emit = defineEmits<{
    (event: 'category-selected', category: Category): void;
  }>();
  
  </script>