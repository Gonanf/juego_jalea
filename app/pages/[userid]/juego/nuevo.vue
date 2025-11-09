<template>
  <div class="w-full max-w-6xl mx-auto p-6 space-y-6">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <!-- Sección Superior: Portada + Título + Metadata -->
      <div class="flex gap-4 items-start">
        <!-- Portada circular -->
        <FormField v-slot="{ componentField }" name="cover">
          <FormItem class="flex-shrink-0">
            <FormControl>
              <label class="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(event: Event) => handleCoverChange(event, componentField.onChange)"
                />
                <div class="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors overflow-hidden">
                  <Plus v-if="!coverPreview" class="w-8 h-8 text-gray-400" />
                  <img v-else :src="coverPreview" alt="Portada" class="w-full h-full object-cover" />
                </div>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Título y Metadata -->
        <div class="flex-1 space-y-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormControl>
                <UiInput
                  type="text"
                  v-bind="componentField"
                  placeholder="Titulo"
                  class="text-xl font-semibold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          
          <div class="text-sm text-gray-600 space-y-1">
            <div>> Por: {{ userName || 'Usuario' }}</div>
            <div v-if="selectedEventName">> Para: {{ selectedEventName }}</div>
            <div>> Fecha de creacion: {{ creationDate }}</div>
          </div>
          
          <!-- Selector de evento visible -->
          <FormField v-slot="{ componentField }" name="event_id" class="mt-3">
            <FormItem>
              <FormControl>
                <UiSelect v-bind="componentField">
                  <UiSelectTrigger class="w-full max-w-xs">
                    <UiSelectValue placeholder="Selecciona un evento" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <!-- @ts-ignore -->
                    <UiSelectItem v-for="event in events" :key="event.id" :value="event.id">
                      <!-- @ts-ignore -->
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

      <!-- Sección Descripción -->
      <div class="flex gap-4">
        <FormField v-slot="{ componentField }" name="description" class="flex-1">
          <FormItem>
            <FormLabel class="text-base font-medium mb-2 block">Descripcion</FormLabel>
            <FormControl>
              <UiTextarea
                v-bind="componentField"
                placeholder="Escribe la descripción del juego..."
                class="min-h-32 resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        
        <!-- Botón circular para agregar imágenes -->
        <FormField v-slot="{ componentField }" name="pictures">
          <FormItem class="flex-shrink-0">
            <FormControl>
              <label class="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="(event: Event) => handlePicturesChange(event, componentField.onChange)"
                />
                <UiButton
                  type="button"
                  variant="outline"
                  size="icon"
                  class="w-12 h-12 rounded-full"
                >
                  <Plus class="w-5 h-5" />
                </UiButton>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Sección Descargar/Comprar -->
      <div class="space-y-4">
        <h3 class="text-base font-medium">Descargar/Comprar</h3>
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
                  <UiInput
                    type="text"
                    v-model="fileItems[index]!.name"
                    placeholder="Nombre del archivo"
                    maxlength="50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="files" class="flex-1">
              <FormItem>
                <FormLabel class="text-sm font-medium mb-1 block">Archivo</FormLabel>
                <FormControl>
                  <label class="relative cursor-pointer">
                    <input
                      type="file"
                      class="hidden"
                      @change="(event: Event) => handleFileChange(event, index, componentField.onChange)"
                    />
                    <UiButton
                      type="button"
                      variant="outline"
                      class="w-full"
                    >
                      <Download class="w-4 h-4 mr-2" />
                      Seleccionar archivo
                    </UiButton>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <UiButton
              type="button"
              variant="ghost"
              size="icon"
              @click="removeFileItem(index)"
              :disabled="fileItems.length <= 1"
              class="mb-0"
            >
              <X class="w-4 h-4" />
            </UiButton>
          </div>
          
          <UiButton
            type="button"
            variant="outline"
            @click="addFileItem"
            :disabled="fileItems.length >= 5"
            class="w-full"
          >
            <Plus class="w-4 h-4 mr-2" />
            Agregar Archivo
          </UiButton>
        </div>
      </div>

      <!-- Sección Categorías -->
      <FormField v-slot="{ componentField }" name="categories">
        <FormItem>
          <FormLabel class="text-base font-medium mb-2 block">Categorias</FormLabel>
          <FormControl>
            <UiCombobox>
              <UiComboboxAnchor asChild>
                <UiTagsInput :model-value="componentField.modelValue || []"
                  @update:model-value="componentField['onUpdate:modelValue']">
                  <UiTagsInputItem v-for="item of componentField.modelValue || []" :key="item" :value="item">
                    <UiTagsInputItemText>{{ getCategoryName(item) }}</UiTagsInputItemText>
                    <UiTagsInputItemDelete></UiTagsInputItemDelete>
                  </UiTagsInputItem>

                  <UiComboboxInput>
                    <UiTagsInputInput 
                      placeholder="Buscar categorías..." 
                      v-model="categorySearch"
                    />
                  </UiComboboxInput>
                </UiTagsInput>
              </UiComboboxAnchor>

              <UiComboboxList>
                <UiComboboxViewport>
                  <UiComboboxEmpty>No se encontraron categorías</UiComboboxEmpty>
                  <UiComboboxGroup>
                    <!-- @ts-ignore -->
                    <UiComboboxItem 
                      v-for="category in filteredCategories" 
                      :key="category.id" 
                      :value="category.id"
                      @select.prevent="(ev: any) => {
                        const value = ev.detail?.value as string;
                        if (value && !componentField.modelValue?.includes(value)) {
                          const current = componentField.modelValue || [];
                          componentField['onUpdate:modelValue']?.([...current, value]);
                        }
                      }">
                      
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

      <FormField v-slot="{ componentField }" name="price" class="hidden">
        <FormItem>
          <FormControl>
            <UiInput type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>


      <div class="flex justify-end pt-4">
        <UiButton type="submit" size="lg">
          Crear Juego
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'vue-sonner'
import { Plus, Download, X } from 'lucide-vue-next'

