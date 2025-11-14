<script setup lang="ts">
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
</script>

<template>
    <header
        class="w-full h-16 flex justify-between shadow-md items-center bg-amber-100 sticky top-0 z-10"
    >
        <main>
            <SidebarTrigger />
        </main>
    </header>
</template>
