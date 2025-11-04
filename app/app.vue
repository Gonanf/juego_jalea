<script setup lang="ts">
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import {
  Gamepad2,
  Store,
  BookOpen
} from "lucide-vue-next"
const auth = useAuth();

console.log(auth.data.value);
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
    {
      icon: Store,
      titulo: "Tienda",
      items: [
        {
          titulo: "Populares"
        },
        {
          titulo: "Novedades"
        },
        {
          titulo: "Mas vendidos"
        },
        {
          titulo: "Mas gustados"
        },
        {
          titulo: "Ganadores de Juegos Jaleas"
        },
      ]
    },
    {
      icon: BookOpen,
      titulo: "Documentacion",
      items: [
        {
          titulo: "¿Que es Juego Jalea?"
        },
        {
          titulo: "Como participar"
        },
        {
          titulo: "Requisitos"
        },
        {
          titulo: "Sobre la tienda"
        },
        {
          titulo: "Como publicar un juego"
        },
        {
          titulo: "Codigo fuente"
        },
        {
          titulo: "Contactos/Acerca"
        },
      ]
    },
  ],
}

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
