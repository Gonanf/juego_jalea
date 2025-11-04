<template>
  <UiSidebarGroup>

    <UiSidebarMenu>

      <UiSidebarMenuItem v-for="item in props.items" class="p-0 m-0">

        <UiSidebarMenuButton asChild>
          <NuxtLink :to="item.url">
            <component :is="item.icon"/>
            {{ item.titulo }}
          </NuxtLink>
        </UiSidebarMenuButton>

        <UiSidebarMenuSub v-if="item.items">

          <UiSidebarMenuSubItem v-for="subItem in item.items">

            <UiSidebarMenuButton asChild>
               <NuxtLink :to="subItem.url">
                {{ subItem.titulo }}
               </NuxtLink>
            </UiSidebarMenuButton>

          </UiSidebarMenuSubItem>

        </UiSidebarMenuSub>

      </UiSidebarMenuItem>

    </UiSidebarMenu>

  </UiSidebarGroup>
</template>

<script lang="ts" setup>
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';


type URL_PATH = string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined

const props = defineProps<{
  items: 
    {
      icon: any, titulo: string, url: URL_PATH, 
      items: 
        {titulo: string, url: URL_PATH}[]
    }[]
  }>();

</script>