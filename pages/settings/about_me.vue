<template>

    <div class="w-full h-full flex items-center justify-center flex-col mx-auto max-w-4xl px-6 pt-10">
      <Skeleton v-if="settingStore.isLoading"/>
      <MarkdownRenderer :content="String(content)" v-else/>

    </div>
</template>

<script setup lang="ts">
    import Skeleton from '~/components/loading/Skeleton.vue';

    const settingStore = useSettingsStore();
    const content = ref<String>('');
    
    onMounted( async () => {

        if (!settingStore.settings.length) {
            await settingStore.fetchAllSettings();
        }
        
        content.value =  settingStore.getSettingByKey('about_me')?.value as string;
    });

</script>

<style scoped>

</style>