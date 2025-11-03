<template>
  <Sidebar class="relative" collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>
          <slot>
            
          </slot>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in props.items" :key="item.title">
                <SidebarMenuButton asChild @click="$emit('change',item.value)">
                    <a :href="item.url">
                      <Icon :name="item.icon" size="1.5rem" class="min-w-[1.5rem]"/>
                      <span>{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script lang="ts" setup>
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

const props = defineProps(['items']);

</script>
