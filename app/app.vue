<script setup lang="ts">
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import {
  Folder,
  Forward,
  Gamepad2,
  MoreHorizontal,
  Trash2,
} from "lucide-vue-next"
const sidebar_items = {
  content: [
    {
      icon: Gamepad2,
      titulo: "Ediciones",
      items: [
        {
          titulo: "2025"
        },
        {
          titulo: "2024"
        },
        {
          titulo: "2023"
        },
        {
          titulo: "2022"
        },
      ]
    },
  ]
}

const items = [
  {
    title: "¿Que es Juego Jalea?",
    url: "#introduccion",
    icon: "lucide:circle-question-mark",
    value: 0
  },
  {
    title: "Sobre la tienda",
    url: "#tienda",
    icon: "lucide:store",
    value: 1
  },
  {
    title: "Requisitos",
    url: "#requisitos",
    icon: "lucide:infinity",
    value: 2
  },
  {
    title: "Contactos",
    url: "#contactos",
    icon: "lucide:circle-user",
    value: 3
  },

];

</script>

<template>
  <div class="w-screen h-screen">
    <NuxtRouteAnnouncer />

    <SidebarProvider>
      <SmartSidebar :items="sidebar_items"></SmartSidebar>

      <SidebarInset>
        <Heading></Heading>
        <NuxtPage></NuxtPage>
      </SidebarInset>

    </SidebarProvider>
  </div>
</template>