const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
  if (!session.value.isPending) {
    if (await isTheUserOwner(session, useRoute().params.userid)) unwatch()
  }
})

const schema = toTypedSchema(z.object(
  {
    cover: z.file({ error: "Debe estar completo" }).max(1024 * 1024).optional(),
    pictures: z.array(z.file({ error: "Debe estar completo" }).max(2048 * 2048)).optional(),
    categories: z.array(z.string()).optional(),
    files: z.array(z.file({ error: "Debe estar completo" }).max(1000000000).min(1)).max(5).optional(),
    file_types: z.array(z.enum(['windows','linux','source'])).optional(),
    file_names: z.array(z.string().max(50)).optional(),
    title: z.string({ error: "Debe estar completo" }).min(1).max(128),
    description: z.string({ error: "Debe estar completo" }).min(1).max(512),
    price: z.number({ error: "Debe estar completo" }).min(0).max(60),
    user_id: z.string({ error: "Debe estar completo" }).optional(), //Because it gets set with userid
    event_id: z.string({ error: "Debe estar completo" }).optional()
  }
))

const route = useRoute()

const form = useForm({
  validationSchema: schema,
})

form.setFieldValue("user_id", String(route.params.userid))

// Cargar categorías y eventos
// @ts-ignore
const categories = ref([])
// @ts-ignore
const events = ref([])
const categorySearch = ref('')
const coverPreview = ref<string | null>(null)
const userName = ref('')
const creationDate = computed(() => {
  const now = new Date()
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`
})

const selectedEventName = computed(() => {
  const eventId = form.values.event_id
  if (!eventId) return null
  
  const event = events.value.find((e) => {
    
    return e.id === eventId
  })
  
  return event ? event.name : null
})

// Cargar datos desde las APIs
onMounted(async () => {
  try {
    
    categories.value = await $fetch('/api/category')
    
    events.value = await $fetch('/api/event')
  } catch (err) {
    console.error('Error cargando datos:', err)
  }
})

// Filtrar categorías basado en búsqueda
const filteredCategories = computed(() => {
  const currentCategories = form.values.categories || []
  if (!categorySearch.value) {
    
    return categories.value.filter((cat) => {
      
      return !currentCategories.includes(cat.id)
    })
  }
  const search = categorySearch.value.toLowerCase()
  
  return categories.value.filter((cat) => {
    
    return cat.name.toLowerCase().includes(search) &&
    
    !currentCategories.includes(cat.id)
  })
})

// Obtener nombre de categoría por ID
const getCategoryName = (id: string) => {
  
  const cat = categories.value.find((cat) => {
    
    return cat.id === id
  })
  
  return cat ? cat.name : id
}

// Manejo de archivos
const fileItems = ref<{ file: File | null; type: 'windows' | 'linux' | 'source' | ''; name: string }[]>([{ file: null, type: '', name: '' }])

const addFileItem = () => {
  if (fileItems.value.length < 5) {
    fileItems.value.push({ file: null, type: '', name: '' })
  }
}

const removeFileItem = (index: number) => {
  if (fileItems.value.length > 1) {
    fileItems.value.splice(index, 1)
  }
}

const handleFileChange = (event: Event, index: number, onChange: (value: File[]) => void) => {
  const target = event.target as HTMLInputElement
  if (target?.files && target.files.length > 0 && fileItems.value[index]) {
    const file = target.files[0]
    if (file) {
      fileItems.value[index].file = file
      // Actualizar el campo del formulario
      const files = fileItems.value
        .filter(item => item.file !== null)
        .map(item => item.file!)
      onChange(files)
    }
  }
}

// Sincronizar fileItems con el campo del formulario
watch(() => form.values.files, (files) => {
  if (!files || files.length === 0) {
    fileItems.value = [{ file: null, type: '', name: '' }]
  }
}, { deep: true })

const handleCoverChange = (event: Event, onChange: (value: File | undefined) => void) => {
  const target = (event.target as HTMLInputElement)
  if (target?.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      onChange(file)
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        coverPreview.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  } else {
    onChange(undefined)
    coverPreview.value = null
  }
}

const handlePicturesChange = (event: Event, onChange: (value: File[]) => void) => {
  const target = (event.target as HTMLInputElement)
  if (target?.files) {
    onChange(Array.from(target.files))
  } else {
    onChange([])
  }
}

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
    console.log('👷 - values:', values);

    const form_data = new FormData();

    // Procesar campos normales
    type FormValues = typeof values
    for (const key in values) {
      const value = values[key as keyof FormValues]
      if (Array.isArray(value) &&  value instanceof File) {
        for (const item of value) {
            form_data.append(key, item);
        }
      //Why does it take it as a string?
      } else if (key === 'cover' && values[key] instanceof File) {
        form_data.append(key, values[key]);
      } else if (value !== undefined && value !== null) {
        form_data.append(key, String(value));
      }
    }

    // Procesar archivos con sus tipos y nombres
    const validFileItems = fileItems.value.filter(item => item.file !== null && item.type !== '' && item.name !== '')
    
    for (const fileItem of validFileItems) {
      if (fileItem.file) {
        form_data.append('files', fileItem.file)
        form_data.append('file_types', fileItem.type)
        form_data.append('file_names', fileItem.name)
      }
    }

    // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
    console.log('👷 - form_data entries:', Array.from(form_data.entries()));

    await $fetch(`/api/${route.params.userid}/${values.title}`, {
      method: "POST",
      body: form_data
    });

    toast({title: 'Juego creado exitosamente!'})
    // Opcional: redirigir o resetear el formulario
    form.resetForm()

  } catch (err) {
    console.error('Submit error:', err);
    toast({title: 'Error al enviar peticion:\n', description: ((err as any).message || 'Error desconocido')});
  }
})
</script>
