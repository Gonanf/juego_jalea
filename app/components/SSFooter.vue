<template>
  <UiSidebarMenu>

    <UiSidebarMenuItem v-if="auth.data.value?.user">

      <UiDropdownMenu>
        <UiDropdownMenuTrigger asChild>

          <UiSidebarMenuButton size="lg" @click="(sidebar.isMobile.value && !sidebar.open.value) && sidebar.toggleSidebar()">
            <UiAvatar class="h-8 w-8 rounded-lg">
              <UiAvatarImage :src="auth.data.value?.user?.image!"  referrerPolicy="no-referrer"/>
              <UiAvatarFallback>
                U
              </UiAvatarFallback>
            </UiAvatar>

            <div>
              <p class="text-lg">{{ auth.data.value?.user.name }}</p>
              <p class="text-sm">{{ auth.data.value?.user.email }}</p>
            </div>
          </UiSidebarMenuButton>

        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent 
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-amber-100"
          :side="sidebar.isMobile.value ? 'bottom' : 'right'"
          align="end"
          :side-offset="4">

          <UiDropdownMenuGroup>
            <UiDropdownMenuItem>
              <Settings/>
              Ajustes
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <Gamepad/>
              Juegos
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <ChartBar/>
              Estadisticas
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator/>
            <UiDropdownMenuItem @click="auth.signOut">
              <LogOut/>
              Cerrar sesion
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
          
        </UiDropdownMenuContent>
      </UiDropdownMenu>

    </UiSidebarMenuItem>

    <UiSidebarMenuItem v-else>
      <UiSidebarMenuButton size="lg" @click="auth.signIn('auth0')">
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
const auth = useAuth();

const sidebar = useSidebar();
</script>
