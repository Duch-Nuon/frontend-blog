<template>
    <div class="bg-white border dark:text-white border-gray-200 lg:w-[60%] w-[99%] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 lg:py-8 rounded-lg shadow-2xl">
        <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">{{ props.errorStore?.errors.status }}</p>
        <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider dark:text-gray-500 text-gray-500 mt-4">{{ props.errorStore?.errors.response.statusText }}</p>
        <p class="text-gray-500 mt-4 pb-4 text-center">{{ props.errorStore?.errors.message }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        errorStore: Object
    });
</script>

<style lang="scss" scoped>

</style>