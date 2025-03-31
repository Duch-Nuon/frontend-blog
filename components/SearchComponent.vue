<template>
    <div class="relative inline-block">
      <!-- Search button -->
      <button 
        type="button" 
        @click="showModal = true" 
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
      >
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
      </button>
      
      <!-- Responsive modal -->
      <div 
        v-if="showModal" 
        class="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 sm:items-start sm:pt-16"
        @click="closeModal"
      >
        <div class="relative w-full max-w-3xl mx-auto" @click.stop>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- Search input container -->
            <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="relative w-full">
                <input 
                  v-model="keyWord" 
                  type="text" 
                  placeholder="Search..." 
                  class="block w-full p-3 ps-10 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            
            <!-- Modal body -->
            <div class="p-4 sm:p-6 max-h-96 overflow-y-auto">
              <ul v-if="results.length > 0" class="space-y-3">
                <li v-for="(item, index) in results" :key="index + 1" class="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <NuxtLink :to="`/post/${item.slug}`" @click="closeModal">
                    <div class="flex flex-row gap-x-3 items-center">
                        <NuxtImg :src="item.image_url" :alt="item.title" class="w-[90px] h-[70px] rounded-sm"/>
                        <strong>{{ item.title }}</strong>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
              <p v-else class="text-sm text-center text-gray-500">No results found.</p>
              <button 
                v-if="currentPage < lastPage && !loading" 
                @click="loadMore()" 
                class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Load More
              </button>
              <p v-if="loading" class="mt-4 text-sm text-gray-500">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useSearch } from '~/composables/useSearch';
  
  const { keyWord, results, currentPage, lastPage, loading, loadMore, resetSearch } = useSearch();
  const showModal = ref<boolean>(false);
  
  // Function to properly close the modal and reset search
  const closeModal = () => {
    showModal.value = false;
    resetSearch();
  };
  
  </script>
  
  <style scoped>
  /* Fade-in animation for the modal */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  </style>