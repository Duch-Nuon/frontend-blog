<template>
    <div class="flex gap-x-1 md:gap-x-2 lg:gap-x-2 mx-auto" v-if="totalPages > 1">
      <button
        class="rounded-full border bg-[#A5B4FC] border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:mr-3 lg:mr-3"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Prev
      </button>
  
      <template v-for="page in pagination" :key="page">
        <button
          v-if="page !== '...'"
          class="min-w-9 rounded-full py-2 px-1 md:px-3.5 lg:px-3.5 text-center text-sm transition-all shadow-sm border"
          :class="{
            'bg-slate-800 text-white shadow-md hover:shadow-lg hover:bg-slate-700 dark:bg-white dark:text-black focus:bg-slate-700 active:bg-slate-700':
              page === currentPage,
            'border-slate-300 text-slate-600 hover:text-white dark:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800':
              page !== currentPage
          }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
  
        <span v-else class="px-1 md:px-2 lg:px-2 text-slate-600">...</span>
      </template>
  
      <button
        class="rounded-full bg-[#A5B4FC] border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-black hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:ml-3 lg:ml-3"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup lang="ts">

  const props = defineProps({
    modelValue: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
  });
  
  const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void;
    (event: 'page-changed', page: number): void;
  }>();
  
  const currentPage = computed({
    get() {
      return props.modelValue;
    },
    set(value: number) {
      emit('update:modelValue', value);
    }
  });
  
  const pagination = computed(() => {
    const total = props.totalPages;
    const current = currentPage.value;
    const range: (number | string)[] = [];
  
    if (total <= 7) {
      for (let i = 1; i <= total; i++) range.push(i);
    } else {
      range.push(1);
      if (current > 3) range.push('...');
  
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
  
      for (let i = start; i <= end; i++) range.push(i);
  
      if (current < total - 2) range.push('...');
      range.push(total);
    }    
  
    return range;
  });
  
  async function changePage(page: number | string) {
    if (page !== '...' && page !== currentPage.value) {
      currentPage.value = page as number;
      emit('page-changed', page as number);
    }
  }
  </script>
  