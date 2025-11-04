<script setup lang="ts">
import {Button} from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
const auth = useAuth();

console.log(auth.data.value);
</script>

<template>
    <header class="w-full h-16 flex justify-between shadow-md items-center bg-amber-100" >
    <main>
      <SidebarTrigger/>
    </main>
</header>
</template>