<template>
    <nav class="sticky z-50 top-0 bg-indigo-300">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink href="/" class="flex items-center space-x-3 rtl:space-x-reverse" replace>
            <NuxtImg src="https://flowbite.com/docs/images/logo.svg" class="h-8 w-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Flowbite</span>
        </NuxtLink>
        <div class="flex md:order-2">
            <SearchComponent />
            <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <div class="relative mt-3 md:hidden">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    </div>
                    <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
                </div>
                <ul class="flex flex-col font-semibold p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                    <li>
                        <NuxtLink href="/" class="block py-2 px-3 text-black bg-black-700 rounded-sm md:bg-transparent md:text-black-700 md:p-0 md:dark:text-black-500" aria-current="page">Home</NuxtLink>
                    </li>
                    <ListCategoryNavbar/>
                    <!-- <li>
                        <NuxtLink href="/settings/about_me" class="block py-2 px-3 text-black-900 rounded-sm hover:bg-black-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black-500 dark:text-black dark:hover:bg-black-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-black-700">About</NuxtLink>
                    </li> -->
                </ul>
            </div>
            <div class="flex md:order-3">
                <ThemeDarkToggle/>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>