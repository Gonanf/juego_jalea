<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>

      <SSHeader/>

    </SidebarHeader>

    <SidebarContent>
      
      <SSContent :items="props.items.content"/>

    </SidebarContent>

    <SidebarFooter>

      <SSFooter :item="props.items.user"/>

    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<script lang="ts" setup>
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail } from './ui/sidebar';


const props = defineProps(['items']);
</script>
