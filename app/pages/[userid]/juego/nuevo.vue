<template>
  <form @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="cover">
      <FormItem>
        <FormLabel>Portada</FormLabel>
        <FormControl >
          <UiInput 
            type="file" 
            accept="image/*" 
            @change="(event) => handleCoverChange(event, componentField.onChange)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="pictures">
      <FormItem>
        <FormLabel>Imagenes</FormLabel>
        <FormControl >
          <UiInput 
            type="file" 
            multiple 
            accept="image/*" 
            @change="(event) => handlePicturesChange(event, componentField.onChange)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Titulo</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Descripcion</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="event_id">
      <FormItem>
        <FormLabel>Evento</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> 

    <FormField v-slot="{ componentField }" name="price">
      <FormItem>
        <FormLabel>Precio</FormLabel>
        <FormControl >
          <UiInput type="number" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> 

    <UiButton type="submit">
      Submit
    </UiButton> 
  </form>
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

const schema = toTypedSchema(z.object(
  {
      cover: z.file({error: "Debe estar completo"}).max(1024*1024).optional(),
      pictures: z.array(z.file({error: "Debe estar completo"}).max(2048*2048)).optional(),
    // categories: TODO: Later
      title: z.string({error: "Debe estar completo"}).min(1).max(128),
      description: z.string({error: "Debe estar completo"}).min(1).max(512),
      price: z.number({error: "Debe estar completo"}).min(0).max(60),
      user_id: z.string({error: "Debe estar completo"}).optional(), //Because it gets set with userid
      event_id: z.string({error: "Debe estar completo"}).optional()
  }
))

const route = useRoute()

const form = useForm({
  validationSchema: schema,

})

form.setFieldValue("user_id",route.params.userid as string)

const handleCoverChange = (event: Event, onChange: (value: File | undefined) => void) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    onChange(target.files[0])
  } else {
    onChange(undefined)
  }
}

const handlePicturesChange = (event: Event, onChange: (value: File[]) => void) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
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

    for (const key in values) {
      if (key === 'pictures' && Array.isArray(values[key])) {
        for (const file of values[key]) {
          if (file instanceof File) {
            form_data.append(key, file);
          }
        }
      } else if (key === 'cover' && values[key] instanceof File) {
        form_data.append(key, values[key]);
      } else if (values[key] !== undefined && values[key] !== null) {
        form_data.append(key, values[key]);
      }
    }

    // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
    console.log('👷 - form_data entries:', Array.from(form_data.entries()));

    const { data, error } = await $fetch(`/api/${route.params.userid}/juego/nuevo`, {
      method: "POST",
      body: form_data
    });

    if (error) {
      alert('Error al enviar peticion:\n' + error.message);
    } else {
      // TODO: Navigate to the game page
      await navigateTo(`/api/${route.params.userid}/${values.title}`);
    }
  } catch (err) {
    console.error('Submit error:', err);
    alert('Error al enviar peticion:\n' + (err as any).message || 'Error desconocido');
  }
})
</script>
