<template>
    <div class="w-full h-full flex items-center justify-center flex-col mx-auto max-w-4xl px-6 pt-10">
      <h1 class="text-4xl font-bold text-left w-full sm:text-5xl md:text-5xl">{{ postStore.getPost?.title }}</h1>
      <div class="max-[500px] mt-6">
        <NuxtImg :src="postStore.getPost?.image_url" loading="lazy" class="rounded-xl shadow-lg"/>
      </div>

      <Skeleton v-if="postStore.isLoading"/>

      <MarkdownRenderer :content="String(postStore.getPost?.content ?? '')"/>

    </div>
  </template>

<script setup lang="ts">
    import Skeleton from '~/components/loading/Skeleton.vue';

    const route = useRoute();
    const postStore = usePostStoreDetail();
    const postSlug = route.params.slug as string;

    onMounted(() => {
        postStore.fetchPostDetail(postSlug);        
    });

</script>

<style lang="scss" scoped>

</style>