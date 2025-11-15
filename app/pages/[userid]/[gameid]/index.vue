<template>
    <div class="w-full max-w-6xl mx-auto p-6 space-y-6">
        <div class="space-y-6" v-if="game_data">
            <div class="flex gap-4 items-start">
                <!-- PORTADA -->
                <FormField v-slot="{ componentField }" name="cover">
                    <FormItem class="shrink-0">
                        <FormControl>
                                <div
                                    class="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors overflow-hidden">
                                    <Plus v-if="!game_data" class="w-8 h-8 text-gray-400" />
                                    <img v-else :src="game_data.cover" alt="Portada" class="w-full h-full object-cover" />
                                </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- TITULO -->
                <div class="flex-1 space-y-2">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem>
                            <FormControl>
                                <UiInput type="text" v-model="game_data.title" placeholder="Titulo"
                                    class="text-xl font-semibold" readonly />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- INFO -->

                    <div class="text-sm text-gray-600 space-y-1">
                        <div>> Por: {{ route.params.userid || "Usuario" }}</div>
                        <div v-if="game_data.event">
                            > Para: {{ game_data.event.name }}
                        </div>
                        <div>> Fecha de creacion: {{ game_data.createdAt }}</div>
                    </div>

                    <!-- EVENTO -->
                </div>
            </div>

            <UiSeparator />
            <!-- PRECIO -->
            <FormField v-slot="{ componentField }" name="price" class="hidden">
                <FormItem class="hidden">
                    <FormLabel class="text-base font-medium mb-2 h-fit">Precio</FormLabel>
                    <FormDescription>(Deshabilitado, Luego se integrara compras)</FormDescription>
                    <FormControl>
                        <UiInput type="number" v-bind="componentField" disabled default-value="0" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- DESCRIPCION -->
            <div class="flex gap-4 grow">
                <FormField v-slot="{ componentField }" name="description">
                    <FormItem class="w-full flex flex-col">
                        <FormLabel class="text-base font-medium mb-2 h-fit">Descripcion</FormLabel>
                        <FormControl>
                            <UiTextarea placeholder="Escribe la descripción del juego..."
                                class="min-h-32 resize-none h-full" v-model="game_data.description" readonly/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- FOTOS -->

                <FormField v-slot="{ componentField }" name="pictures">
                    <FormItem class="shrink-0 flex flex-col items-center justify-between">
                        <FormControl>
                            <UiCarousel orientation="vertical"  class="max-h-92 w-32 my-16">
                                <UiCarouselContent class="max-h-92 w-32">
                                    <UiCarouselItem
                                        class="relative transition-transform duration-300 ease-in-out hover:scale-110 size-32"
                                        v-for="[index, picture] of game_data.pictures.entries()">
                                        <img :src="picture.picture_url" :key="index"
                                            class=" rounded-md border-2 border-gray-300 object-cover size-32" />
                                    </UiCarouselItem>
                                </UiCarouselContent>
                                <UiCarouselPrevious size="sm" v-if="game_data.pictures.length"/>
                                <UiCarouselNext size="sm" v-if="game_data.pictures.length"/>
                            </UiCarousel>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <UiSeparator />

            <!-- ARCHIVOS -->
            <div class="space-y-4">
                <h3 class="text-base font-medium">Archivos</h3>
                <div class="space-y-4">
                    <div v-for="(fileItem, index) in game_data.files" :key="index" class="flex gap-3 items-end">
                        <FormField v-slot="{ componentField }" name="files" class="flex-1">
                            <FormItem>
                                <FormLabel class="text-sm font-medium mb-1 block">Plataforma</FormLabel>
                                <FormControl>
                                  <UiButton variant="outline">{{ fileItem.type }}</UiButton>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="files" class="flex-1">
                            <FormItem>
                                <FormLabel class="text-sm font-medium mb-1 block">Nombre</FormLabel>
                                <FormControl>
                                    <UiInput type="text" v-model="fileItem.name"
                                        placeholder="Nombre del archivo" maxlength="50" readonly="true"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="files" class="flex-1">
                            <!-- AÑADIR ARCHIVO -->
                            <FormItem>
                                <FormLabel class="text-sm font-medium mb-1 block">Archivo</FormLabel>
                                <FormControl>
                                    <UiButton type="button" variant="outline" class="w-full" asChild>
                                        <NuxtLink :to="fileItem.link" class="relative cursor-pointer">
                                            <Download class="w-4 h-4 mr-2" />
                                            Descargar
                                        </NuxtLink>
                                    </UiButton>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                </div>
            </div>
            <UiSeparator />

            <!-- CATEGORIAS -->
            <FormField v-slot="{ componentField }" name="categories">
                <FormItem class="w-full">
                    <FormLabel class="text-base font-medium mb-2 block">Categorias</FormLabel>
                    <FormControl>
                                <UiTagsInput :model-value="game_data.categories || []
                                    " @update:model-value="
                                        componentField['onUpdate:modelValue']
                                        ">
                                    <UiTagsInputItem v-for="item of game_data.categories ||
                                        []" :key="item" :value="item" class="p-2">
                                        {{ item.category.name }}
                                    </UiTagsInputItem>
                                </UiTagsInput>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
          </div>
            <UiSeparator />
          <FormField v-slot="{ componentField }" name="puntuar">
                <FormItem class="w-full">
                    <FormLabel class="text-base font-medium mb-2 block">Puntuar</FormLabel>
                    <FormControl>
                                <div class="grid-5">
                                  <UiButton  v-for="n in 5" @click="updateRating(n)" variant="ghost">
                                    <Star :key="n"
              :class="{ 'fill-black text-black': n <= rating?.puntuation, 'text-gray-300': n > rating?.puntuation }" ></Star>
                                  </UiButton>
                                </div>
                    </FormControl>
                </FormItem>
            </FormField>
    </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { cn } from '@/lib/utils'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "vue-sonner";
import { Plus, Download, X, Star } from "lucide-vue-next";

const route = useRoute()
/* SETUP(INITIAL FETCH) */
const {data: game_data} = await useFetch(`/api/${route.params.userid}/${route.params.gameid}`)
const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
const temp = new Date(game_data.value.createdAt)
 game_data.value.createdAt = `${temp.getDate()} de ${months[temp.getMonth()]} de ${temp.getFullYear()}` 

 const {data: rating} = await useFetch(`/api/${route.params.userid}/${route.params.gameid}/puntuation`,{deep: true})
console.log("RATING",rating)
 async function updateRating(n: number){
 const {data} = await useFetch(`/api/${route.params.userid}/${route.params.gameid}/puntuation`,{
  method: "POST",
  body: {
    puntuation: n
  }
 })
 rating.value.puntuation = n
 console.log(rating.value?.puntuation)
 }
</script>
