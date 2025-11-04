<template>
  <UiSidebarGroup>

    <UiSidebarMenu>

      <UiCollapsible v-for="item in props.items" :key="item.titulo"
        as-child
        :default-open="false"
        class="group/collapsible">

      <UiSidebarMenuItem >

        <UiCollapsibleTrigger as-child>
        <UiSidebarMenuButton asChild>
          <NuxtLink :to="item.url">
            <component :is="item.icon"/>
            {{ item.titulo }}
                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </NuxtLink>
        </UiSidebarMenuButton>
        </UiCollapsibleTrigger>

        <UiCollapsibleContent>
        <UiSidebarMenuSub v-if="item.items">

          <UiSidebarMenuSubItem v-for="subItem in item.items">

            <UiSidebarMenuButton asChild @click="(sidebar.isMobile.value && !sidebar.open.value) && sidebar.toggleSidebar()">
               <NuxtLink :to="subItem.url">
                {{ subItem.titulo }}
               </NuxtLink>
            </UiSidebarMenuButton>

          </UiSidebarMenuSubItem>

        </UiSidebarMenuSub>
        </UiCollapsibleContent>

      </UiSidebarMenuItem>

      </UiCollapsible>
    </UiSidebarMenu>

  </UiSidebarGroup>
</template>

<script lang="ts" setup>
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';
import { ChevronRight } from 'lucide-vue-next';
import { useSidebar } from './ui/sidebar';


type URL_PATH = string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined

const props = defineProps<{
  items: 
    {
      icon: any, titulo: string, url: URL_PATH, 
      items: 
        {titulo: string, url: URL_PATH}[]
    }[]
  }>();

const sidebar = useSidebar();
</script>