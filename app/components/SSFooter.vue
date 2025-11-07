<template>
  <UiSidebarMenu>
    <UiSidebarMenuItem >
      <UiSidebarMenuButton size="lg" >
        <UiAvatar class="h-8 w-8 rounded-lg">
          <UiAvatarFallback class=" border-solid border-black border-1">
            U
          </UiAvatarFallback>
        </UiAvatar>
        <p>Iniciar Sesion</p>
      </UiSidebarMenuButton>
    </UiSidebarMenuItem>
  </UiSidebarMenu>
</template>

<script lang="ts" setup>
import { ChartArea, ChartBar, Gamepad, House, LogOut, Settings } from 'lucide-vue-next';
import { useSidebar } from './ui/sidebar';
// const auth = useAuth();

const sidebar = useSidebar();
</script>
