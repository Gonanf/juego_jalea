<template>
  <SidebarMenu>
    <SidebarMenuItem>

      <SidebarMenuButton size="lg" asChild>
        <NuxtLink :to="{name: 'index'}">
          <NuxtImg src="/logo.svg" class="w-[2rem] h-[2rem]" placeholder />
          <p class="text-lg text-nowrap">Juego Jalea</p>
        </NuxtLink>
      </SidebarMenuButton>

      <UiSeparator></UiSeparator>

    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script lang="ts" setup>
import { SidebarMenu, SidebarMenuItem,SidebarMenuButton } from './ui/sidebar';
</script>
