<template>
    <button 
      @click="toggleColorMode"
      class="rounded-lg"
    >
      <span v-if="colorMode === 'light'">🌙</span>
      <span v-else>☀️</span>
    </button>
  </template>
  
  <script setup>
  const { colorMode, toggleColorMode } = useColorMode()
  </script>