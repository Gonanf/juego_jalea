<template>
  <UiSidebarMenu>

    <UiSidebarMenuItem v-if="session.data">

      <UiDropdownMenu>
        <UiDropdownMenuTrigger asChild>

          <UiSidebarMenuButton size="lg" @click="(sidebar.isMobile.value && !sidebar.open.value) && sidebar.toggleSidebar()">
            <UiAvatar class="h-8 w-8 rounded-lg">
              <UiAvatarImage :src="session.data.user.image!"  referrerPolicy="no-referrer"/>
              <UiAvatarFallback>
                U
              </UiAvatarFallback>
            </UiAvatar>

            <div>
              <p class="text-lg">{{ session.data.user.nickname?? session.data.user.name }}</p>
              <p class="text-sm">{{ session.data.user.email }}</p>
            </div>
          </UiSidebarMenuButton>

        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent 
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-amber-100"
          :side="sidebar.isMobile.value ? 'bottom' : 'right'"
          align="end"
          :side-offset="4">

          <UiDropdownMenuGroup>
            <UiDropdownMenuItem @click="navigateTo({name: 'userid', params: {userid: session.data.user.nickname}})">
              <User/>
              Usuario
            </UiDropdownMenuItem>
            <UiDropdownMenuItem @click="navigateTo({name: 'userid-juego-libreria', params: {userid: session.data.user.nickname}})">
              <Gamepad/>
              Juegos
            </UiDropdownMenuItem>
            <UiDropdownMenuItem disabled>
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
      <UiSidebarMenuButton size="lg" @click="auth.signIn.social({provider: 'google'})">
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
import { ChartArea, ChartBar, Gamepad, House, LogOut, Settings, User } from 'lucide-vue-next';
import { useSidebar } from './ui/sidebar';
import { watchOnce } from '@vueuse/core';
const auth = useAuth();
const session = await auth.useSession()

// TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
console.log('👷 - session:', session);
const unwatch = watch(session, async () => {
  if (!session.value.isPending){
    if (await hasUsername(session)) unwatch()
  }
})

const sidebar = useSidebar();
</script>
