<template>
  <SidebarMenu>
    <SidebarMenuItem>

      <SidebarMenuButton size="lg" asChild @click="(sidebar.isMobile.value && !sidebar.open.value) && sidebar.toggleSidebar()">
        <NuxtLink :to="{name: 'index'}">
          <UiAvatar class="h-8 w-8 rounded-lg">
            <UiAvatarImage src="/logo.svg"/>
            <UiAvatarFallback>
              JJ
            </UiAvatarFallback>
          </UiAvatar>
          <p class="text-lg text-nowrap">Juego Jalea</p>
        </NuxtLink>
      </SidebarMenuButton>


    </SidebarMenuItem>
  </SidebarMenu>
</template>

<script lang="ts" setup>
import { SidebarMenu, SidebarMenuItem,SidebarMenuButton, useSidebar } from './ui/sidebar';
const sidebar = useSidebar()
</script>
