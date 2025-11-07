<template>
  <Sidebar collapsible="icon" @click="!sidebar.open.value && sidebar.toggleSidebar()" >
    <SidebarHeader class="bg-amber-100">

      <SSHeader/>

    </SidebarHeader>
      <UiSeparator></UiSeparator>

    <SidebarContent class="bg-amber-100">
      
      <SSContent :items="props.items.content"/>

    </SidebarContent>
      <UiSeparator></UiSeparator>

    <SidebarFooter class="bg-amber-100">

      <SSFooter/>

    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<script lang="ts" setup>
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail, useSidebar } from './ui/sidebar';
const props = defineProps(['items']);
//TODO: Change this into using the primary (modified) color instead of hardcoding it


const sidebar = useSidebar()
</script>
