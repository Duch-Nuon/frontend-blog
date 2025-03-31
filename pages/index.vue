<template>
    <div class="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 sm:grid-flow-row-dense sm:w-full md:grid-cols-2 lg:grid-cols-3 mx-auto gap-7 my-7 lg:px-4 md:px-4 sm:px-7 px-4 justify-center">
        <template v-if="postStore.isLoading">
            <LoadingSkeleton v-for="(_, index) in 9" :key="'skeleton-' + index" />
        </template>
        <template v-else>
            <PostCard v-for="(post, index) in postStore.posts" :post="post" :key="index" />
            <Pagination :totalPages="totalPages" v-model="currentPage" @page-changed="handlePageChange" class="col-span-1 sm:col-span-2 lg:col-span-3 min:lg:col-span-3" />
        </template>

        <Error class="col-span-1 sm:col-span-2 lg:col-span-3 mx-auto min:lg:col-span-3"  v-if="postStore.is_error"/>
    </div> 
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const postStore = usePostStore();

    const currentPage = ref(0);
    const totalPages = ref(0); 

    const handlePageChange = (page: number) => {
        postStore.fetchPosts(page);
    };

    onMounted( async () => {
       await postStore.fetchPosts();
       currentPage.value = postStore.currentPage;
       totalPages.value = postStore.lastPage;
    });

</script>

<style scoped>

</style>