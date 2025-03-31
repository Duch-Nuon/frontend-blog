<template>
  <NuxtLayout class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup> 
  import { useSettingsStore } from '~/stores/useSettingStore';
  import { onMounted } from "vue";

    const settingStore = useSettingsStore();
    await settingStore.fetchAllSettings();

    onMounted(async () => {
      const { initFlowbite } = await import("flowbite");
      initFlowbite();
    });
</script>
