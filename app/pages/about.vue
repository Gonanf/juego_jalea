<template>
    <div class="flex">
      <SidebarProvider class="w-fit" :defaultOpen="true" v-model="index">
    <JSidebar :items="items"  @change="(val) => index = val">
      Indice
    </JSidebar>
    <main>
      <SidebarTrigger/>
    </main>
  </SidebarProvider>

   <Card class="w-full m-5">
    <CardHeader>
      <CardTitle>
        {{ cards[index]?.title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <component :is="cards[index]?.description"></component>
      </CardContent>
  </Card>
  </div>
</template>

<script lang="tsx" setup>
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import JSidebar from '@/components/JSidebar.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {Introduccion, Tienda, Requisitos, Contacto} from "@/components/about"

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

const index = ref(0)

const cards = [
  {
    title: "¿Que es un Juego Jalea?",
    description: Introduccion
  },
  {
    title: "Sobre la tienda",
    description: Tienda
  },
  {
    title: "Requisitos",
    description: Requisitos
  },
  {
    title: "Contactos",
    description: Contacto
  }
  
]
</script>
