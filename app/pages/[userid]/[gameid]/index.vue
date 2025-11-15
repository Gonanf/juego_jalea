<template>
    <div class="w-full max-w-6xl mx-auto p-6 space-y-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="flex gap-4 items-start">
                <!-- PORTADA -->
                <FormField v-slot="{ componentField }" name="cover">
                    <FormItem class="shrink-0">
                        <FormControl>
                            <label class="relative cursor-pointer">
                                <input type="file" accept="image/*" class="hidden" @change="
                                    (event: Event) =>
                                        handleCoverChange(
                                            event,
                                            componentField.onChange,
                                        )
                                " />
                                <div
                                    class="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors overflow-hidden">
                                    <Plus v-if="!coverPreview" class="w-8 h-8 text-gray-400" />
                                    <img v-else :src="coverPreview" alt="Portada" class="w-full h-full object-cover" />
                                </div>
                            </label>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- TITULO -->
                <div class="flex-1 space-y-2">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem>
                            <FormControl>
                                <UiInput type="text" v-bind="componentField" placeholder="Titulo"
                                    class="text-xl font-semibold" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- INFO -->

                    <div class="text-sm text-gray-600 space-y-1">
                        <div>> Por: {{ route.params.userid || "Usuario" }}</div>
                        <div v-if="selectedEventName">
                            > Para: {{ selectedEventName }}
                        </div>
                        <div>> Fecha de creacion: {{ creationDate }}</div>
                    </div>

                    <!-- EVENTO -->

                    <FormField v-slot="{ componentField }" name="event_id" class="mt-3">
                        <FormItem>
                            <FormControl>
                                <UiSelect v-bind="componentField">
                                    <UiSelectTrigger class="w-full max-w-xs">
                                        <UiSelectValue placeholder="Selecciona un evento" />
                                    </UiSelectTrigger>
                                    <UiSelectContent>
                                        <UiSelectItem v-for="event in events" :key="event.id" :value="event.id">
                                            {{ event.name }}
                                        </UiSelectItem>
                                    </UiSelectContent>
                                </UiSelect>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
            </div>

            <!-- PRECIO -->
            <FormField v-slot="{ componentField }" name="price" class="hidden">
                <FormItem class="hidden">
                    <FormLabel class="text-base font-medium mb-2 h-fit">Precio</FormLabel>
                    <FormDescription>(Deshabilitado, Luego se integrara compras)</FormDescription>
                    <FormControl>
                        <UiInput type="number" v-bind="componentField" disabled default-value="0"/>
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
                            <UiTextarea v-bind="componentField" placeholder="Escribe la descripción del juego..."
                                class="min-h-32 resize-none h-full" />
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
                                        v-for="[index, picture] of pictures.entries()">
                                        <img :src="picture.image" :key="index"
                                            class=" rounded-md border-2 border-gray-300 object-cover size-32" />
                                        <UiButton variant="outline" class="absolute top-0 right-0 rounded-full"
                                            size="icon" type="button" @click="
                                                removePicture(
                                                    index,
                                                    componentField.onChange,
                                                )
                                                ">
                                            <X class="w-4 h-4" />
                                        </UiButton>
                                    </UiCarouselItem>
                                </UiCarouselContent>
                                <UiCarouselPrevious size="sm" v-if="pictures.length"/>
                                <UiCarouselNext size="sm" v-if="pictures.length"/>
                            </UiCarousel>

                            <UiButton type="button" variant="outline" size="icon" class="w-12 h-12 rounded-full"
                                asChild>
                                <label class="relative cursor-pointer">
                                    <UiInput type="file" accept="image/*" multiple class="hidden" @change="
                                        (event: Event) =>
                                            handlePicturesChange(
                                                event,
                                                componentField.onChange,
                                            )
                                    " />

                                    <Plus class="w-5 h-5" />
                                </label>
                            </UiButton>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <!-- ARCHIVOS -->
            <div class="space-y-4">
                <h3 class="text-base font-medium">Archivos</h3>
                <div class="space-y-4">
                    <div v-for="(fileItem, index) in fileItems" :key="index" class="flex gap-3 items-end">
                        <FormField v-slot="{ componentField }" name="files" class="flex-1">
                            <FormItem>
                                <FormLabel class="text-sm font-medium mb-1 block">Plataforma</FormLabel>
                                <FormControl>
                                    <UiSelect v-model="fileItems[index]!.type">
                                        <UiSelectTrigger>
                                            <UiSelectValue placeholder="Selecciona plataforma" />
                                        </UiSelectTrigger>
                                        <UiSelectContent>
                                            <UiSelectItem value="windows">Windows</UiSelectItem>
                                            <UiSelectItem value="linux">Linux</UiSelectItem>
                                            <UiSelectItem value="source">Source</UiSelectItem>
                                        </UiSelectContent>
                                    </UiSelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="files" class="flex-1">
                            <FormItem>
                                <FormLabel class="text-sm font-medium mb-1 block">Nombre</FormLabel>
                                <FormControl>
                                    <UiInput type="text" v-model="fileItems[index]!.name"
                                        placeholder="Nombre del archivo" maxlength="50" />
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
                                        <label class="relative cursor-pointer">
                                            <input type="file" class="hidden" @change="
                                                (event: Event) =>
                                                    handleFileChange(
                                                        event,
                                                        index,
                                                        componentField.onChange,
                                                    )
                                            " />

                                            <Download class="w-4 h-4 mr-2" />
                                            Seleccionar archivo
                                        </label>
                                    </UiButton>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <UiButton type="button" variant="ghost" size="icon" @click="removeFileItem(index)"
                            :disabled="fileItems.length <= 1" class="mb-0">
                            <X class="w-4 h-4" />
                        </UiButton>
                    </div>

                    <UiButton type="button" variant="outline" @click="addFileItem" :disabled="fileItems.length >= 5"
                        class="w-full">
                        <Plus class="w-4 h-4 mr-2" />
                        Agregar Archivo
                    </UiButton>
                </div>
            </div>

            <!-- CATEGORIAS -->
            <FormField v-slot="{ componentField }" name="categories">
                <FormItem class="w-full">
                    <FormLabel class="text-base font-medium mb-2 block">Categorias</FormLabel>
                    <FormControl>
                        <UiCombobox>
                            <UiComboboxAnchor asChild>
                                <UiTagsInput :model-value="componentField.modelValue || []
                                    " @update:model-value="
                                        componentField['onUpdate:modelValue']
                                        ">
                                    <UiTagsInputItem v-for="item of componentField.modelValue ||
                                        []" :key="item" :value="item">
                                        {{ getCategoryName(item) }}
                                        <UiTagsInputItemDelete></UiTagsInputItemDelete>
                                    </UiTagsInputItem>

                                    <UiComboboxInput placeholder="Buscar categorías...">
                                        <UiTagsInputInput />
                                    </UiComboboxInput>
                                </UiTagsInput>
                            </UiComboboxAnchor>

                            <UiComboboxList>
                                <UiComboboxViewport>
                                    <UiComboboxEmpty>No se encontraron
                                        categorías</UiComboboxEmpty>
                                    <UiComboboxGroup>
                                        <UiComboboxItem v-for="category of categories" :key="category.id"
                                            :value="category.id" @select.prevent="
                                                (ev: any) => {
                                                    const value = ev.detail
                                                        ?.value as string;
                                                    if (
                                                        value &&
                                                        !componentField.modelValue?.includes(
                                                            value,
                                                        )
                                                    ) {
                                                        const current =
                                                            componentField.modelValue ||
                                                            [];
                                                        componentField[
                                                            'onUpdate:modelValue'
                                                        ]?.([
                                                            ...current,
                                                            value,
                                                        ]);
                                                    }
                                                }
                                            ">
                                            {{ category.name }}
                                        </UiComboboxItem>
                                    </UiComboboxGroup>
                                </UiComboboxViewport>
                            </UiComboboxList>
                        </UiCombobox>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="flex justify-end pt-4">
                <UiButton type="submit" size="lg"> Crear Juego </UiButton>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "vue-sonner";
import { Plus, Download, X } from "lucide-vue-next";

const route = useRoute()
/* SETUP(INITIAL FETCH) */
const {data: game_data} = await useFetch(`/api/${route.params.userid}/${route.params.gameid}`)

</script>
