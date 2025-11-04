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
          titulo: "¿Que es Juego Jalea?",
          url: {name: 'about-introduccion'}
        },
        {
          titulo: "Como participar",
          url: {name: 'about-participar'}
        },
        {
          titulo: "Requisitos",
          url: {name: 'about-introduccion'}
        },
        {
          titulo: "Sobre la tienda",
          url: {name: 'about-tienda'}
        },
        {
          titulo: "Como publicar un juego",
          url: {name: 'about-publicaciones'}
        },
        {
          titulo: "Codigo fuente",
          url: {name: 'about-source'}
        },
        {
          titulo: "Contactos",
          url: {name: 'about-contacto'}
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
