<template>
    <NuxtLink :to="`/post/${data.post?.slug}`" class="cursor-pointer" replace>
        <div class="bg-white group dark:bg-gray-900 relative w-full mx-auto h-auto overflow-hidden rounded-lg hover:scale-102 transition-transform duration-150">
            <div class="aspect-[2/1] h-full w-full">
                <NuxtImg class="rounded-t-lg transition-all h-full w-full object-cover duration-150 hover:scale-105" :src="data.post?.image_url" :alt="data.post?.title" loading="lazy"/>
            </div>
            <h3 class="mt-4 text-xl font-bold transition group-hover:text-red-600 sm:text-2xl">{{ data.post?.title }}</h3>
            <p class="mt-3 max-w-2xl text-gray-600 dark:text-gray-400 line-clamp-2 sm:line-clamp-3">{{ data.post?.description }}</p>        </div>
    </NuxtLink>
</template>

<script setup lang="ts">

    const data = defineProps({
        post: Object
    });
</script>

<style lang="scss" scoped>

</style>